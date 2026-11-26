# Padrão Adelle

Manual do sistema usado para construir a landing da Adelle. Serve de base para novos sites de serviço premium (próximo: advocacia). Cada regra vem de uma decisão validada ou de um feedback durante o projeto.

---

## 1. Princípios

1. **Forma segue função.** Nada decorativo que não carregue informação ou atmosfera.
2. **Grid rígido por baixo, imagem livre por cima.** A estrutura é técnica (12 colunas, linhas finas); a fotografia é orgânica (sem moldura, se dissolve no fundo).
3. **Silêncio visual = valor percebido.** Muito espaço negativo, poucos elementos por tela, textos curtos. Os feedbacks confirmaram: "parece um serviço caro".
4. **Texto pequeno e delicado, títulos contidos.** Nada de tipografia gigante.
5. **Uma seção, uma ideia.** Cada bloco responde uma pergunta do visitante.

---

## 2. Processo de trabalho

```
Briefing → Paleta e tipo (validar) → Protótipo HTML único (iterar no chat)
→ Ajuste de fotos → Stack final (Next.js) → GitHub → Vercel → Feedback real → Refino
```

- Iterar em **um único HTML** até a direção estar aprovada. Só então portar para a stack.
- Validar com print do rascunho do cliente quando existir. Interpretar a **intenção**, não copiar literalmente (um rascunho de 2 minutos não é especificação).
- Publicar a cada rodada e pedir feedback em poucos pontos objetivos.

---

## 3. Layout e grid

| Item | Valor |
|---|---|
| Colunas | 12, `minmax(0,1fr)` |
| Gap | `clamp(12px, 1.6vw, 24px)` |
| Largura máxima | `1520px` |
| Margem lateral | `clamp(16px, 3.5vw, 50px)` + safe-area |
| Padding vertical de seção | `clamp(72px, 10vw, 150px)` (mobile: `64px`) |

**Padrões de composição recorrentes**

- **Cabeçalho de seção:** linha de 1px no topo + legenda à esquerda (col 1–3) + legenda à direita (col 10–12).
- **Declaração:** texto display em col 4–11, dois parágrafos pequenos em col 4–7 e 8–11.
- **Foto + texto lateral:** foto ocupa 6–7 colunas, texto em 3–4 colunas do lado oposto, alinhado ao centro; nota secundária alinhada à base.
- **Lista linear:** linhas de 12 colunas separadas por 1px (nome 1–5, descrição 6–9, meta 10–11, traço 12).
- **Foto em largura total:** sem margens, texto sobreposto no terço inferior esquerdo (col 1–4).

**Ritmo de fundos:** alternar claro → tom de pele/bege → escuro → claro. Nunca dois blocos escuros seguidos sem conteúdo entre eles.

---

## 4. Tipografia

Duas famílias. Uma **display serifada fina e vertical** para títulos e marca; uma **sans neutra leve** para todo o resto.

| Papel | Família (Adelle) | Peso | Tamanho | Observação |
|---|---|---|---|---|
| Marca (hero) | Italiana | 400 | `clamp(36px, 3.8vw, 60px)` | letter-spacing `.3em`, caixa alta |
| Declaração | Italiana | 400 | `clamp(24px, 2.5vw, 38px)` | line-height 1.25 |
| Citação / título de seção | Italiana | 400 | `clamp(24px, 2.3vw, 34px)` | |
| Título de CTA | Italiana | 400 | `clamp(30px, 3.2vw, 48px)` | maior título da página fora do hero |
| Item de lista | Italiana | 400 | `clamp(19px, 1.6vw, 24px)` | |
| Texto corrido | Inter Tight | 300 | `14.5px` | line-height 1.75, máx. 38ch |
| Legenda | Inter Tight | 300 | `11px` | caixa alta, letter-spacing `.24em` |
| Menu | Inter Tight | 300 | `12.5px` | separadores de 1px |

**Regras**

- Destaque dentro de frase: **cor secundária**, não itálico (Italiana não tem itálico).
- Nunca ultrapassar ~48px em títulos fora do hero.
- Texto pequeno: aumentar tamanho antes de aumentar peso. Peso 300 sempre.
- **Não reutilizar fontes entre clientes.** Cormorant Garamond já está em outro projeto (Odemi); Italiana é da Adelle.

---

## 5. Cor

Estrutura de tokens (os valores mudam por cliente, a estrutura não):

| Token | Papel | Adelle |
|---|---|---|
| `--branco` | fundo claro principal | `#FFFFFF` |
| `--onix` | fundo escuro | `#0F0E0D` |
| `--grafite` | texto | `#262321` |
| `--taupe` | texto secundário (AA ≥ 4.5 sobre claros) | `#6F6055` |
| `--pele` | texto secundário sobre escuro | `#D6BFAC` |
| `--areia` | superfície | `#E9DFD3` |
| `--nude` / `--linho` | fundos de seção amostrados das fotos | `#E9DDCA` / `#E3DCD1` |
| `--line` / `--line-d` | linhas 1px (claro / escuro) | `rgba(38,35,33,.12)` / `rgba(233,223,211,.14)` |

- Proporção: **60% fundos, 30% tons de superfície, 10% texto e detalhe.**
- Neutros sempre com leve viés para o tom da marca (nunca cinza puro).
- Tons de superfície nunca como cor de texto sobre fundo claro.
- Conferir contraste de cada par texto/fundo (script simples em Python com a fórmula WCAG).

---

## 6. Fotografia

### Direção de arte

- Foco total no assunto, fundo liso e claro, luz natural lateral.
- Pessoas: pele real, expressão neutra, sem sorriso de banco de imagem; perfil e olhos fechados funcionaram muito bem.
- Paleta da foto alinhada à paleta do site (nada de fundos rosa, azul ou saturados).
- Resolução: **1600–2800px** de largura, JPEG qualidade 82–88, progressivo.

### Técnica de fusão (o diferencial do site)

1. **Fundo da seção = fundo da foto.** Amostrar a cor das bordas da imagem (PIL, média de uma faixa lateral) e usar como cor da seção.
2. **Recorte quando o fundo não é liso.** Remover o fundo com BiRefNet (ONNX, `onnx-community/BiRefNet_lite-ONNX`, licença MIT) e recompor sobre a cor exata da seção. Deixar respiro acima da cabeça (padding de 8–14%).
3. **Tratamento de cor único:** saturação 0.55–0.82, leve aquecimento (R ×1.02, B ×0.95).
4. **Máscaras em curva, nunca lineares.** Gradientes com 8 a 14 paradas que imitam ease-in-out. Variantes:

| Máscara | Uso |
|---|---|
| `b` | dissolve só embaixo (hero) |
| `long` | topo e base, curva longa (fotos em largura total) |
| `edge-b` | laterais curtas + base (retrato sobre cor) |
| `lr-tb` | quatro lados (objeto/produto) |

5. **Transições entre seções (`Fuse`):** gradiente vertical interpolado em `oklab` com `color-mix`, 8 paradas, altura `clamp(220px, 26vw, 420px)` (mobile: 100px).

Feedback que originou isso: "gradientes secos, ainda dá para ver as bordas".

---

## 7. Componentes

| Componente | Função | Notas |
|---|---|---|
| `Header` | logo · menu central · contato | absoluto sobre o hero, sem fundo |
| `Hero` | marca + frase curta + CTA + foto central | foto centralizada abaixo do menu; 4 fatos em legenda no rodapé do hero |
| `SectionHead` | linha + duas legendas | abre quase toda seção |
| `Intro` | declaração + dois parágrafos | primeira seção após o hero |
| `FusedImage` | foto sem moldura + máscara | `next/image` com `fill` e `sizes` |
| `Fuse` | transição de cor entre seções | props `from` e `to` |
| Overlay (`Ritual`, `Espaco`) | foto em largura total com texto | texto no terço inferior |
| Lista (`Tratamentos`) | catálogo linear clicável | cada linha abre o agendamento já preenchido |
| Feature (`HomeCare`) | texto · foto · notas laterais | notas viram linhas no mobile |
| CTA (`Agendar`) | título + texto + link | |
| `BookingDrawer` | painel lateral em 2 toques | contexto React; `OpenBooking` abre de qualquer lugar |
| `BookingFab` | botão fixo | canto inferior direito |
| `Footer` | 4 colunas de notas | sem logo gigante |

**Link padrão:** texto em caixa alta 11px + traço de 44px que cresce para 84px no hover.

---

## 8. Movimento

- Entrada do hero: fade de 2s na foto; texto sobe 10px em 1.6s.
- Hover: deslocamentos lineares (14px) e traços que crescem. Nada de escala ou sombra.
- Curva única: `cubic-bezier(.22,.8,.24,1)`.
- `prefers-reduced-motion` desliga tudo.

---

## 9. Mobile

Feedback real: "o mobile ficou extensivo demais". Regras:

- Meta: página no celular **≤ 60% da altura do desktop**.
- Transições de seção: 100px.
- Fotos em largura total: `82–92vw` de altura.
- Retratos e objetos **não ocupam a largura toda**: deslocar no grid (col 4–13 ou 4–10).
- Notas laterais viram linhas (`rótulo | texto`).
- Padding de seção 64px, cabeçalho de seção com 32px de margem.
- Menu some; ficam logo e contato.

---

## 10. Stack e arquitetura

- **Next.js 15 (App Router)** + TypeScript + CSS Modules, sem framework de UI.
- `next/font/google` (fontes servidas localmente) e `next/image` (AVIF/WebP, `deviceSizes` até 2400).
- Geração estática; deploy na Vercel conectado à `main`.

```
src/
  app/            layout (fontes, metadados), page (composição), globals.css
  styles/         tokens.css (cor, tipo, layout, máscaras) · base.css (reset, utilitários)
  content/        site.ts (todo o texto e os dados)
  components/
    layout/       Header, Footer, BookingFab
    sections/     uma seção por arquivo, cada uma com seu .module.css
    ui/           FusedImage, Fuse
    booking/      Provider (contexto), Drawer, OpenBooking
public/img/       fotos tratadas
```

**Regras**

- Texto nunca dentro de componente: tudo em `content/site.ts`.
- Utilitários globais só para o que se repete em várias seções (`.wrap`, `.grid`, `.lbl`, `.sm`, `.link`, `.mask-*`, `.head`).
- **Antes do deploy:** `npm audit`. A Vercel bloqueia versões do Next com vulnerabilidade crítica (a 15.3.3 falhou; a 15.5.29 passou). Fixar versões exatas.

---

## 11. O que foi rejeitado (não repetir)

| Tentativa | Motivo |
|---|---|
| Formas duras: retângulos, cantos, linhas de grid aparentes em excesso | "remete a dureza" |
| Arcos, cápsulas e círculos em tudo | virou decorativo; o certo foi fusão, não moldura |
| Fonte mono em legendas | técnica demais para o público |
| Tipografia gigante (logo enorme no rodapé, títulos de 100px) | "tem que sair" |
| Fundo rosa / foto com tom rosado | fugia do nude bege |
| Gradientes lineares curtos | bordas visíveis |
| Retrato recortado com roupa cortada seco | parecia colagem |
| Fonte usada em outro projeto | identidade precisa ser exclusiva |
| Seguir o rascunho ao pé da letra | grid ficou pobre; o rascunho indica direção |
| Faixa de texto corrido em movimento (marquee) | descartada em todos os sites: ruído, não informação |

---

## 12. Adaptação para advocacia

### O que se mantém
Grid, ritmo de seções, técnica de fusão de imagem, escala tipográfica, textos pequenos, lista linear, stack e arquitetura.

### O que muda

| Adelle (estética) | Advocacia |
|---|---|
| Tratamentos | Áreas de atuação |
| Agendamento em 2 toques | Solicitar consulta: área → forma de contato (presencial, vídeo) |
| Filosofia | Princípios / forma de atuação |
| Ritual | Método (como o caso é conduzido) |
| Home care | Acompanhamento do caso / transparência |
| Espaço | Escritório |
| — | Sócios e equipe (retratos sobre fundo neutro, mesma técnica de recorte) |
| — | Publicações / artigos (opcional, reforça autoridade) |

**Paleta sugerida (dentro do seu repertório):** branco e preto como fundos; pedra/cinza quente, oliva escuro ou azul-marinho como superfície; papel (off-white quente) como fundo de seção. Evitar o bege da Adelle para não parecerem irmãos.

**Tipografia:** nova display serifada, mais estrutural que a Italiana (advocacia pede firmeza, não delicadeza). Candidatas no Google Fonts: Bodoni Moda, Libre Caslon Display, Gilda Display, Playfair Display SC (usar com cuidado). Sans: trocar a Inter Tight por outra neutra (ex.: Manrope, Instrument Sans) para manter exclusividade.

**Fotografia:** arquitetura e materiais (pedra, madeira escura, papel, couro envelhecido), mãos com documentos, retratos dos sócios em luz lateral, livros. Nada de martelo, balança ou aperto de mão.

**Tom de voz:** frases curtas, vocabulário técnico preciso, nenhum superlativo.

**Atenção às regras da OAB (Provimento 205/2021):** publicidade informativa e sóbria; proibido prometer resultado, divulgar valores ou captar clientela de forma mercantil; citar casos só com autorização e sem identificar clientes. Na prática, o tom silencioso deste padrão já ajuda; revisar todo o texto com isso em mente.

---

## 13. Briefing inicial para o próximo projeto

> Landing para [nome], escritório de advocacia de alto padrão em [cidade], atuação em [áreas]. Seguir o padrão Adelle (docs/PADRAO.md): grid de 12 colunas, imagens fundidas ao fundo, display serifada fina com sans leve, textos pequenos. Paleta [a definir], fonte display nova. Seções: hero, escritório, princípios, método, áreas de atuação, sócios, escritório físico, contato. Começar definindo paleta e tipografia para validação, depois protótipo HTML único.

---

## 14. Advocacia · direção final (Vieira Prado)

As direções escuras (balança 3D, estátua com véu, salão de mármore) foram exploradas e descartadas. A direção aprovada é clara, editorial e minimalista, com efeitos de movimento como diferencial.

**Conceito:** grid editorial visível em traço fino + camadas (bloco de cor atrás, foto sobreposta). A linha é o fio condutor: o bloco do hero vira linha na rolagem, a linha mede o método, a linha separa as áreas.

**Paleta:** `--bg #FAF8F4` · `--paper #F3EFE7` · `--ink #1C1B19` · `--mut #6B675F` · `--dim #8C877D` · `--oliva #4E5A3B` (marca) · linhas `rgba(28,27,25,.13)`.

**Tipografia:** Spectral 200/300 (títulos, itálico para destaque) + Manrope 300/400 (texto). Títulos finos; abaixo de ~28px usar peso 300.

**Fotografia:** arquitetura modernista paulistana (brises, concreto aparente), interior com mobiliário brasileiro e cobogó, retratos em luz lateral sobre parede off-white. Nada de martelo, balança literal ou skyline.

**Efeitos aprovados:** abertura com nome + linha carregando; grid que se desenha; revelação por cortina (clip-path) com parallax interno; títulos palavra a palavra; manifesto com palavras que acendem; método em rolagem horizontal com linha de progresso; imagem flutuante seguindo o cursor na lista de áreas; cursor próprio com rótulo; botão magnético; zoom-out na foto larga; rolagem suave (Lenis). Tudo desligado com `prefers-reduced-motion`; cursor, imagem flutuante e rolagem horizontal desligados em toque/mobile.

**Rejeitado nesta fase:** faixa de texto corrido (marquee); cartões de vidro, botões em pílula, fonte mono; tom "papel" fraco; escuro vazio; dourado brilhante.

**Stack:** Next.js 15.5 + CSS Modules + GSAP/ScrollTrigger + Lenis. `postcss` fixado via `overrides` (vulnerabilidade da versão embutida no Next 15).
