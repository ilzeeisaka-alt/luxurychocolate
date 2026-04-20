import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const CheckoutReturn = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  useEffect(() => {
    document.title = "Paldies par pasūtījumu — Luxury Chocolate";
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center space-y-6 rounded-lg border border-border bg-card p-10">
        <CheckCircle2 className="mx-auto text-primary" size={64} />
        <h1 className="text-3xl font-bold">Paldies par pasūtījumu!</h1>
        <p className="text-muted-foreground">
          Maksājums saņemts. Mēs sazināsimies ar Tevi 24 stundu laikā ar logo skici un
          ražošanas grafiku. Ražošana parasti aizņem 3 dienas.
        </p>
        {sessionId && (
          <p className="text-xs text-muted-foreground font-mono break-all">
            Pasūtījuma ID: {sessionId}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button asChild>
            <Link to="/account">Apskatīt manus pasūtījumus</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Atpakaļ uz sākumu</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutReturn;
