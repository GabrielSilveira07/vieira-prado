import type { ElementType } from "react";

type Props = { text: string; emphasis?: string; end?: string; as?: ElementType; className?: string; mode?: "rise" | "light" };

/**
 * Quebra o texto em palavras mascaradas para as animações de entrada.
 * mode "rise": cada palavra sobe da máscara. mode "light": palavras acendem com a rolagem.
 */
export default function SplitWords({ text, emphasis, end = "", as: Tag = "p", className, mode = "rise" }: Props) {
  const words = (s: string, em = false) =>
    s.split(/\s+/).filter(Boolean).map((w, i) =>
      mode === "rise" ? (
        <span className="mask" key={`${em}${i}`}>
          <span>{em ? <em>{w}</em> : w}</span>
        </span>
      ) : em ? (
        <em className="w" key={`e${i}`}>{w}</em>
      ) : (
        <span className="w" key={`t${i}`}>{w}</span>
      ),
    );
  const join = (nodes: React.ReactNode[]) => nodes.flatMap((n, i) => (i ? [" ", n] : [n]));
  return (
    <Tag className={className} data-split={mode} aria-label={`${text}${emphasis ? ` ${emphasis}` : ""}${end}`}>
      <span aria-hidden="true">
        {join(words(text))}
        {emphasis ? <> {join(words(emphasis, true))}</> : null}
        {end}
      </span>
    </Tag>
  );
}
