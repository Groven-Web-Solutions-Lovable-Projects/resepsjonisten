import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

/** Snapshot fra en av kalkulatorene som sendes med demo-skjemaet. */
export type CalculatorSnapshot = {
  /** Hvilken kalkulator dataen kommer fra */
  source: "pricing" | "lost-calls";
  /** Kort, lesbar oppsummering (vises evt. i e-post / DB) */
  summary: string;
  /** Strukturert data for analyse */
  data: Record<string, unknown>;
  /** Når brukeren trykket "Book gratis demo" */
  capturedAt: string;
};

type CalculatorContextValue = {
  snapshot: CalculatorSnapshot | null;
  setSnapshot: (s: CalculatorSnapshot) => void;
  clearSnapshot: () => void;
};

const CalculatorContext = createContext<CalculatorContextValue | undefined>(undefined);

export const CalculatorProvider = ({ children }: { children: ReactNode }) => {
  const [snapshot, setSnapshotState] = useState<CalculatorSnapshot | null>(null);

  const setSnapshot = useCallback((s: CalculatorSnapshot) => {
    setSnapshotState({ ...s, capturedAt: new Date().toISOString() });
  }, []);

  const clearSnapshot = useCallback(() => setSnapshotState(null), []);

  return (
    <CalculatorContext.Provider value={{ snapshot, setSnapshot, clearSnapshot }}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculatorSnapshot = () => {
  const ctx = useContext(CalculatorContext);
  if (!ctx) {
    throw new Error("useCalculatorSnapshot må brukes innenfor <CalculatorProvider>");
  }
  return ctx;
};