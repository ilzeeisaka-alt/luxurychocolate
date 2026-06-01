import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, Copy, Check, ExternalLink, Wallet, Users, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSeo } from "@/hooks/useSeo";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface AffiliateRow {
  id: string;
  code: string;
  status: string;
  commission_rate: number;
  customer_discount_rate: number;
  balance_cents: number;
  total_earned_cents: number;
  total_paid_cents: number;
  payout_method: string | null;
  payout_details: string | null;
  full_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
}

interface Referral {
  id: string;
  order_number: string | null;
  order_total_cents: number;
  commission_cents: number;
  status: string;
  source: string;
  created_at: string;
}

interface Payout {
  id: string;
  amount_cents: number;
  status: string;
  requested_at: string;
  paid_at: string | null;
}

const MIN_PAYOUT_CENTS = 1000; // 10 EUR
const fmt = (c: number) => new Intl.NumberFormat("lv-LV", { style: "currency", currency: "EUR" }).format(c / 100);

const generateCode = (seed: string) =>
  (seed.replace(/[^a-zA-Z0-9]/g, "").slice(0, 6).toUpperCase() || "PRO") +
  Math.floor(Math.random() * 9000 + 1000);

const Affiliate = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [affiliate, setAffiliate] = useState<AffiliateRow | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [copied, setCopied] = useState(false);

  // registration form
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [payoutDetails, setPayoutDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useSeo({
    title: "Partneru programma — pelni 10% par rekomendētiem pasūtījumiem",
    description: "Pievienojies Luxury Chocolate partneru programmai. 10% komisija no katra pasūtījuma, ko atved tavs unikālais kods vai saite.",
    path: "/affiliate",
  });

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth?redirect=/affiliate", { replace: true });
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: aff } = await supabase
        .from("affiliates")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (aff) {
        setAffiliate(aff as AffiliateRow);
        const [{ data: refs }, { data: pays }] = await Promise.all([
          supabase.from("affiliate_referrals").select("*").eq("affiliate_id", aff.id).order("created_at", { ascending: false }).limit(50),
          supabase.from("affiliate_payouts").select("*").eq("affiliate_id", aff.id).order("requested_at", { ascending: false }).limit(20),
        ]);
        setReferrals((refs as Referral[]) || []);
        setPayouts((pays as Payout[]) || []);
      }
      setLoading(false);
    })();
  }, [user]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!fullName.trim()) { toast.error("Lūdzu, ievadi vārdu un uzvārdu"); return; }
    setSubmitting(true);
    let code = generateCode(fullName);
    // try a few times in case of collision
    for (let i = 0; i < 5; i++) {
      const { data, error } = await supabase.from("affiliates").insert({
        user_id: user.id,
        code,
        full_name: fullName.trim(),
        contact_email: user.email,
        contact_phone: phone.trim() || null,
        payout_method: "bank_transfer",
        payout_details: payoutDetails.trim() || null,
      }).select().maybeSingle();
      if (!error && data) {
        setAffiliate(data as AffiliateRow);
        toast.success("Partneru programma aktivizēta!");
        setSubmitting(false);
        return;
      }
      if (error && !error.message.toLowerCase().includes("unique")) {
        toast.error(error.message);
        setSubmitting(false);
        return;
      }
      code = generateCode(fullName);
    }
    toast.error("Neizdevās izveidot unikālu kodu, mēģini vēlreiz");
    setSubmitting(false);
  };

  const referralLink = affiliate
    ? `${window.location.origin}/?ref=${affiliate.code}`
    : "";

  const copy = async () => {
    if (!referralLink) return;
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const requestPayout = async () => {
    if (!affiliate) return;
    if (affiliate.balance_cents < MIN_PAYOUT_CENTS) {
      toast.error(`Minimālā izmaksas summa ir ${fmt(MIN_PAYOUT_CENTS)}`);
      return;
    }
    if (!affiliate.payout_details) {
      toast.error("Lūdzu, vispirms norādi izmaksu rekvizītus (IBAN) zemāk");
      return;
    }
    const { error } = await supabase.from("affiliate_payouts").insert({
      affiliate_id: affiliate.id,
      amount_cents: affiliate.balance_cents,
      payout_method: affiliate.payout_method,
      payout_details: affiliate.payout_details,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Izmaksas pieprasījums nosūtīts");
    const { data: pays } = await supabase.from("affiliate_payouts").select("*").eq("affiliate_id", affiliate.id).order("requested_at", { ascending: false });
    setPayouts((pays as Payout[]) || []);
  };

  const saveDetails = async () => {
    if (!affiliate) return;
    const { error } = await supabase
      .from("affiliates")
      .update({
        full_name: affiliate.full_name,
        contact_phone: affiliate.contact_phone,
        payout_details: affiliate.payout_details,
      })
      .eq("id", affiliate.id);
    if (error) toast.error(error.message);
    else toast.success("Saglabāts");
  };

  if (authLoading || loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16 max-w-5xl">
        <h1 className="text-3xl sm:text-4xl text-foreground mb-3">Partneru programma</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Pelni 10% komisiju no katra pasūtījuma, ko atved tavs unikālais kods vai saite. Klienti saņem 5% atlaidi, izmantojot tavu kodu.
        </p>

        {!affiliate ? (
          <div className="max-w-2xl space-y-6">
            <div className="space-y-4 text-foreground">
              <p className="text-lg leading-relaxed">
                <span className="font-semibold">„Affiliate program“</span> (latviski: partnerprogramma vai filiālprogramma) ir uzņēmuma izveidota sadarbības sistēma, kurā jebkurš cilvēks vai cits uzņēmums (partneris) var nopelnīt komisijas maksu, reklamējot šī uzņēmuma produktus vai pakalpojumus.
              </p>
              <p className="leading-relaxed">
                Tā ir uz rezultātiem balstīta mārketinga stratēģija – partneris saņem naudu tikai tad, kad viņa rekomendācijas rezultātā tiek veikts reāls pirkums vai cita vēlamā darbība.
              </p>
              <h2 className="text-xl font-semibold mt-6">Kā tas darbojas?</h2>
              <ol className="list-decimal list-inside space-y-2 pl-1">
                <li><span className="font-medium">Reģistrācija:</span> Tu piesakies uzņēmuma partnerprogrammā.</li>
                <li><span className="font-medium">Unikālā saite:</span> Uzņēmums Tev piešķir īpašu, tieši Tev izveidotu interneta saiti (tā saukto affiliate link).</li>
                <li><span className="font-medium">Reklamēšana:</span> Tu dalies ar šo saiti savā blogā, sociālajos tīklos, YouTube video aprakstā vai sūti draugiem.</li>
                <li><span className="font-medium">Izsekošana:</span> Kad kāds noklikšķina uz Tavas saites, sistēma ar sīkfailu (cookies) palīdzību atceras, ka klients nācis no Tevis.</li>
                <li><span className="font-medium">Peļņa:</span> Ja šis cilvēks veic pirkumu, uzņēmums Tev izmaksā noteiktu procentu (komisijas maksu) no darījuma summas.</li>
              </ol>
            </div>

            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle>Pievienojies programmai</CardTitle>
                <CardDescription>Aizpildi informāciju, lai aktivizētu savu partneru kodu.</CardDescription>
              </CardHeader>
              <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fn">Vārds, uzvārds *</Label>
                  <Input id="fn" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ph">Telefons</Label>
                  <Input id="ph" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pd">Bankas konts (IBAN) izmaksām</Label>
                  <Input id="pd" value={payoutDetails} onChange={(e) => setPayoutDetails(e.target.value)} placeholder="LV00 HABA ..." />
                  <p className="text-xs text-muted-foreground">Var pievienot arī vēlāk.</p>
                </div>
                <Button type="submit" size="lg" disabled={submitting}>
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Aktivizēt manu partnera kodu"}
                </Button>
              </form>
              <div className="mt-6 pt-6 border-t border-border text-sm text-muted-foreground space-y-1">
                <p>• Komisija: <span className="text-foreground font-medium">10%</span> no katra apmaksāta pasūtījuma</p>
                <p>• Atlaide klientam ar tavu kodu: <span className="text-foreground font-medium">5%</span></p>
                <p>• Cookie izsekošana: <span className="text-foreground font-medium">90 dienas</span></p>
                <p>• Minimālā izmaksa: <span className="text-foreground font-medium">10 EUR</span> (manuāls pārskaitījums)</p>
              </div>
            </CardContent>
          </Card>
        </div>
        ) : (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground mb-2"><Wallet className="w-3.5 h-3.5" />Pieejamais balanss</div>
                  <div className="text-2xl font-semibold text-primary">{fmt(affiliate.balance_cents)}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground mb-2"><TrendingUp className="w-3.5 h-3.5" />Kopā nopelnīts</div>
                  <div className="text-2xl font-semibold text-foreground">{fmt(affiliate.total_earned_cents)}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground mb-2"><Users className="w-3.5 h-3.5" />Pasūtījumi</div>
                  <div className="text-2xl font-semibold text-foreground">{referrals.length}</div>
                </CardContent>
              </Card>
            </div>

            {/* Code + link */}
            <Card>
              <CardHeader>
                <CardTitle>Tavs kods un saite</CardTitle>
                <CardDescription>Dalies ar šo saiti vai kodu, lai sāktu pelnīt komisijas.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-3xl font-mono tracking-wider text-primary px-4 py-2 bg-primary/5 rounded-lg border border-primary/20">
                    {affiliate.code}
                  </div>
                  <span className="text-sm text-muted-foreground">— klienti to ievada kasē</span>
                </div>
                <div className="flex gap-2">
                  <Input value={referralLink} readOnly className="font-mono text-xs" />
                  <Button onClick={copy} variant="outline" size="icon">
                    {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  <Button asChild variant="outline" size="icon">
                    <a href={referralLink} target="_blank" rel="noreferrer"><ExternalLink className="w-4 h-4" /></a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payout */}
            <Card>
              <CardHeader>
                <CardTitle>Izmaksas</CardTitle>
                <CardDescription>Minimālā summa: 10 EUR. Izmaksa notiek manuāli ar bankas pārskaitījumu 7 darba dienu laikā.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Bankas konts (IBAN)</Label>
                  <Input
                    value={affiliate.payout_details ?? ""}
                    onChange={(e) => setAffiliate({ ...affiliate, payout_details: e.target.value })}
                    placeholder="LV00 HABA ..."
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={saveDetails} variant="outline">Saglabāt rekvizītus</Button>
                  <Button onClick={requestPayout} disabled={affiliate.balance_cents < MIN_PAYOUT_CENTS}>
                    Pieprasīt izmaksu ({fmt(affiliate.balance_cents)})
                  </Button>
                </div>

                {payouts.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <h4 className="text-sm font-medium mb-2">Izmaksu vēsture</h4>
                    <div className="space-y-1.5">
                      {payouts.map((p) => (
                        <div key={p.id} className="flex justify-between text-sm py-1.5 border-b border-border/40 last:border-0">
                          <span className="text-muted-foreground">{new Date(p.requested_at).toLocaleDateString("lv-LV")}</span>
                          <span className="font-medium">{fmt(p.amount_cents)}</span>
                          <span className={`text-xs uppercase tracking-wide ${p.status === "paid" ? "text-primary" : p.status === "rejected" ? "text-destructive" : "text-muted-foreground"}`}>{p.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Referrals */}
            <Card>
              <CardHeader>
                <CardTitle>Atvestie pasūtījumi</CardTitle>
              </CardHeader>
              <CardContent>
                {referrals.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Vēl nav pasūtījumu. Dalies ar savu saiti vai kodu!</p>
                ) : (
                  <div className="space-y-1.5">
                    {referrals.map((r) => (
                      <div key={r.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-3 items-center text-sm py-2 border-b border-border/40 last:border-0">
                        <span className="text-muted-foreground">
                          {new Date(r.created_at).toLocaleDateString("lv-LV")} · {r.order_number ?? "—"}
                        </span>
                        <span className="text-muted-foreground text-xs">{fmt(r.order_total_cents)}</span>
                        <span className="text-primary font-medium">{fmt(r.commission_cents)}</span>
                        <span className={`text-xs uppercase tracking-wide ${r.status === "approved" || r.status === "paid" ? "text-primary" : r.status === "rejected" ? "text-destructive" : "text-muted-foreground"}`}>{r.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        <p className="mt-8 text-sm">
          <Link to="/account" className="text-muted-foreground hover:text-primary">← Atpakaļ uz kontu</Link>
        </p>
      </main>
      <FooterSection />
    </div>
  );
};

export default Affiliate;
