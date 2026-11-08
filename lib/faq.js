// Base de conhecimento do EcoBot.
// Regra do projeto: nenhum dado inventado. As respostas resumem o que já
// está publicado nas páginas do site e apontam para elas.
// Para adicionar uma pergunta: inclua um objeto com chaves (palavras que
// a identificam), resposta curta e, se possível, o link da página.

export const SUGESTOES_INICIAIS = [
  "Como separar o lixo reciclável?",
  "O que é a Usina de Itaipu?",
  "O que é o Setembro Verde?",
  "Quais são os atalhos de teclado?",
];

export const FAQ = [
  {
    id: "saudacao",
    chaves: ["oi", "ola", "bom dia", "boa tarde", "boa noite", "ajuda", "ecobot"],
    resposta:
      "Olá! Eu sou o EcoBot, o assistente do EcoVerde. Posso tirar dúvidas sobre reciclagem, " +
      "energia limpa, a Usina de Itaipu, o Setembro Verde e a acessibilidade do site.",
    relacionadas: SUGESTOES_INICIAIS,
  },
  {
    id: "projeto",
    chaves: ["ecoverde", "projeto", "quem", "equipe", "promptdao", "objetivo", "missao"],
    resposta:
      "O EcoVerde é um portal educativo da equipe Promptdão (UNICID) que une sustentabilidade, " +
      "energia limpa e inclusão social, com a acessibilidade digital como prioridade.",
    link: { href: "sobre.html", texto: "Conheça o projeto" },
    relacionadas: ["O que é o Setembro Verde?", "Como falar com a equipe?"],
  },
  {
    id: "reciclagem",
    chaves: ["reciclagem", "reciclar", "reciclavel", "reciclaveis", "lixo", "separar", "coleta seletiva", "residuos", "descarte"],
    resposta:
      "Separe papel, plástico, metal e vidro dos resíduos orgânicos e encaminhe-os para a coleta " +
      "seletiva da sua região. Separar por tipo de material facilita a reciclagem.",
    link: { href: "galeria.html", texto: "Veja a galeria sobre reciclagem" },
    relacionadas: ["Como economizar água?", "Como economizar energia?"],
  },
  {
    id: "agua",
    chaves: ["agua", "torneira", "banho", "economizar agua", "uso racional"],
    resposta:
      "Feche a torneira enquanto escova os dentes ou ensaboa a louça e procure reaproveitar a água " +
      "sempre que for seguro.",
    link: { href: "index.html", texto: "Veja as dicas na página inicial" },
    relacionadas: ["Como economizar energia?", "Como separar o lixo reciclável?"],
  },
  {
    id: "energia",
    chaves: ["energia", "luz", "eletricidade", "economizar energia", "lampada", "aparelho", "standby"],
    resposta:
      "Apague as luzes ao sair de um ambiente, aproveite a luz natural e desligue da tomada os " +
      "aparelhos que não estão em uso.",
    link: { href: "index.html", texto: "Veja as dicas na página inicial" },
    relacionadas: ["O que é energia limpa?", "O que é a Usina de Itaipu?"],
  },
  {
    id: "energia-limpa",
    chaves: ["energia limpa", "renovavel", "renovaveis", "solar", "eolica", "hidreletrica", "sustentavel"],
    resposta:
      "Energia limpa (ou renovável) vem de fontes que se renovam na natureza, como a água dos rios, " +
      "o sol e o vento, e emite muito menos gases de efeito estufa do que os combustíveis fósseis.",
    link: { href: "itaipu.html", texto: "Leia o artigo sobre Itaipu" },
    relacionadas: ["O que é a Usina de Itaipu?", "Como uma hidrelétrica gera energia?"],
  },
  {
    id: "itaipu",
    chaves: ["itaipu", "usina", "binacional", "foz do iguacu", "paraguai", "rio parana"],
    resposta:
      "A Itaipu Binacional pertence em partes iguais ao Brasil e ao Paraguai e aproveita o Rio Paraná, " +
      "na região de Foz do Iguaçu (PR). O Tratado de Itaipu foi assinado em 1973, e a primeira " +
      "unidade geradora entrou em operação em 5 de maio de 1984.",
    link: { href: "itaipu.html", texto: "Leia o estudo de caso de Itaipu" },
    relacionadas: ["Como uma hidrelétrica gera energia?", "Quais os impactos de Itaipu?"],
  },
  {
    id: "hidreletrica",
    chaves: ["hidreletrica", "como funciona", "turbina", "turbinas", "gera energia", "gerador"],
    resposta:
      "Numa hidrelétrica, a água do reservatório é conduzida por tubulações até as turbinas. A força " +
      "da água faz as turbinas girarem, e elas acionam geradores que transformam energia mecânica " +
      "em energia elétrica.",
    link: { href: "itaipu.html", texto: "Veja o passo a passo na página Itaipu" },
    relacionadas: ["O que é a Usina de Itaipu?", "O que é energia limpa?"],
  },
  {
    id: "impactos",
    chaves: ["impacto", "impactos", "ambiental", "ecossistema", "animais", "reservatorio", "mymba kuera"],
    resposta:
      "Antes do enchimento do lago de Itaipu, a Operação Mymba Kuera (\"pega-bicho\", em tupi-guarani) " +
      "resgatou 36.450 animais da área que seria inundada. A página Itaipu discute os impactos " +
      "socioambientais e os ecossistemas da região.",
    link: { href: "itaipu.html", texto: "Leia sobre os impactos" },
    relacionadas: ["O que é a Usina de Itaipu?"],
  },
  {
    id: "setembro-verde",
    chaves: ["setembro verde", "setembro", "inclusao", "pcd", "deficiencia", "deficiencias"],
    resposta:
      "O Setembro Verde é uma ação de conscientização que reforça a importância do respeito e da " +
      "inclusão de Pessoas com Deficiência (PCD) na escola, no trabalho, na cidade e também na internet.",
    link: { href: "doacao.html", texto: "Conheça a causa Setembro Verde" },
    relacionadas: ["Como posso doar?", "Quais são os atalhos de teclado?"],
  },
  {
    id: "doacao",
    chaves: ["doar", "doacao", "doacoes", "apoiar", "contribuir", "ajudar a causa"],
    resposta:
      "A página Setembro Verde tem um formulário de doação com validação. Atenção: é um projeto " +
      "acadêmico — o formulário é demonstrativo e nenhum pagamento é processado.",
    link: { href: "doacao.html", texto: "Ir para o formulário de doação" },
    relacionadas: ["O que é o Setembro Verde?"],
  },
  {
    id: "acessibilidade",
    chaves: ["acessibilidade", "acessivel", "leitor de tela", "cego", "baixa visao", "alto contraste", "contraste", "fonte", "aumentar texto"],
    resposta:
      "O site tem link para pular ao conteúdo, alto contraste, ajuste do tamanho do texto (A+, A-, A) " +
      "e navegação completa por teclado. As preferências ficam salvas no seu navegador.",
    link: { href: "acessibilidade.html", texto: "Veja todos os recursos de acessibilidade" },
    relacionadas: ["Quais são os atalhos de teclado?"],
  },
  {
    id: "atalhos",
    chaves: ["atalho", "atalhos", "teclado", "tecla", "teclas", "accesskey", "emag"],
    resposta:
      "Atalhos no padrão eMAG: 1 vai para o conteúdo, 2 para o menu, 3 para o rodapé e 4 para a " +
      "página de acessibilidade, e 5 abre o EcoBot. A combinação depende do navegador: Alt + número no Chrome e no Edge " +
      "(Windows) e Alt + Shift + número no Firefox (Windows). Use Tab para avançar entre links e botões.",
    link: { href: "acessibilidade.html#atalhos", texto: "Veja a tabela de atalhos" },
    relacionadas: ["Quais recursos de acessibilidade o site tem?"],
  },
  {
    id: "midia",
    chaves: ["video", "audio", "podcast", "legenda", "legendas", "transcricao", "mapa"],
    resposta:
      "A página Mídia tem um vídeo narrado com legendas em português, o Podcast EcoVerde com " +
      "transcrição e um mapa da região de Itaipu. O vídeo e o podcast são produções da própria equipe.",
    link: { href: "midia.html", texto: "Ir para a central de mídia" },
  },
  {
    id: "noticias",
    chaves: ["noticia", "noticias", "novidade", "novidades"],
    resposta: "As notícias estão organizadas em cards por categoria na página Notícias (conteúdo demonstrativo).",
    link: { href: "noticias.html", texto: "Ver notícias" },
  },
  {
    id: "contato",
    chaves: ["contato", "falar", "email", "mensagem", "fale conosco", "barreira"],
    resposta:
      "Você pode falar com a equipe pelo formulário da página Contato — inclusive para relatar " +
      "uma barreira de acessibilidade.",
    link: { href: "contato.html", texto: "Ir para Contato" },
  },
  {
    id: "hospedagem",
    chaves: ["hospedagem", "dominio", "orcamento", "hospedagem verde", "servidor", "railway"],
    resposta:
      "A página Orçamento compara fornecedores de hospedagem verde e opções de registro de domínio " +
      "para publicar o EcoVerde.",
    link: { href: "orcamento_hospedagem.html", texto: "Ver o orçamento" },
  },
];
