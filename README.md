# Vieira Prado Advogados

Site institucional (landing) da Vieira Prado Advogados. Padrão visual e técnico em `docs/PADRAO.md`.

## Rodar

```bash
npm install
npm run dev
```

## Estrutura

```
src/
  app/            layout (fontes, metadados), page (composição), globals.css
  styles/         tokens.css (cor, tipo, layout) · base.css (reset, utilitários)
  content/site.ts todo o texto e os dados
  lib/motion.ts   registro do GSAP e utilitários de movimento
  components/
    layout/       Header, Footer, Loader, Backdrop, Cursor, SmoothScroll
    sections/     uma seção por arquivo, cada uma com seu .module.css
    consult/      ConsultProvider (contexto), ConsultDrawer, OpenConsult
    ui/           SplitWords, Effects
public/img/       fotos
```

## Pendências antes de ir ao ar com o cliente real

- Trocar textos, nomes, OAB, endereço e telefone em `src/content/site.ts`.
- Conectar o envio da consulta (e-mail ou WhatsApp) em `ConsultDrawer`.
- Fotos em resolução de produção (1600–2800px).
- Revisar todo o texto à luz do Provimento 205/2021 da OAB.
