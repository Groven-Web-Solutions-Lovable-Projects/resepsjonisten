import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

type Status = "loading" | "valid" | "already" | "invalid" | "done" | "error";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<Status>("loading");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const validate = async () => {
      if (!token) {
        setStatus("invalid");
        return;
      }
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } },
        );
        const data = await res.json();
        if (!res.ok) {
          setStatus("invalid");
          return;
        }
        if (data.valid === true) setStatus("valid");
        else if (data.reason === "already_unsubscribed") setStatus("already");
        else setStatus("invalid");
      } catch {
        setStatus("error");
      }
    };
    validate();
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setSubmitting(true);
    const { data, error } = await supabase.functions.invoke(
      "handle-email-unsubscribe",
      { body: { token } },
    );
    setSubmitting(false);
    if (error) {
      setStatus("error");
      return;
    }
    if ((data as any)?.reason === "already_unsubscribed") setStatus("already");
    else setStatus("done");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-secondary/20 px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-elevated p-8 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Avmelding nyhetsbrev
        </h1>
        <p className="text-sm text-muted-foreground mb-6">Resepsjonisten.no</p>

        {status === "loading" && (
          <div className="flex flex-col items-center gap-3 py-6">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Sjekker lenken…</p>
          </div>
        )}

        {status === "valid" && (
          <>
            <p className="text-foreground mb-6">
              Bekreft at du ønsker å melde deg av e-postene våre.
            </p>
            <Button
              variant="hero"
              size="lg"
              onClick={confirm}
              disabled={submitting}
              className="w-full"
            >
              {submitting ? "Melder deg av…" : "Bekreft avmelding"}
            </Button>
          </>
        )}

        {status === "done" && (
          <div className="flex flex-col items-center gap-3 py-4">
            <CheckCircle2 className="w-10 h-10 text-primary" />
            <p className="font-semibold text-foreground">Du er nå avmeldt</p>
            <p className="text-sm text-muted-foreground">
              Du vil ikke motta flere e-poster fra oss.
            </p>
          </div>
        )}

        {status === "already" && (
          <div className="flex flex-col items-center gap-3 py-4">
            <CheckCircle2 className="w-10 h-10 text-primary" />
            <p className="font-semibold text-foreground">Allerede avmeldt</p>
            <p className="text-sm text-muted-foreground">
              Denne e-postadressen er allerede meldt av.
            </p>
          </div>
        )}

        {(status === "invalid" || status === "error") && (
          <div className="flex flex-col items-center gap-3 py-4">
            <AlertCircle className="w-10 h-10 text-destructive" />
            <p className="font-semibold text-foreground">
              {status === "invalid" ? "Ugyldig lenke" : "Noe gikk galt"}
            </p>
            <p className="text-sm text-muted-foreground">
              {status === "invalid"
                ? "Lenken er ugyldig eller utløpt."
                : "Prøv igjen om litt, eller kontakt oss."}
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Unsubscribe;