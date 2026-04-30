import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const PHONE_NUMBER = "+4700000000";
export const PHONE_DISPLAY = "Ring oss";

type Props = {
  className?: string;
  /** Stil-tilpasning – "default" passer på lyse bakgrunner, "onDark" på mørke. */
  tone?: "default" | "onDark";
};

const CallUsButton = ({ className, tone = "default" }: Props) => {
  return (
    <Button
      asChild
      variant="outline"
      size="xl"
      className={cn(
        tone === "onDark"
          ? "bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white font-semibold"
          : "border-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary font-semibold",
        className,
      )}
    >
      <a href={`tel:${PHONE_NUMBER}`} aria-label="Ring oss">
        <Phone className="w-4 h-4" />
        {PHONE_DISPLAY}
      </a>
    </Button>
  );
};

export default CallUsButton;
