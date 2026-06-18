import { useEffect, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Lang = { code: string; label: string; flag: string; googleCode: string };

const LANGUAGES: Lang[] = [
  { code: "no", label: "Norsk", flag: "no", googleCode: "no" },
  { code: "en", label: "English", flag: "gb", googleCode: "en" },
  { code: "sv", label: "Svenska", flag: "se", googleCode: "sv" },
  { code: "da", label: "Dansk", flag: "dk", googleCode: "da" },
  { code: "de", label: "Deutsch", flag: "de", googleCode: "de" },
  { code: "fr", label: "Français", flag: "fr", googleCode: "fr" },
  { code: "es", label: "Español", flag: "es", googleCode: "es" },
  { code: "it", label: "Italiano", flag: "it", googleCode: "it" },
  { code: "lt", label: "Lietuvių", flag: "lt", googleCode: "lt" },
  { code: "pl", label: "Polski", flag: "pl", googleCode: "pl" },
];

const COOKIE_NAME = "googtrans";

const readCurrent = (): string => {
  if (typeof document === "undefined") return "no";
  const match = document.cookie.match(/(?:^|; )googtrans=([^;]+)/);
  if (!match) return "no";
  const value = decodeURIComponent(match[1]);
  const parts = value.split("/");
  return parts[2] || "no";
};

const setLangCookie = (lang: string) => {
  const value = `/no/${lang}`;
  const host = window.location.hostname;
  // Sett cookie på flere scopes for å være sikker
  document.cookie = `${COOKIE_NAME}=${value};path=/`;
  document.cookie = `${COOKIE_NAME}=${value};path=/;domain=${host}`;
  const parts = host.split(".");
  if (parts.length > 1) {
    const root = "." + parts.slice(-2).join(".");
    document.cookie = `${COOKIE_NAME}=${value};path=/;domain=${root}`;
  }
};

const LanguageSwitcher = ({ variant = "default" }: { variant?: "default" | "compact" }) => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string>("no");

  useEffect(() => {
    setCurrent(readCurrent());
  }, []);

  const handleSelect = (lang: Lang) => {
    setOpen(false);
    if (lang.googleCode === current) return;
    if (lang.googleCode === "no") {
      // Fjern cookie for å gå tilbake til original
      const host = window.location.hostname;
      document.cookie = `${COOKIE_NAME}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      document.cookie = `${COOKIE_NAME}=;path=/;domain=${host};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      const parts = host.split(".");
      if (parts.length > 1) {
        const root = "." + parts.slice(-2).join(".");
        document.cookie = `${COOKIE_NAME}=;path=/;domain=${root};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
    } else {
      setLangCookie(lang.googleCode);
    }
    window.location.reload();
  };

  const active = LANGUAGES.find((l) => l.googleCode === current) ?? LANGUAGES[0];

  return (
    <div className="relative notranslate" translate="no">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Velg språk"
        aria-expanded={open}
        className={`flex items-center gap-2 rounded-lg border border-border bg-background hover:bg-secondary transition-colors ${
          variant === "compact" ? "px-2 py-1.5" : "px-2.5 py-2"
        }`}
      >
        <span
          className={`fi fi-${active.flag} rounded-sm shadow-sm`}
          style={{ width: 22, height: 16, display: "inline-block" }}
          aria-hidden
        />
        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.ul
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 z-50 min-w-[160px] rounded-xl border border-border bg-card shadow-elevated overflow-hidden"
              role="listbox"
            >
              {LANGUAGES.map((l) => {
                const isActive = l.googleCode === current;
                return (
                  <li key={l.code}>
                    <button
                      type="button"
                      onClick={() => handleSelect(l)}
                      role="option"
                      aria-selected={isActive}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm hover:bg-secondary transition-colors ${
                        isActive ? "bg-secondary/60 font-semibold" : ""
                      }`}
                    >
                      <span
                        className={`fi fi-${l.flag} rounded-sm shadow-sm`}
                        style={{ width: 22, height: 16, display: "inline-block" }}
                        aria-hidden
                      />
                      <span className="flex-1 text-foreground">{l.label}</span>
                      {isActive && <Check className="w-4 h-4 text-primary" />}
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;