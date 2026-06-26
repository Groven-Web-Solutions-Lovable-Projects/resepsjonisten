import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowLeft } from "lucide-react";

const Takk = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }
  }, []);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
          <CheckCircle className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Takk for din henvendelse!
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-8">
          Vi har mottatt meldingen din og tar kontakt innen kort tid for å sette
          opp din gratis demo.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Tilbake til forsiden
        </Link>
      </div>
    </main>
  );
};

export default Takk;
