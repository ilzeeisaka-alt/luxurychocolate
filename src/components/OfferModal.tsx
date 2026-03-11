import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface OfferModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const inputClasses =
  "w-full rounded-lg bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none transition-shadow duration-200 focus:shadow-[0_0_0_2px_hsl(var(--ring))]";

const OfferModal = ({ open, onOpenChange }: OfferModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
      toast.success("Paldies! Mēs ar Jums sazināsimies tuvākajā laikā.");
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground">Saņemt piedāvājumu</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <input
            type="text"
            placeholder="Jūsu vārds"
            required
            className={inputClasses}
            style={{ boxShadow: "0 0 0 1px hsl(var(--border))" }}
          />
          <input
            type="text"
            placeholder="Uzņēmums"
            required
            className={inputClasses}
            style={{ boxShadow: "0 0 0 1px hsl(var(--border))" }}
          />
          <input
            type="email"
            placeholder="E-pasts"
            required
            className={inputClasses}
            style={{ boxShadow: "0 0 0 1px hsl(var(--border))" }}
          />
          <input
            type="text"
            placeholder="Daudzums (piem., 200)"
            className={inputClasses}
            style={{ boxShadow: "0 0 0 1px hsl(var(--border))" }}
          />
          <textarea
            placeholder="Ziņojums (neobligāti)"
            rows={3}
            className={`${inputClasses} resize-none`}
            style={{ boxShadow: "0 0 0 1px hsl(var(--border))" }}
          />
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
