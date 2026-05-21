import { useState, useRef, useEffect } from "react";
import { FileIcon, X, Upload, ShoppingCart } from "lucide-react";
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

const inputClasses =
  "w-full rounded-lg bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none transition-shadow duration-200 focus:shadow-[0_0_0_2px_hsl(var(--ring))]";

const ProductLogoModal = ({ open, onOpenChange, productId, productName, initialFile }: ProductLogoModalProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoPdfPreview, setLogoPdfPreview] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generatePreview = (file: File) => {
    const ext = '.' + (file.name.split('.').pop()?.toLowerCase() ?? '');
    const imageExts = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp', '.heic', '.heif', '.tiff', '.tif'];
    const isImage = file.type.startsWith('image/') || imageExts.includes(ext);
    const isPdf = file.type === 'application/pdf' || ext === '.pdf';
    if (isImage) {
      const reader = new FileReader();
      reader.onload = (ev) => setLogoPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else if (isPdf) {
      setLogoPdfPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (open && initialFile) {
      setLogoFile(initialFile);
      generatePreview(initialFile);
    }
  }, [open, initialFile]);

  useEffect(() => {
    return () => {
      if (logoPdfPreview) URL.revokeObjectURL(logoPdfPreview);
    };
  }, [logoPdfPreview]);

  const reset = () => {
    setLogoFile(null);
    setLogoPreview(null);
    if (logoPdfPreview) { URL.revokeObjectURL(logoPdfPreview); setLogoPdfPreview(null); }
    setQuantity(1);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleOpenChange = (val: boolean) => {
    if (!val) reset();
    onOpenChange(val);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.pdf', '.cdr', '.eps', '.ai', '.tiff', '.tif', '.bmp', '.psd', '.heic', '.heif'];
    const ext = '.' + (file.name.split('.').pop()?.toLowerCase() ?? '');
    if (!allowed.includes(ext)) {
      toast.error("Atbalstītie formāti: PNG, JPG, GIF, SVG, WebP, PDF, CDR, EPS, AI, TIFF, BMP, PSD");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      toast.error("Fails nedrīkst pārsniegt 20MB");
      return;
    }
    setLogoFile(file);
    setLogoPreview(null);
    if (logoPdfPreview) { URL.revokeObjectURL(logoPdfPreview); setLogoPdfPreview(null); }
    generatePreview(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error("Lūdzu pieslēdzieties");
      navigate("/auth");
      return;
    }
    if (!logoFile) {
      toast.error("Lūdzu augšupielādējiet logo");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const notesParts: string[] = [];
      const size = (formData.get('size') as string || '').trim();
      const packaging = (formData.get('packaging') as string || '').trim();
      const message = (formData.get('message') as string || '').trim();
      if (size) notesParts.push(`Izmērs: ${size}`);
      if (packaging) notesParts.push(`Iepakojums: ${packaging}`);
      if (message) notesParts.push(`Piezīmes: ${message}`);
      const notes = notesParts.join(' | ');

      // Upload logo
      const fileExt = logoFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('client-logos')
        .upload(fileName, logoFile, {
          contentType: logoFile.type || 'application/octet-stream',
          upsert: false,
        });
      if (uploadError) {
        toast.error(`Neizdevās augšupielādēt logo: ${uploadError.message}`);
        setLoading(false);
        return;
      }
      const { data: urlData } = supabase.storage.from('client-logos').getPublicUrl(fileName);
      const logoUrl = urlData.publicUrl;

      // Insert as new cart item with logo
      const { error: insertError } = await supabase.from('cart_items').insert({
        user_id: user.id,
        product_id: productId,
        quantity,
        logo_url: logoUrl,
        logo_filename: logoFile.name,
        notes: notes || null,
      });
      if (insertError) throw insertError;

      window.dispatchEvent(new Event("cart-updated"));
      toast.success("Pievienots grozam ar Jūsu logo");
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
      <DialogContent className="sm:max-w-md bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground">Pasūtīt ar Jūsu logo</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {productName} — pievienojiet logo un pasūtiet uzreiz
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          {/* Logo upload */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Jūsu logo *
            </label>
            {!logoFile ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full rounded-lg border-2 border-dashed border-border px-4 py-6 flex flex-col items-center gap-2 text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
              >
                <Upload className="w-6 h-6" />
                <span className="text-sm">Augšupielādēt logo</span>
                <span className="text-xs">PNG, JPG, SVG, PDF u.c. — maks. 20MB</span>
              </button>
            ) : (
              <div className="rounded-lg border border-border p-3">
                <div className="flex items-center gap-3">
                  {logoPreview ? (
                    <div className="w-16 h-16 rounded bg-background flex items-center justify-center overflow-hidden shrink-0">
                      <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded bg-muted flex items-center justify-center shrink-0">
                      <FileIcon className="w-7 h-7 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate font-medium">{logoFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(logoFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={reset}
                    className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {logoPdfPreview && (
                  <div className="mt-3 rounded overflow-hidden border border-border bg-background">
                    <iframe src={logoPdfPreview} title="PDF" className="w-full h-48" />
                  </div>
                )}
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".png,.gif,.jpg,.jpeg,.svg,.webp,.pdf,.cdr,.eps,.ai,.tiff,.tif,.bmp,.psd,.heic,.heif"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Daudzums
            </label>
            <div className="flex items-center border border-border rounded-lg w-fit">
              <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-11 text-lg hover:bg-muted">−</button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-16 h-11 bg-transparent text-center text-sm focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button type="button" onClick={() => setQuantity(q => q + 1)} className="w-10 h-11 text-lg hover:bg-muted">+</button>
            </div>
          </div>

          <input
            name="size"
            type="text"
            placeholder="Vēlamais izmērs (neobligāti, piem., 5×5 cm)"
            maxLength={50}
            className={inputClasses}
            style={{ boxShadow: "0 0 0 1px hsl(var(--border))" }}
          />
          <input
            name="packaging"
            type="text"
            placeholder="Vēlamais iepakojums (neobligāti)"
            maxLength={200}
            className={inputClasses}
            style={{ boxShadow: "0 0 0 1px hsl(var(--border))" }}
          />
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
            disabled={loading || !logoFile}
            className="rounded-lg bg-primary text-primary-foreground px-6 py-3 font-medium tracking-wide transition-all duration-200 active:scale-[0.98] disabled:opacity-60 inline-flex items-center justify-center gap-2"
            style={{ boxShadow: "var(--shadow-button)" }}
          >
            <ShoppingCart className="w-4 h-4" />
            {loading ? "Pievieno…" : "Pievienot grozam un doties uz kasi"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductLogoModal;
