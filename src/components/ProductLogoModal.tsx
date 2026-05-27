import { useState, useRef, useEffect } from "react";
import { FileIcon, X, Upload, ShoppingCart, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface ProductLogoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
  productName: string;
  initialFile?: File | null;
}

interface LogoEntry {
  id: string;
  file: File;
  preview: string | null;
  pdfPreview: string | null;
  quantity: number;
}

const inputClasses =
  "w-full rounded-lg bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none transition-shadow duration-200 focus:shadow-[0_0_0_2px_hsl(var(--ring))]";

const ALLOWED_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.pdf', '.cdr', '.eps', '.ai', '.tiff', '.tif', '.bmp', '.psd', '.heic', '.heif'];

const buildEntry = (file: File): LogoEntry => {
  const ext = '.' + (file.name.split('.').pop()?.toLowerCase() ?? '');
  const imageExts = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp', '.heic', '.heif', '.tiff', '.tif'];
  const isImage = file.type.startsWith('image/') || imageExts.includes(ext);
  const isPdf = file.type === 'application/pdf' || ext === '.pdf';
  const entry: LogoEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    file,
    preview: null,
    pdfPreview: isPdf ? URL.createObjectURL(file) : null,
    quantity: 1,
  };
  if (isImage) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      entry.preview = ev.target?.result as string;
      // trigger re-render via custom event
      window.dispatchEvent(new CustomEvent('logo-preview-ready', { detail: entry.id }));
    };
    reader.readAsDataURL(file);
  }
  return entry;
};

const ProductLogoModal = ({ open, onOpenChange, productId, productName, initialFile }: ProductLogoModalProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState<LogoEntry[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && initialFile) {
      setEntries((prev) => prev.length === 0 ? [buildEntry(initialFile)] : prev);
    }
  }, [open, initialFile]);

  // Force re-render when async previews resolve
  const [, forceRender] = useState(0);
  useEffect(() => {
    const handler = () => forceRender((n) => n + 1);
    window.addEventListener('logo-preview-ready', handler);
    return () => window.removeEventListener('logo-preview-ready', handler);
  }, []);

  useEffect(() => {
    return () => {
      entries.forEach((e) => { if (e.pdfPreview) URL.revokeObjectURL(e.pdfPreview); });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = () => {
    entries.forEach((e) => { if (e.pdfPreview) URL.revokeObjectURL(e.pdfPreview); });
    setEntries([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleOpenChange = (val: boolean) => {
    if (!val) reset();
    onOpenChange(val);
  };

  const addFiles = (files: FileList | File[]) => {
    const accepted: LogoEntry[] = [];
    for (const file of Array.from(files)) {
      const ext = '.' + (file.name.split('.').pop()?.toLowerCase() ?? '');
      if (!ALLOWED_EXTS.includes(ext)) {
        toast.error(`${file.name}: neatbalstīts formāts`);
        continue;
      }
      if (file.size > 20 * 1024 * 1024) {
        toast.error(`${file.name}: pārsniedz 20MB`);
        continue;
      }
      accepted.push(buildEntry(file));
    }
    if (accepted.length) setEntries((prev) => [...prev, ...accepted]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeEntry = (id: string) => {
    setEntries((prev) => {
      const e = prev.find((x) => x.id === id);
      if (e?.pdfPreview) URL.revokeObjectURL(e.pdfPreview);
      return prev.filter((x) => x.id !== id);
    });
  };

  const updateQty = (id: string, qty: number) => {
    setEntries((prev) => prev.map((e) => e.id === id ? { ...e, quantity: Math.max(1, qty) } : e));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error("Lūdzu pieslēdzieties");
      navigate("/auth");
      return;
    }
    if (entries.length === 0) {
      toast.error("Lūdzu augšupielādējiet vismaz vienu logo");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const message = (formData.get('message') as string || '').trim();
      const notes = message ? `Piezīmes: ${message}` : null;

      for (const entry of entries) {
        const fileExt = entry.file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('client-logos')
          .upload(fileName, entry.file, {
            contentType: entry.file.type || 'application/octet-stream',
            upsert: false,
          });
        if (uploadError) {
          toast.error(`Neizdevās augšupielādēt ${entry.file.name}: ${uploadError.message}`);
          continue;
        }
        const { data: urlData } = supabase.storage.from('client-logos').getPublicUrl(fileName);
        const { error: insertError } = await supabase.from('cart_items').insert({
          user_id: user.id,
          product_id: productId,
          quantity: entry.quantity,
          logo_url: urlData.publicUrl,
          logo_filename: entry.file.name,
          notes,
        });
        if (insertError) throw insertError;
      }

      window.dispatchEvent(new Event("cart-updated"));
      toast.success(`Pievienoti ${entries.length} logo grozam`);
      onOpenChange(false);
      reset();
      navigate("/grozs");
    } catch (err) {
      console.error('Submit error:', err);
      toast.error("Kļūda. Lūdzu mēģiniet vēlreiz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground">Pasūtīt ar Jūsu logo</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {productName} — pievienojiet vienu vai vairākus logo
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Jūsu logo *
            </label>

            {entries.length === 0 ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full rounded-lg border-2 border-dashed border-border px-4 py-6 flex flex-col items-center gap-2 text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
              >
                <Upload className="w-6 h-6" />
                <span className="text-sm">Augšupielādēt logo (var izvēlēties vairākus)</span>
                <span className="text-xs">PNG, JPG, SVG, PDF u.c. — maks. 20MB katrs</span>
              </button>
            ) : (
              <div className="space-y-3">
                {entries.map((entry) => (
                  <div key={entry.id} className="rounded-lg border border-border p-3">
                    <div className="flex items-center gap-3">
                      {entry.preview ? (
                        <div className="w-16 h-16 rounded bg-background flex items-center justify-center overflow-hidden shrink-0">
                          <img src={entry.preview} alt="" className="w-full h-full object-contain" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded bg-muted flex items-center justify-center shrink-0">
                          <FileIcon className="w-7 h-7 text-muted-foreground" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate font-medium">{entry.file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(entry.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeEntry(entry.id)}
                        className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span className="text-xs text-muted-foreground">Daudzums</span>
                      <div className="flex items-center border border-border rounded-lg">
                        <button type="button" onClick={() => updateQty(entry.id, entry.quantity - 1)} className="w-9 h-9 text-base hover:bg-muted">−</button>
                        <input
                          type="number"
                          min={1}
                          value={entry.quantity}
                          onChange={(e) => updateQty(entry.id, parseInt(e.target.value, 10) || 1)}
                          className="w-14 h-9 bg-transparent text-center text-sm focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button type="button" onClick={() => updateQty(entry.id, entry.quantity + 1)} className="w-9 h-9 text-base hover:bg-muted">+</button>
                      </div>
                    </div>
                    {entry.pdfPreview && (
                      <div className="mt-3 rounded overflow-hidden border border-border bg-background">
                        <iframe src={entry.pdfPreview} title="PDF" className="w-full h-40" />
                      </div>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full rounded-lg border border-dashed border-border px-4 py-3 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Pievienot vēl vienu logo
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".png,.gif,.jpg,.jpeg,.svg,.webp,.pdf,.cdr,.eps,.ai,.tiff,.tif,.bmp,.psd,.heic,.heif"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <textarea
            name="message"
            placeholder="Piezīmes pasūtījumam (neobligāti)"
            rows={3}
            maxLength={1000}
            className={`${inputClasses} resize-none`}
            style={{ boxShadow: "0 0 0 1px hsl(var(--border))" }}
          />

          <button
            type="submit"
            disabled={loading || entries.length === 0}
            className="rounded-lg bg-primary text-primary-foreground px-6 py-3 font-medium tracking-wide transition-all duration-200 active:scale-[0.98] disabled:opacity-60 inline-flex items-center justify-center gap-2"
            style={{ boxShadow: "var(--shadow-button)" }}
          >
            <ShoppingCart className="w-4 h-4" />
            {loading ? "Pievieno…" : `Pievienot grozam (${entries.length})`}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductLogoModal;
