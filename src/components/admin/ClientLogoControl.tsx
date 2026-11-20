import { useEffect, useRef, useState } from "react";
import { Upload, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { prepareContactPhoto } from "@/lib/contactPhoto";
import { toast } from "sonner";

export default function ClientLogoControl({ orderId, onChange }: { orderId: string; onChange: (url: string) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [path, setPath] = useState("");
  const [busy, setBusy] = useState(true);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    onChange(""); setPath(""); setBusy(true); setFailed(false);
    async function load() {
      try {
        const { data, error } = await supabase.from("order_client_logos").select("storage_path").eq("order_id", orderId).maybeSingle();
        if (error) throw error;
        if (data) {
          const { data: signed, error: signError } = await supabase.storage.from("customer-logos").createSignedUrl(data.storage_path, 3600);
          if (signError) throw signError;
          if (active) { setPath(data.storage_path); onChange(signed.signedUrl); }
        }
      } catch { if (active) { setFailed(true); toast.error("Neizdevās ielādēt klienta logo."); } }
      finally { if (active) setBusy(false); }
    }
    void load();
    return () => { active = false; };
  }, [orderId, onChange]);

  async function upload(file: File) {
    setBusy(true);
    let uploadedPath = "";
    try {
      const blob = await prepareContactPhoto(file);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Lūdzu, pieslēdzieties vēlreiz.");
      uploadedPath = `${user.id}/order-client-logos/${orderId}/${crypto.randomUUID()}.png`;
      const { error } = await supabase.storage.from("customer-logos").upload(uploadedPath, blob, { contentType: "image/png" });
      if (error) throw error;
      const { data: signed, error: signError } = await supabase.storage.from("customer-logos").createSignedUrl(uploadedPath, 3600);
      if (signError) throw signError;
      const { error: saveError } = await supabase.from("order_client_logos").upsert({ order_id: orderId, storage_path: uploadedPath });
      if (saveError) throw saveError;
      const previousPath = path;
      setPath(uploadedPath); onChange(signed.signedUrl); uploadedPath = "";
      if (previousPath) await supabase.storage.from("customer-logos").remove([previousPath]);
      toast.success("Klienta logo saglabāts.");
    } catch (error) {
      if (uploadedPath) await supabase.storage.from("customer-logos").remove([uploadedPath]);
      toast.error(error instanceof Error ? error.message : "Neizdevās saglabāt logo.");
    } finally { setBusy(false); if (input.current) input.current.value = ""; }
  }
  async function remove() {
    setBusy(true);
    try {
      const { error } = await supabase.from("order_client_logos").delete().eq("order_id", orderId);
      if (error) throw error;
      await supabase.storage.from("customer-logos").remove([path]);
      setPath(""); onChange(""); toast.success("Klienta logo noņemts.");
    } catch { toast.error("Neizdevās noņemt logo."); }
    finally { setBusy(false); }
  }
  return <div className="no-print mb-5 flex flex-wrap items-center gap-2">
    <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" aria-label="Klienta logo" className="hidden" onChange={event => { const file = event.target.files?.[0]; if (file) void upload(file); }} />
    <Button variant="outline" disabled={busy || failed} onClick={() => input.current?.click()}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}{path ? "Mainīt klienta logo" : "Pievienot klienta logo"}</Button>
    {path && <Button variant="outline" disabled={busy} onClick={() => void remove()}><Trash2 className="mr-2 h-4 w-4" />Noņemt logo</Button>}
  </div>;
}
