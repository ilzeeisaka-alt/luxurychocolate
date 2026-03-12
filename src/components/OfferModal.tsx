import { useState, useRef } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
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

const OfferModal = ({ open, onOpenChange }: OfferModalProps) => {
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [usageType, setUsageType] = useState<string>("");
  const [eventDate, setEventDate] = useState<Date | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp', 'application/pdf', 'application/postscript', 'application/illustrator', 'application/x-cdr'];
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.pdf', '.cdr', '.eps', '.ai'];
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(ext)) {
      toast.error("Atbalstītie formāti: PNG, JPG, SVG, WebP, PDF, CDR, EPS, AI");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Fails nedrīkst pārsniegt 10MB");
      return;
    }

    setLogoFile(file);

    // Create preview for images
    if (file.type.startsWith('image/')) {
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
          .upload(fileName, logoFile);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          toast.error("Neizdevās augšupielādēt logo. Mēģiniet vēlreiz.");
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
        body: { name, company, email, size, packaging, purpose, quantity, message, logoUrl },
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground">Saņemt piedāvājumu</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
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
            placeholder="Vēlamais iepakojums (piem., kastīte, maisiņš, bez iepakojuma)"
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
          <input
            name="quantity"
            type="text"
            placeholder="Daudzums (piem., 200)"
            maxLength={50}
            className={inputClasses}
            style={{ boxShadow: "0 0 0 1px hsl(var(--border))" }}
          />
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
                <span className="text-xs">PNG, JPG, SVG, WebP, PDF, CDR, EPS, AI — maks. 10MB</span>
              </button>
            ) : (
              <div className="rounded-lg border border-border p-3 flex items-center gap-3">
                {logoPreview && (
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-12 h-12 object-contain rounded"
                  />
                )}
                <span className="text-sm text-foreground flex-1 truncate">
                  {logoFile.name}
                </span>
                <button
                  type="button"
                  onClick={removeLogo}
                  className="p-1 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".png,.jpg,.jpeg,.svg,.webp,.pdf,.cdr,.eps,.ai"
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
      </DialogContent>
    </Dialog>
  );
};

export default OfferModal;
