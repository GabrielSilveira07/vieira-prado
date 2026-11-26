/** Todo o texto e os dados do site vivem aqui. Componentes não carregam texto. */

export const site = {
  name: "Vieira Prado",
  legalName: "Vieira Prado Advogados",
  descriptor: "Advocacia",
  since: "2009",
  oab: "OAB/SP 00.000",
  city: "São Paulo",
  description:
    "Advocacia patrimonial e empresarial em São Paulo. Cada caso conduzido diretamente pelos sócios, do primeiro contato ao encerramento.",
  legal: "Conteúdo de caráter informativo, nos termos do Provimento 205/2021 do Conselho Federal da OAB.",
};

export const nav = [
  { label: "Escritório", href: "#escritorio" },
  { label: "Método", href: "#metodo" },
  { label: "Áreas", href: "#areas" },
  { label: "Sócios", href: "#socios" },
  { label: "Contato", href: "#contato" },
];

export const hero = {
  since: "Desde 2009",
  intro: "Advocacia patrimonial e empresarial. Cada caso conduzido diretamente pelos sócios, do primeiro contato ao encerramento.",
  cta: "Solicitar consulta",
  caption: { coords: "23°33′S", coords2: "46°39′W", place: "São Paulo", motto: "Ordem · Luz · Estrutura" },
  strip: "Patrimonial · Societário · Sucessório · Contencioso",
  scroll: "Role",
  image: { src: "/img/brises.jpg", alt: "Fachada modernista com brises de concreto e sombras paralelas", label: "São Paulo" },
  thumb: { src: "/img/sala.jpg", alt: "Detalhe da sala de reunião do escritório" },
};

export const manifesto = {
  label: "Escritório",
  text: "Um escritório pequeno por escolha. Poucos casos por vez, conduzidos por quem os assumiu, com cada decisão",
  emphasis: "explicada antes de ser tomada",
  end: ".",
};

export const office = {
  label: "Atendimento",
  title: "Discrição não é ausência. É atenção integral ao que importa.",
  paragraphs: [
    "Atuamos em questões patrimoniais, sucessórias e societárias de famílias e empresas. Toda medida parte de uma análise documental completa.",
    "O cliente fala diretamente com o sócio responsável e recebe relatórios periódicos sobre cada etapa do caso.",
  ],
  image: { src: "/img/sala.jpg", alt: "Sala de reunião com mesa de jacarandá, poltronas de couro e cobogó", label: "Sala" },
};

export const method = {
  title: "Como o caso é conduzido",
  label: "Quatro etapas · um responsável",
  steps: [
    { title: "Escuta", text: "Reunião inicial para entender os fatos, os documentos e o objetivo de quem nos procura." },
    { title: "Análise", text: "Estudo completo do caso e parecer por escrito com riscos e caminhos possíveis." },
    { title: "Condução", text: "Execução da estratégia definida, com o mesmo advogado do início ao encerramento." },
    { title: "Acompanhamento", text: "Relatórios periódicos e acesso direto ao sócio responsável em cada etapa." },
  ],
};

export type Area = { name: string; text: string; kind: string; image: string };

export const areas = {
  title: "Áreas de atuação",
  label: "Seis frentes",
  cursor: "Consultar",
  items: [
    { name: "Planejamento sucessório", text: "Holdings familiares, testamentos e doações em vida.", kind: "Consultivo", image: "/img/sala.jpg" },
    { name: "Direito societário", text: "Constituição, acordos de sócios e reorganizações.", kind: "Consultivo", image: "/img/brises.jpg" },
    { name: "Contratos", text: "Elaboração, revisão e negociação de contratos empresariais.", kind: "Consultivo", image: "/img/concreto.jpg" },
    { name: "Contencioso cível", text: "Disputas contratuais e patrimoniais em todas as instâncias.", kind: "Judicial", image: "/img/brises.jpg" },
    { name: "Família e patrimônio", text: "Pactos antenupciais, divórcios e partilhas.", kind: "Misto", image: "/img/sala.jpg" },
    { name: "Imobiliário", text: "Aquisições, análise documental de imóveis e regularização.", kind: "Consultivo", image: "/img/concreto.jpg" },
  ] satisfies Area[],
};

export const team = {
  title: "Sócios",
  label: "Atendimento direto",
  cursor: "Perfil",
  members: [
    { name: "Helena Vieira", oab: "OAB/SP 000.000", text: "Sucessões, família e patrimônio. Graduada pela USP, especialista em direito de família e sucessões.", image: "/img/helena.jpg" },
    { name: "Rafael Prado", oab: "OAB/SP 000.000", text: "Societário, contratos e contencioso. Graduado pela PUC-SP, mestre em direito comercial.", image: "/img/rafael.jpg" },
  ],
};

export const space = {
  label: "Escritório · Av. Paulista",
  title: "Atendimento com hora marcada, em sala reservada.",
  image: { src: "/img/concreto.jpg", alt: "Hall modernista de concreto aparente com escadaria e luz natural" },
};

export const contact = {
  title: "Uma conversa inicial para entender",
  emphasis: "o seu caso",
  end: ".",
  cta: "Solicitar consulta",
  info: [
    { label: "Endereço", value: "Av. Paulista, 0000 · 12º andar", note: "São Paulo · SP" },
    { label: "Telefone", value: "+55 11 0000-0000", note: "Seg a sex · 9h às 18h" },
    { label: "E-mail", value: "contato@vieiraprado.adv.br", note: "Retorno em até um dia útil" },
  ],
};

export const consult = {
  steps: { area: "Sobre qual área é a consulta?", form: "Como prefere ser atendido?", data: "Seus dados para retorno.", done: "Solicitação registrada." },
  other: { name: "Outra", kind: "Ainda não sei" },
  forms: [
    { name: "Presencial", note: "Av. Paulista" },
    { name: "Vídeo", note: "Chamada agendada" },
    { name: "Telefone", note: "Retorno por ligação" },
  ],
  fields: { name: "Nome", contact: "Telefone ou e-mail", message: "Resumo (opcional)", placeholder: "Poucas linhas bastam. Não envie documentos nesta etapa." },
  errors: { name: "Informe seu nome.", contact: "Informe um telefone ou e-mail." },
  doneText: "Retornamos em até um dia útil para agendar.",
  pending: "O envio ainda não está conectado a um canal (e-mail ou WhatsApp).",
};

export const footer = { note: "São Paulo · SP" };
