import { useEffect, useState } from "react";
import { Check, X, Loader2, Tag } from "lucide-react";
import { getStoredRef, validateAndStoreRef, clearStoredRef, type StoredRef } from "@/lib/affiliateRef";

interface Props {
  onChange?: (ref: StoredRef | null) => void;
}

const AffiliateCodeInput = ({ onChange }: Props) => {
  const [ref, setRef] = useState<StoredRef | null>(() => getStoredRef());
  const [code, setCode] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { onChange?.(ref); }, [ref, onChange]);

  const apply = async () => {
    setError(null);
    if (!code.trim()) return;
    setLoading(true);
    const result = await validateAndStoreRef(code, "code");
    setLoading(false);
    if (!result) {
      setError("Nederīgs kods");
      return;
    }
    setRef(result);
    setCode("");
    setOpen(false);
  };

  const remove = () => {
    clearStoredRef();
    setRef(null);
  };

  if (ref) {
    return (
      <div className="flex items-center justify-between gap-2 p-3 rounded-md border border-primary/30 bg-primary/5 text-sm">
        <span className="flex items-center gap-2 text-foreground">
          <Check className="w-4 h-4 text-primary" />
          Partnera kods <span className="font-mono font-semibold text-primary">{ref.code}</span>
          <span className="text-muted-foreground text-xs">(−{ref.discountRate}%)</span>
        </span>
        <button type="button" onClick={remove} className="text-muted-foreground hover:text-destructive" aria-label="Noņemt kodu">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <Tag className="w-3.5 h-3.5" /> Ir partnera kods?
      </button>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="PARTNERA KODS"
          className="flex-1 h-10 px-3 rounded-md border border-border bg-background text-sm font-mono uppercase"
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); apply(); } }}
        />
        <button
          type="button"
          onClick={apply}
          disabled={loading || !code.trim()}
          className="h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Pielietot"}
        </button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};

export default AffiliateCodeInput;
