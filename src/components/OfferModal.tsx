import { useState, useRef } from "react";
import { format } from "date-fns";
import { CalendarIcon, FileIcon, X, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface OfferModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const inputClasses =
  "w-full rounded-lg bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none transition-shadow duration-200 focus:shadow-[0_0_0_2px_hsl(var(--ring))]";

const quantityOptions = [
  { value: "50–100", label: "50–100 gab." },
  { value: "100–500", label: "100–500 gab." },
  { value: "500+", label: "500+ gab." },
];

const OfferModal = ({ open, onOpenChange }: OfferModalProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedQuantity, setSelectedQuantity] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [usageType, setUsageType] = useState<string>("");
  const [eventDate, setEventDate] = useState<Date | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetAll = () => {
    setStep(1);
    setSelectedQuantity("");
    removeLogo();
    setUsageType("");
    setEventDate(undefined);
  };

  const handleOpenChange = (val: boolean) => {
    if (!val) resetAll();
    onOpenChange(val);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file extension (broad support for design files)
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.pdf', '.cdr', '.eps', '.ai', '.tiff', '.tif', '.bmp', '.psd', '.heic', '.heif'];
    const ext = '.' + (file.name.split('.').pop()?.toLowerCase() ?? '');
    if (!allowedExtensions.includes(ext)) {
      toast.error("Atbalstītie formāti: PNG, JPG, GIF, SVG, WebP, PDF, CDR, EPS, AI, TIFF, BMP, PSD");
      return;
    }

    // Validate file size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      toast.error("Fails nedrīkst pārsniegt 20MB");
      return;
    }

    setLogoFile(file);

    // Create preview for images (check extension too for files without proper MIME type)
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp', '.heic', '.heif', '.tiff', '.tif'];
    const imgExt = '.' + (file.name.split('.').pop()?.toLowerCase() ?? '');
    const isImage = file.type.startsWith('image/') || imageExtensions.includes(imgExt);
    if (isImage) {
      const reader = new FileReader();
      reader.onload = (ev) => setLogoPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setLogoPreview(null);
    }
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const name = (formData.get('name') as string).trim();
      const company = (formData.get('company') as string).trim();
      const email = (formData.get('email') as string).trim();
      const phone = (formData.get('phone') as string || '').trim();
      const size = (formData.get('size') as string).trim();
      const packaging = (formData.get('packaging') as string || '').trim();
      const purpose = usageType === "event" 
        ? `Pasākumam${eventDate ? ' — ' + format(eventDate, "dd.MM.yyyy") : ''}`
        : usageType === "regular" ? "Ikdienas pastāvīgai lietošanai" : "";
      const quantity = (formData.get('quantity') as string).trim();
      const message = (formData.get('message') as string).trim();

      let logoUrl: string | null = null;

      // Upload logo if provided
      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('client-logos')
          .upload(fileName, logoFile, {
            contentType: logoFile.type || 'application/octet-stream',
            upsert: false,
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          toast.error(`Neizdevās augšupielādēt logo: ${uploadError.message}`);
          setLoading(false);
          return;
        }

        const { data: urlData } = supabase.storage
          .from('client-logos')
          .getPublicUrl(fileName);

        logoUrl = urlData.publicUrl;
      }

      // Send email via edge function
      const { error } = await supabase.functions.invoke('send-logo-email', {
        body: { name, company, email, phone, size, packaging, purpose, quantity, message, logoUrl },
      });

      if (error) {
        console.error('Function error:', error);
        throw error;
      }

      onOpenChange(false);
      toast.success("Paldies! Mēs ar Jums sazināsimies tuvākajā laikā.");
      
      // Reset form
      removeLogo();
      setUsageType("");
      setEventDate(undefined);
    } catch (err) {
      console.error('Submit error:', err);
      toast.error("Kļūda nosūtot pieprasījumu. Lūdzu mēģiniet vēlreiz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        {step === 1 ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl text-foreground">
                Cik šokolādes Jums vajadzēs?
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Izvēlieties apjomu — mēs sagatavosim individuālu piedāvājumu
              </p>
            </DialogHeader>
            <div className="flex flex-col gap-3 mt-4">
              <div className="grid grid-cols-3 gap-2">
                {quantityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setSelectedQuantity(opt.value);
                      setStep(2);
                    }}
                    className="rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 bg-background text-foreground hover:bg-primary hover:text-primary-foreground"
                    style={{ boxShadow: "0 0 0 1px hsl(var(--border))" }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const custom = ((fd.get("custom") as string) || "").trim();
                  if (!custom) {
                    toast.error("Lūdzu ievadiet skaitu");
                    return;
                  }
                  setSelectedQuantity(`${custom} gab.`);
                  setStep(2);
                }}
                className="flex flex-col gap-2 pt-2 border-t border-border"
              >
                <label className="text-sm text-muted-foreground">
                  Vai ievadiet savu skaitu:
                </label>
                <div className="flex gap-2">
                  <input
                    name="custom"
                    type="number"
                    min={1}
                    placeholder="Piem., 250"
                    className={`${inputClasses} flex-1`}
                    style={{ boxShadow: "0 0 0 1px hsl(var(--border))" }}
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-primary text-primary-foreground px-5 font-medium transition-all hover:brightness-110 active:scale-[0.98]"
                  >
                    →
                  </button>
                </div>
              </form>

              {/* Logo upload — pieejams uzreiz */}
              <div className="pt-2 border-t border-border">
                {!logoFile ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full rounded-lg border-2 border-dashed border-border px-4 py-4 flex flex-col items-center gap-1.5 text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
                  >
                    <Upload className="w-5 h-5" />
                    <span className="text-sm font-medium">Augšupielādēt logo uzreiz</span>
                    <span className="text-xs">PNG, JPG, SVG, PDF, AI, EPS, CDR — maks. 20MB</span>
                  </button>
                ) : (
                  <div className="rounded-lg border border-border p-3">
                    <p className="text-xs text-muted-foreground mb-2">Logo pievienots — turpiniet ar skaitu:</p>
                    <div className="flex items-center gap-3">
                      {logoPreview ? (
                        <div className="w-14 h-14 rounded bg-background flex items-center justify-center overflow-hidden shrink-0">
                          <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded bg-muted flex items-center justify-center shrink-0">
                          <FileIcon className="w-6 h-6 text-muted-foreground" />
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
                        onClick={removeLogo}
                        className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shrink-0"
                        title="Noņemt failu"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
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
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl text-foreground">Saņemt piedāvājumu</DialogTitle>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left mt-1"
              >
                ← {selectedQuantity} gab. · Mainīt
              </button>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
              <input type="hidden" name="quantity" value={selectedQuantity} />
              <input
                name="name"
                type="text"
                placeholder="Jūsu vārds"
                required
                maxLength={100}
                className={inputClasses}
                style={{ boxShadow: "0 0 0 1px hsl(var(--border))" }}
              />
              <input
                name="company"
                type="text"
                placeholder="Uzņēmums"
                required
                maxLength={100}
                className={inputClasses}
                style={{ boxShadow: "0 0 0 1px hsl(var(--border))" }}
              />
              <input
                name="email"
                type="email"
                placeholder="E-pasts"
                required
                maxLength={255}
                className={inputClasses}
                style={{ boxShadow: "0 0 0 1px hsl(var(--border))" }}
              />
              <input
                name="phone"
                type="tel"
                placeholder="Telefona numurs (neobligāti)"
                maxLength={20}
                className={inputClasses}
                style={{ boxShadow: "0 0 0 1px hsl(var(--border))" }}
              />
              <input
                name="size"
                type="text"
                placeholder="Vēlamais izmērs cm (piem., 10×5 cm)"
                maxLength={50}
                className={inputClasses}
                style={{ boxShadow: "0 0 0 1px hsl(var(--border))" }}
              />
              <input
                name="packaging"
                type="text"
                placeholder="Vēlamais iepakojums (piem., kastīte, maisiņš)"
                maxLength={200}
                className={inputClasses}
                style={{ boxShadow: "0 0 0 1px hsl(var(--border))" }}
              />
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Paredzētā pielietošana
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setUsageType("event")}
                    className={cn(
                      "flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                      usageType === "event"
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:text-foreground"
                    )}
                    style={{ boxShadow: "0 0 0 1px hsl(var(--border))" }}
                  >
                    🎉 Pasākumam
                  </button>
                  <button
                    type="button"
                    onClick={() => { setUsageType("regular"); setEventDate(undefined); }}
                    className={cn(
                      "flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                      usageType === "regular"
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:text-foreground"
                    )}
                    style={{ boxShadow: "0 0 0 1px hsl(var(--border))" }}
                  >
                    🏢 Ikdienas lietošanai
                  </button>
                </div>
              </div>
              {usageType === "event" && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Pasākuma datums
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal h-auto py-3",
                          !eventDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {eventDate ? format(eventDate, "dd.MM.yyyy") : "Izvēlieties datumu"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={eventDate}
                        onSelect={setEventDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
              <textarea
                name="message"
                placeholder="Ziņojums (neobligāti)"
                rows={3}
                maxLength={1000}
                className={`${inputClasses} resize-none`}
                style={{ boxShadow: "0 0 0 1px hsl(var(--border))" }}
              />

              {/* Logo upload */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Jūsu logo (neobligāti)
                </label>
                {!logoFile ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full rounded-lg border-2 border-dashed border-border px-4 py-6 flex flex-col items-center gap-2 text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
                  >
                    <Upload className="w-6 h-6" />
                    <span className="text-sm">Augšupielādēt logo</span>
                    <span className="text-xs">PNG, JPG, GIF, SVG, WebP, PDF, CDR, EPS, AI, TIFF, BMP, PSD — maks. 20MB</span>
                  </button>
                ) : (
                  <div className="rounded-lg border border-border p-3">
                    <p className="text-xs text-muted-foreground mb-2">Priekšskatījums:</p>
                    <div className="flex items-center gap-3">
                      {logoPreview ? (
                        <div className="w-16 h-16 rounded bg-background flex items-center justify-center overflow-hidden shrink-0">
                          <img
                            src={logoPreview}
                            alt="Logo preview"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded bg-muted flex items-center justify-center shrink-0">
                          <FileIcon className="w-7 h-7 text-muted-foreground" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate font-medium">
                          {logoFile.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(logoFile.size / 1024 / 1024).toFixed(2)} MB · {logoFile.name.split('.').pop()?.toUpperCase()}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shrink-0"
                        title="Noņemt failu"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
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

              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-primary text-primary-foreground px-6 py-3 font-medium tracking-wide transition-all duration-200 active:scale-[0.98] disabled:opacity-60"
                style={{ boxShadow: "var(--shadow-button)" }}
              >
                {loading ? "Nosūta…" : "Nosūtīt pieprasījumu"}
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OfferModal;
