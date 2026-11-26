"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import ConsultDrawer from "./ConsultDrawer";

type Ctx = { open: (area?: string) => void };
const ConsultContext = createContext<Ctx | null>(null);

export function useConsult() {
  const ctx = useContext(ConsultContext);
  if (!ctx) throw new Error("useConsult precisa estar dentro de <ConsultProvider>");
  return ctx;
}

export default function ConsultProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [area, setArea] = useState<string | null>(null);
  const [key, setKey] = useState(0);
  const open = useCallback((a?: string) => { setArea(a ?? null); setKey((n) => n + 1); setIsOpen(true); }, []);
  const close = useCallback(() => setIsOpen(false), []);
  return (
    <ConsultContext.Provider value={{ open }}>
      {children}
      <ConsultDrawer isOpen={isOpen} initialArea={area} openKey={key} onClose={close} />
    </ConsultContext.Provider>
  );
}
