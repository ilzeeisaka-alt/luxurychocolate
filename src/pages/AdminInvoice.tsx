import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Printer, ChevronLeft, Loader2, Download } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import logoUrl from "@/assets/luxury-chocolate-logo.jpg";

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  unit_price_cents: number;
  total_price_cents: number;
  logo_url: string | null;
  logo_filename: string | null;
  logos: { url: string; filename: string; quantity?: number }[] | null;
}

interface Order {
  id: string;
  order_number: string;
  customer_email: string;
  customer_name: string | null;
  customer_phone: string | null;
  company_name: string | null;
  vat_number: string | null;
  shipping_address: string | null;
  shipping_method: string | null;
  subtotal_cents: number;
  shipping_cents: number;
  tax_cents: number;
  total_cents: number;
  currency: string;
  created_at: string;
  order_items: OrderItem[];
}

const fmt = (cents: number, currency = "EUR") =>
  new Intl.NumberFormat("lv-LV", { style: "currency", currency }).format(cents / 100);

type DocType = "proforma" | "invoice";

const AdminInvoice = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const docType = (searchParams.get("type") as DocType) || "proforma";
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [regNr, setRegNr] = useState("");

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.from("user_roles").select("role").eq("user_id", user.id).then(({ data }) => {
      setIsAdmin(!!data?.some((r) => r.role === "admin"));
    });
  }, [user]);

  const load = useCallback(async () => {
    if (!orderId) return;
    setLoading(true);
    const { data } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("id", orderId)
      .maybeSingle();
    setOrder(data as unknown as Order);
    // Try to load reg nr from profile
    if (data?.user_id) {
      const { data: p } = await supabase
        .from("profiles")
        .select("registration_number")
        .eq("user_id", data.user_id)
        .maybeSingle();
      if (p?.registration_number) setRegNr(p.registration_number);
    }
    setLoading(false);
  }, [orderId]);

  useEffect(() => { if (isAdmin) load(); }, [isAdmin, load]);

  const docMeta = useMemo(() => {
    switch (docType) {
      case "invoice":
        return { title: "Rēķins-Pavadzīme", prefix: "INV", filePrefix: "Rekins-Pavadzime" };
      default:
        return { title: "Priekšapmaksas rēķins", prefix: "PRO", filePrefix: "Priekapmaksa" };
    }
  }, [docType]);

  const invoiceNumber = useMemo(() => {
    if (!order) return "";
    return `${docMeta.prefix}-${order.order_number.replace("ORD-", "")}`;
  }, [order, docMeta]);

  const dateStr = order ? new Date(order.created_at).toLocaleDateString("lv-LV") : "";
  const dueDate = useMemo(() => {
    if (!order) return "";
    const d = new Date(order.created_at);
    d.setDate(d.getDate() + 7);
    return d.toLocaleDateString("lv-LV");
  }, [order]);

  const invoiceRef = useRef<HTMLDivElement | null>(null);
  const [savingPdf, setSavingPdf] = useState(false);

  const handlePrint = () => window.print();
  const handleSavePdf = async () => {
    if (!invoiceRef.current) return;
    setSavingPdf(true);
    try {
      const canvas = await html2canvas(invoiceRef.current, { scale: 2, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgW = pageW;
      const imgH = (canvas.height * imgW) / canvas.width;
      let heightLeft = imgH;
      let y = 0;
      pdf.addImage(imgData, "PNG", 0, y, imgW, imgH);
      heightLeft -= pageH;
      while (heightLeft > 0) {
        y = heightLeft - imgH;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, y, imgW, imgH);
        heightLeft -= pageH;
      }
      pdf.save(`${docMeta.filePrefix}_${invoiceNumber}.pdf`);
    } finally {
      setSavingPdf(false);
    }
  };

  if (authLoading || isAdmin === null || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-foreground">
        Nav piekļuves.
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
        Pasūtījums nav atrasts.
      </div>
    );
  }

  const currency = order.currency;

  return (
    <div className="min-h-screen bg-background">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-area { box-shadow: none !important; border: none !important; }
          body { background: white !important; }
        }
      `}</style>
      <div className="no-print"><Navbar /></div>
      <main className="container mx-auto px-4 pt-28 pb-16 max-w-5xl">
        <div className="no-print flex items-center justify-between mb-4">
          <button onClick={() => navigate("/admin")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-4 h-4" /> Atpakaļ uz admin
          </button>
          <div className="flex flex-wrap gap-2">
            <button onClick={handlePrint} className="flex items-center gap-2 rounded-lg border border-border bg-card text-foreground px-4 py-2.5 text-sm font-medium hover:bg-muted">
              <Printer className="w-4 h-4" /> Drukāt
            </button>
            <button onClick={handleSavePdf} disabled={savingPdf} className="flex items-center gap-2 rounded-lg border border-border bg-card text-foreground px-4 py-2.5 text-sm font-medium hover:bg-muted disabled:opacity-50">
              {savingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              Saglabāt PDF
            </button>
          </div>
        </div>
        <div className="no-print mb-6 flex flex-wrap gap-2">
          {([
            { v: "proforma", l: "Priekšapmaksas rēķins" },
            { v: "invoice", l: "Gala rēķins" },
            { v: "waybill", l: "Pavadzīme" },
          ] as { v: DocType; l: string }[]).map((t) => (
            <button
              key={t.v}
              onClick={() => setSearchParams({ type: t.v })}
              className={`rounded-md border px-3 py-1.5 text-sm font-medium transition ${
                docType === t.v
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:bg-muted"
              }`}
            >
              {t.l}
            </button>
          ))}
        </div>

        <div ref={invoiceRef} className="print-area bg-white text-black rounded-xl border border-border p-10 shadow-sm">
          <div className="flex justify-between items-start mb-8 gap-6">
            <div className="flex items-start gap-4">
              <img src={logoUrl} alt="Luxury Chocolate" className="w-20 h-20 object-contain" crossOrigin="anonymous" />
              <div>
                <h1 className="text-2xl font-bold">{docMeta.title}</h1>
                <p className="text-sm mt-1">Nr. {invoiceNumber}</p>
                <p className="text-sm">Pasūtījums: {order.order_number}</p>
                <p className="text-sm">Izrakstīts: {dateStr}</p>
                {docType === "proforma" && <p className="text-sm">Apmaksas termiņš: {dueDate}</p>}
              </div>
            </div>
            <div className="text-right text-sm">
              <p className="font-bold text-base">Luxury Chocolate SIA</p>
              <p>PVN Reģ.nr. LV40103921954</p>
              <p>Jur. adrese: Vircavas iela 9-8, Rīga, LV-1083</p>
              <p>Fakt. adrese: Kandavas iela 29a-85, Rīga, LV-1083</p>
              <p>info@luxurychocolate.lv · +371 26 177 853</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
            <div>
              <p className="font-bold mb-1 text-xs uppercase text-gray-500">Pārdevējs</p>
              <p className="font-medium">Luxury Chocolate SIA</p>
              <p>Jur. adrese: Vircavas iela 9-8, Rīga, LV-1083</p>
              <p>Fakt. adrese: Kandavas iela 29a-85, Rīga, LV-1083</p>
              <p>PVN Reģ.nr. LV40103921954</p>
              <p>Valdes locekle: Ilze Eisaka</p>
            </div>
            <div>
              <p className="font-bold mb-1 text-xs uppercase text-gray-500">Pircējs</p>
              <p className="font-medium">{order.company_name || order.customer_name || "—"}</p>
              {regNr && <p>Reģ. Nr. {regNr}</p>}
              {order.vat_number && <p>PVN: {order.vat_number}</p>}
              {order.shipping_address && <p>{order.shipping_address}</p>}
              {order.customer_email && <p>{order.customer_email}</p>}
              {order.customer_phone && <p>{order.customer_phone}</p>}
            </div>
          </div>

          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left py-2">Nosaukums</th>
                <th className="text-right py-2">Daudz.</th>
                {docType !== "waybill" && <th className="text-right py-2">Cena</th>}
                {docType !== "waybill" && <th className="text-right py-2">Summa</th>}
              </tr>
            </thead>
            <tbody>
              {order.order_items.map((i) => {
                const logos = (i.logos && i.logos.length > 0)
                  ? i.logos
                  : (i.logo_url ? [{ url: i.logo_url, filename: i.logo_filename ?? "", quantity: i.quantity }] : []);
                return (
                  <tr key={i.id} className="border-b border-gray-200">
                    <td className="py-2">
                      {i.product_name}
                      {logos.length > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          {logos.length === 1
                            ? `ar Jūsu logo${logos[0].filename ? `: ${logos[0].filename}` : ""}`
                            : `ar ${logos.length} logo: ${logos.map((l) => l.filename || "—").join(", ")}`}
                        </div>
                      )}
                    </td>
                    <td className="text-right py-2">{i.quantity}</td>
                    {docType !== "waybill" && <td className="text-right py-2">{fmt(i.unit_price_cents, currency)}</td>}
                    {docType !== "waybill" && <td className="text-right py-2">{fmt(i.total_price_cents, currency)}</td>}
                  </tr>
                );
              })}
              {order.shipping_cents > 0 && docType !== "waybill" && (
                <tr className="border-b border-gray-200">
                  <td className="py-2">Piegāde: {order.shipping_method || "—"}</td>
                  <td className="text-right py-2">1</td>
                  <td className="text-right py-2">{fmt(order.shipping_cents, currency)}</td>
                  <td className="text-right py-2">{fmt(order.shipping_cents, currency)}</td>
                </tr>
              )}
            </tbody>
          </table>

          {docType !== "waybill" && (
            <div className="flex justify-end mt-6">
              <div className="w-72 text-sm">
                <div className="flex justify-between py-1"><span>Summa bez PVN:</span><span>{fmt(order.total_cents - order.tax_cents, currency)}</span></div>
                <div className="flex justify-between py-1"><span>PVN 21%:</span><span>{fmt(order.tax_cents, currency)}</span></div>
                <div className="flex justify-between py-2 border-t-2 border-black font-bold text-base mt-1">
                  <span>Kopā apmaksai:</span><span>{fmt(order.total_cents, currency)}</span>
                </div>
              </div>
            </div>
          )}

          {docType === "proforma" && (
            <div className="mt-8 text-xs text-gray-600 border-t border-gray-200 pt-4">
              <p className="font-medium mb-1">Apmaksa ar pārskaitījumu:</p>
              <p>Saņēmējs: Luxury Chocolate SIA</p>
              <p>Reģ.nr.: LV40103921954</p>
              <p>Banka: AS Citadele banka · SWIFT: PARXLV22</p>
              <p>Konts: LV88PARX0032054790002</p>
              <p className="mt-3">Pasūtījumu sāksim gatavot pēc apmaksas saņemšanas. Jautājumu gadījumā: info@luxurychocolate.lv</p>
              <p className="mt-3 italic">Šis ir priekšapmaksas (proforma) rēķins. Galīgais rēķins tiks izsniegts pēc apmaksas.</p>
            </div>
          )}

          {docType === "invoice" && (
            <div className="mt-8 text-xs text-gray-600 border-t border-gray-200 pt-4">
              <p className="font-medium mb-1">Apmaksa ar pārskaitījumu:</p>
              <p>Saņēmējs: Luxury Chocolate SIA</p>
              <p>Reģ.nr.: LV40103921954</p>
              <p>Banka: AS Citadele banka · SWIFT: PARXLV22</p>
              <p>Konts: LV88PARX0032054790002</p>
              <p className="mt-3">Maksājuma uzdevumā lūdzam norādīt rēķina numuru {invoiceNumber}.</p>
              <p className="mt-3 italic">Rēķins sagatavots elektroniski un ir derīgs bez paraksta.</p>
            </div>
          )}

          {docType === "waybill" && (
            <div className="mt-10 text-xs text-gray-700 border-t border-gray-200 pt-6">
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <p className="font-medium mb-8">Preci nodeva:</p>
                  <div className="border-b border-black h-6" />
                  <p className="mt-1 text-[10px] text-gray-500">Vārds, uzvārds, paraksts</p>
                  <p className="mt-4">Datums: ____________________</p>
                </div>
                <div>
                  <p className="font-medium mb-8">Preci saņēma:</p>
                  <div className="border-b border-black h-6" />
                  <p className="mt-1 text-[10px] text-gray-500">Vārds, uzvārds, paraksts</p>
                  <p className="mt-4">Datums: ____________________</p>
                </div>
              </div>
              <p className="mt-6 italic">Pavadzīme sagatavota elektroniski.</p>
            </div>
          )}
        </div>
      </main>
      <div className="no-print"><FooterSection /></div>
    </div>
  );
};

export default AdminInvoice;
