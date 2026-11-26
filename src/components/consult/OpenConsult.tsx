"use client";

import type { ReactNode } from "react";
import { useConsult } from "./ConsultProvider";

type Props = { children: ReactNode; area?: string; className?: string; cursor?: "big" | "link"; label?: string };

/** Botão que abre a consulta de qualquer ponto do site, opcionalmente com a área já escolhida. */
export default function OpenConsult({ children, area, className = "ln", cursor = "link", label }: Props) {
  const { open } = useConsult();
  return (
    <button type="button" className={className} onClick={() => open(area)} data-cursor={cursor} data-label={label}>
      {children}
    </button>
  );
}
