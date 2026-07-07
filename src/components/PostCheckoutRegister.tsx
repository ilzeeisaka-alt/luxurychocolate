import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

interface Props {
  defaultEmail?: string;
}

const PostCheckoutRegister = ({ defaultEmail }: Props) => {
  const [email, setEmail] = useState(defaultEmail ?? "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || password.length < 6) {
      toast.error("Ievadi e-pastu un vismaz 6 zīmju paroli");
      return;
    }
    setLoading(true);
    try {
      // Convert the anonymous session into a permanent account.
      const { error } = await supabase.auth.updateUser({ email, password });
      if (error) throw error;
      setDone(true);
      toast.success("Konts izveidots! Apstiprini e-pastu, ja saņem vēstuli.");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    const { error } = await supabase.auth.linkIdentity({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) toast.error(error.message);
  };

  if (done) {
    return (
      <div className="rounded-lg border border-primary/40 bg-primary/5 p-6 text-sm flex items-start gap-3">
        <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
        <div>
          <p className="font-medium text-foreground">Konts saglabāts!</p>
          <p className="text-muted-foreground mt-1">
            Tagad vari sekot līdzi saviem pasūtījumiem sadaļā "Mans konts".
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-4">
      <div>
        <h2 className="font-semibold text-foreground">Saglabā savu pasūtījumu</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Izveido kontu 30 sekundēs, lai vēlāk sekotu līdzi pasūtījuma statusam un
          ātrāk pasūtītu nākamreiz. Nav obligāti.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Label htmlFor="pcr-email">E-pasts</Label>
          <Input
            id="pcr-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="pcr-password">Parole</Label>
          <Input
            id="pcr-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Saglabā..." : "Izveidot kontu"}
        </Button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">vai</span>
        </div>
      </div>
      <Button type="button" variant="outline" className="w-full" onClick={handleGoogle}>
        Turpināt ar Google
      </Button>
    </div>
  );
};

export default PostCheckoutRegister;
