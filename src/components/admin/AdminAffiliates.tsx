import { useEffect, useState } from "react";
import { Loader2, Check, X, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface Affiliate {
  id: string;
  user_id: string;
  code: string;
  status: string;
  commission_rate: number;
  customer_discount_rate: number;
  balance_cents: number;
  total_earned_cents: number;
  total_paid_cents: number;
  full_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  payout_details: string | null;
  created_at: string;
}

interface Referral {
  id: string;
  affiliate_id: string;
  order_id: string | null;
  order_number: string | null;
  customer_email: string | null;
  order_total_cents: number;
  commission_cents: number;
  status: string;
  source: string;
  created_at: string;
}

interface Payout {
  id: string;
  affiliate_id: string;
  amount_cents: number;
  status: string;
  payout_details: string | null;
  requested_at: string;
  paid_at: string | null;
}

const fmt = (c: number) => new Intl.NumberFormat("lv-LV", { style: "currency", currency: "EUR" }).format(c / 100);

const AdminAffiliates = () => {
  const [loading, setLoading] = useState(true);
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [tab, setTab] = useState<"affiliates" | "referrals" | "payouts">("referrals");

  const load = async () => {
    setLoading(true);
    const [{ data: a }, { data: r }, { data: p }] = await Promise.all([
      supabase.from("affiliates").select("*").order("created_at", { ascending: false }),
      supabase.from("affiliate_referrals").select("*").order("created_at", { ascending: false }).limit(200),
      supabase.from("affiliate_payouts").select("*").order("requested_at", { ascending: false }).limit(100),
    ]);
    setAffiliates((a as Affiliate[]) || []);
    setReferrals((r as Referral[]) || []);
    setPayouts((p as Payout[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const affMap = new Map(affiliates.map((a) => [a.id, a]));

  // Approve referral: set status approved + add to balance
  const approveReferral = async (r: Referral) => {
    if (r.status !== "pending") return;
    const aff = affMap.get(r.affiliate_id);
    if (!aff) return;
    const { error: e1 } = await supabase
      .from("affiliate_referrals")
      .update({ status: "approved" })
      .eq("id", r.id);
    if (e1) { toast.error(e1.message); return; }
    const { error: e2 } = await supabase
      .from("affiliates")
      .update({
        balance_cents: aff.balance_cents + r.commission_cents,
        total_earned_cents: aff.total_earned_cents + r.commission_cents,
      })
      .eq("id", aff.id);
    if (e2) { toast.error(e2.message); return; }
    toast.success(`Apstiprināts +${fmt(r.commission_cents)}`);
    load();
  };

  const rejectReferral = async (r: Referral) => {
    if (r.status !== "pending") return;
    const { error } = await supabase
      .from("affiliate_referrals")
      .update({ status: "rejected" })
      .eq("id", r.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Noraidīts");
    load();
  };

  // Mark payout paid: subtract from balance, add to total_paid
  const markPayoutPaid = async (p: Payout) => {
    if (p.status !== "requested") return;
    const aff = affMap.get(p.affiliate_id);
    if (!aff) return;
    if (p.amount_cents > aff.balance_cents) {
      toast.error("Summa pārsniedz pieejamo balansu");
      return;
    }
    const { error: e1 } = await supabase
      .from("affiliate_payouts")
      .update({ status: "paid", paid_at: new Date().toISOString() })
      .eq("id", p.id);
    if (e1) { toast.error(e1.message); return; }
    const { error: e2 } = await supabase
      .from("affiliates")
      .update({
        balance_cents: aff.balance_cents - p.amount_cents,
        total_paid_cents: aff.total_paid_cents + p.amount_cents,
      })
      .eq("id", aff.id);
    if (e2) { toast.error(e2.message); return; }
    // Mark related approved referrals as paid
    await supabase
      .from("affiliate_referrals")
      .update({ status: "paid" })
      .eq("affiliate_id", aff.id)
      .eq("status", "approved");
    toast.success("Atzīmēts kā samaksāts");
    load();
  };

  const rejectPayout = async (p: Payout) => {
    if (p.status !== "requested") return;
    await supabase.from("affiliate_payouts").update({ status: "rejected" }).eq("id", p.id);
    toast.success("Noraidīts");
    load();
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b border-border">
        {(["referrals", "payouts", "affiliates"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm border-b-2 transition-colors ${tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            {t === "referrals" && `Pasūtījumi (${referrals.filter((r) => r.status === "pending").length} jauni)`}
            {t === "payouts" && `Izmaksas (${payouts.filter((p) => p.status === "requested").length} jaunas)`}
            {t === "affiliates" && `Partneri (${affiliates.length})`}
          </button>
        ))}
      </div>

      {tab === "referrals" && (
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="text-left">
                  <th className="p-3">Datums</th>
                  <th className="p-3">Partneris</th>
                  <th className="p-3">Pasūtījums</th>
                  <th className="p-3 text-right">Summa</th>
                  <th className="p-3 text-right">Komisija</th>
                  <th className="p-3">Statuss</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((r) => {
                  const aff = affMap.get(r.affiliate_id);
                  return (
                    <tr key={r.id} className="border-t border-border/50">
                      <td className="p-3 text-muted-foreground">{new Date(r.created_at).toLocaleDateString("lv-LV")}</td>
                      <td className="p-3">{aff?.full_name || "—"} <span className="text-muted-foreground text-xs">({aff?.code})</span></td>
                      <td className="p-3 font-mono text-xs">{r.order_number || "—"}</td>
                      <td className="p-3 text-right">{fmt(r.order_total_cents)}</td>
                      <td className="p-3 text-right text-primary font-medium">{fmt(r.commission_cents)}</td>
                      <td className="p-3"><span className={`text-xs uppercase ${r.status === "approved" || r.status === "paid" ? "text-primary" : r.status === "rejected" ? "text-destructive" : "text-muted-foreground"}`}>{r.status}</span></td>
                      <td className="p-3 text-right">
                        {r.status === "pending" && (
                          <div className="flex gap-1 justify-end">
                            <Button size="sm" variant="outline" onClick={() => approveReferral(r)}><Check className="w-3 h-3" /></Button>
                            <Button size="sm" variant="outline" onClick={() => rejectReferral(r)}><X className="w-3 h-3" /></Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {referrals.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">Nav ierakstu</td></tr>}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {tab === "payouts" && (
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="text-left">
                  <th className="p-3">Pieprasīts</th>
                  <th className="p-3">Partneris</th>
                  <th className="p-3">IBAN</th>
                  <th className="p-3 text-right">Summa</th>
                  <th className="p-3">Statuss</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {payouts.map((p) => {
                  const aff = affMap.get(p.affiliate_id);
                  return (
                    <tr key={p.id} className="border-t border-border/50">
                      <td className="p-3 text-muted-foreground">{new Date(p.requested_at).toLocaleDateString("lv-LV")}</td>
                      <td className="p-3">{aff?.full_name || "—"} <div className="text-xs text-muted-foreground">{aff?.contact_email}</div></td>
                      <td className="p-3 font-mono text-xs">{p.payout_details || "—"}</td>
                      <td className="p-3 text-right font-medium">{fmt(p.amount_cents)}</td>
                      <td className="p-3"><span className={`text-xs uppercase ${p.status === "paid" ? "text-primary" : p.status === "rejected" ? "text-destructive" : "text-muted-foreground"}`}>{p.status}</span></td>
                      <td className="p-3 text-right">
                        {p.status === "requested" && (
                          <div className="flex gap-1 justify-end">
                            <Button size="sm" onClick={() => markPayoutPaid(p)}>Samaksāts</Button>
                            <Button size="sm" variant="outline" onClick={() => rejectPayout(p)}><X className="w-3 h-3" /></Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {payouts.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">Nav pieprasījumu</td></tr>}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {tab === "affiliates" && (
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="text-left">
                  <th className="p-3">Vārds</th>
                  <th className="p-3">Kods</th>
                  <th className="p-3">E-pasts</th>
                  <th className="p-3 text-right">Balanss</th>
                  <th className="p-3 text-right">Nopelnīts</th>
                  <th className="p-3 text-right">Izmaksāts</th>
                  <th className="p-3">Statuss</th>
                </tr>
              </thead>
              <tbody>
                {affiliates.map((a) => (
                  <tr key={a.id} className="border-t border-border/50">
                    <td className="p-3">{a.full_name || "—"}</td>
                    <td className="p-3 font-mono text-primary">{a.code}</td>
                    <td className="p-3 text-muted-foreground">{a.contact_email}</td>
                    <td className="p-3 text-right text-primary">{fmt(a.balance_cents)}</td>
                    <td className="p-3 text-right">{fmt(a.total_earned_cents)}</td>
                    <td className="p-3 text-right text-muted-foreground">{fmt(a.total_paid_cents)}</td>
                    <td className="p-3 text-xs uppercase">{a.status}</td>
                  </tr>
                ))}
                {affiliates.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">Nav partneru</td></tr>}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminAffiliates;
