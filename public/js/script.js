/* EcoVerde — script.js
   JavaScript só onde HTML/CSS não bastam. Sem bibliotecas.
   O conteúdo continua acessível sem JS (aprimoramento progressivo).
   1. Menu   2. Acessibilidade (barra e painel "Mais opções")   3. Carrossel   4. Formulários
   5. VLibras (tradutor de Libras do governo federal, carregado de fora) */
"use strict";

const raiz = document.documentElement;
// O <head> de cada página já troca no-js por js e aplica as preferências
// salvas antes do CSS (evita o pulo do menu e a tela piscar). Repetir aqui
// é uma garantia e não muda nada.
raiz.classList.remove("no-js");
raiz.classList.add("js");

// localStorage pode estar bloqueado no navegador
const guardar = {
  ler: (chave) => { try { return localStorage.getItem(chave); } catch { return null; } },
  gravar: (chave, valor) => { try { localStorage.setItem(chave, valor); } catch { /* sem persistência */ } },
  remover: (chave) => { try { localStorage.removeItem(chave); } catch { /* sem persistência */ } },
};

const reduzirMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (seletor, base = document) => base.querySelector(seletor);
const $$ = (seletor, base = document) => [...base.querySelectorAll(seletor)];

/** Cria um elemento com atributos e, opcionalmente, texto (mesmo padrão do ecobot.js). */
const criar = (tag, atributos = {}, texto) => {
  const el = document.createElement(tag);
  for (const [nome, valor] of Object.entries(atributos)) el.setAttribute(nome, valor);
  if (texto) el.textContent = texto;
  return el;
};

/* 1. MENU ------------------------------------------------------------- */
function iniciarMenu() {
  const botao = $(".nav-toggle");
  const nav = $("#menu");
  if (!botao || !nav) return;

  const estaAberto = () => botao.getAttribute("aria-expanded") === "true";
  const definirAberto = (aberto) => {
    botao.setAttribute("aria-expanded", aberto);
    nav.classList.toggle("is-aberto", aberto);
  };

  botao.addEventListener("click", () => definirAberto(!estaAberto()));

  // Esc fecha o menu e devolve o foco ao botão
  nav.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && estaAberto()) {
      definirAberto(false);
      botao.focus();
    }
  });

  // O atalho [2] abre o menu antes de mover o foco para ele
  $('a[href="#menu"]')?.addEventListener("click", () => {
    if (getComputedStyle(botao).display !== "none") definirAberto(true);
  });
}

/* 2. ACESSIBILIDADE ---------------------------------------------------
   Barra: Alto contraste, A+, A-, A, Libras e "Mais opções".
   O painel "Mais opções" é criado aqui por JavaScript: não repete HTML nas
   10 páginas, e quem está sem JavaScript não vê controles que não funcionam.
   As preferências salvas já são aplicadas pelo script do <head> antes do
   primeiro desenho; aqui elas são lidas de novo para sincronizar os controles. */

// Modos de cor: valor salvo em "ecoverde-cor" → classe no <html>.
// A mesma tabela está no script do <head> das páginas.
const MODOS_COR = {
  padrao: { classe: "", nome: "Padrão" },
  "alto-contraste": { classe: "alto-contraste", nome: "Alto contraste" },
  escuro: { classe: "modo-escuro", nome: "Modo escuro" },
  cinza: { classe: "escala-cinza", nome: "Escala de cinza" },
};

/** Cor salva. Quem tinha só a chave antiga "ecoverde-contraste" continua com o alto contraste. */
function corSalva() {
  const cor = guardar.ler("ecoverde-cor");
  if (cor && Object.hasOwn(MODOS_COR, cor)) return cor;
  return guardar.ler("ecoverde-contraste") === "1" ? "alto-contraste" : "padrao";
}

// Leitura facilitada: chave salva → classe no <html> (também lida pelo script do <head>).
const LEITURA_FACILITADA = [
  {
    chave: "ecoverde-espacamento", classe: "espacamento-texto", id: "facil-espacamento",
    rotulo: "Aumentar espaçamento do texto",
    ligado: "Espaçamento do texto aumentado.", desligado: "Espaçamento do texto normal.",
  },
  {
    chave: "ecoverde-links", classe: "destacar-links", id: "facil-links",
    rotulo: "Destacar links",
    ligado: "Links destacados.", desligado: "Destaque de links desligado.",
  },
];

/** Grupo do painel: <fieldset> com <legend>. */
function grupoDoPainel(titulo, classe = "") {
  const grupo = criar("fieldset", { class: `painel-acessibilidade__grupo ${classe}`.trim() });
  grupo.append(criar("legend", {}, titulo));
  return grupo;
}

/** Opção do painel (radio ou checkbox) com <label> de verdade. */
function opcaoDoPainel(tipo, nome, id, valor, rotulo) {
  const caixa = criar("div", { class: "painel-acessibilidade__opcao" });
  const campo = criar("input", { type: tipo, name: nome, id, value: valor });
  caixa.append(campo, criar("label", { for: id }, rotulo));
  return { caixa, campo };
}

/* Leitura em voz alta (Web Speech API do próprio navegador, sem biblioteca) */
const LIMITE_DA_FALA = 200; // caracteres por fala: alguns navegadores cortam falas longas
const BLOCOS_DE_TEXTO = "p, li, h1, h2, h3, h4, h5, h6, dt, dd, figcaption, caption, th, td, blockquote, summary, label, legend, pre, address";
const IGNORAR_NA_LEITURA = '[aria-hidden="true"], [hidden], script, style, noscript, template, .ecobot';
const VELOCIDADES = [["0.75", "0,75×"], ["1", "1× (normal)"], ["1.25", "1,25×"], ["1.5", "1,5×"]];

/** Divide o texto em frases curtas. Frases longas são quebradas em vírgulas ou espaços. */
function dividirEmFrases(texto, limite = LIMITE_DA_FALA) {
  const frases = [];
  for (let frase of texto.replace(/\s+/g, " ").trim().split(/(?<=[.!?…:;])\s+/)) {
    while (frase.length > limite) {
      let corte = frase.lastIndexOf(", ", limite);
      if (corte < limite / 2) corte = frase.lastIndexOf(" ", limite);
      if (corte <= 0) corte = limite;
      frases.push(frase.slice(0, corte + 1).trim());
      frase = frase.slice(corte + 1).trim();
    }
    if (frase) frases.push(frase);
  }
  return frases;
}

/** Textos do <main>, um por bloco (parágrafo, item, título...), sem o que está
    escondido ou com aria-hidden. O texto de .visually-hidden entra: ele existe
    justamente para quem não vê a tela. */
function textosDoMain() {
  const main = $("main");
  if (!main) return [];
  const blocos = [];
  let blocoAtual = null;
  const percurso = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, {
    acceptNode(no) {
      const el = no.parentElement;
      if (!el || !no.nodeValue.trim() || el.closest(IGNORAR_NA_LEITURA)) return NodeFilter.FILTER_REJECT;
      const visivel = el.checkVisibility ? el.checkVisibility({ visibilityProperty: true }) : el.getClientRects().length > 0;
      return visivel ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  for (let no = percurso.nextNode(); no; no = percurso.nextNode()) {
    const bloco = no.parentElement.closest(BLOCOS_DE_TEXTO) || no.parentElement;
    if (bloco !== blocoAtual) {
      blocos.push("");
      blocoAtual = bloco;
    }
    blocos[blocos.length - 1] += no.nodeValue;
  }
  return blocos.map((b) => b.replace(/\s+/g, " ").trim()).filter(Boolean);
}

/** Campo do painel: <label> em cima de um <select>. */
function seletorDoPainel(id, rotulo) {
  const caixa = criar("div", { class: "painel-acessibilidade__campo" });
  const campo = criar("select", { id });
  caixa.append(criar("label", { for: id }, rotulo), campo);
  return { caixa, campo };
}

/** Grupo "Leitura em voz alta". Devolve o grupo e a função que volta ao padrão. */
function criarLeituraEmVozAlta(anunciar) {
  const fala = window.speechSynthesis;
  const grupo = grupoDoPainel("Leitura em voz alta");
  const botoes = criar("div", { class: "painel-acessibilidade__opcoes" });
  const botaoOuvir = criar("button", { type: "button", id: "leitura-ouvir" }, "Ouvir");
  const botaoPausar = criar("button", { type: "button", id: "leitura-pausar", disabled: "" }, "Pausar");
  const botaoParar = criar("button", { type: "button", id: "leitura-parar", disabled: "" }, "Parar");
  botoes.append(botaoOuvir, botaoPausar, botaoParar);

  const velocidade = seletorDoPainel("leitura-velocidade", "Velocidade");
  for (const [valor, nome] of VELOCIDADES) velocidade.campo.append(criar("option", { value: valor }, nome));
  const velocidadeSalva = guardar.ler("ecoverde-voz-velocidade");
  velocidade.campo.value = VELOCIDADES.some(([v]) => v === velocidadeSalva) ? velocidadeSalva : "1";

  const voz = seletorDoPainel("leitura-voz", "Voz");
  const vozesDoPortugues = () => {
    const todas = fala.getVoices();
    const brasil = todas.filter((v) => /^pt[-_]br$/i.test(v.lang));
    return brasil.length ? brasil : todas.filter((v) => /^pt\b/i.test(v.lang));
  };
  const preencherVozes = () => {
    const vozes = vozesDoPortugues();
    voz.campo.replaceChildren(criar("option", { value: "" }, vozes.length ? "Automática (português)" : "Padrão do navegador"));
    for (const v of vozes) voz.campo.append(criar("option", { value: v.name }, v.name));
    const salva = guardar.ler("ecoverde-voz");
    if (vozes.some((v) => v.name === salva)) voz.campo.value = salva;
  };
  preencherVozes();
  fala.addEventListener?.("voiceschanged", preencherVozes); // a lista de vozes chega depois em alguns navegadores

  const campos = criar("div", { class: "painel-acessibilidade__opcoes" });
  campos.append(velocidade.caixa, voz.caixa);
  grupo.append(
    criar("p", { class: "painel-acessibilidade__ajuda" }, "Lê o texto selecionado ou, se nada estiver selecionado, o conteúdo principal da página."),
    botoes,
    campos,
  );

  // Estado da leitura. "rodada" muda a cada início ou parada: respostas de
  // falas antigas (canceladas) são ignoradas.
  let frases = [];
  let posicao = 0;
  let rodada = 0;
  let estado = "parado"; // "parado" | "lendo" | "pausado"

  const atualizarBotoes = () => {
    const parado = estado === "parado";
    // Não deixa o foco "sumir" num botão que vai ficar desabilitado.
    if (parado && (document.activeElement === botaoPausar || document.activeElement === botaoParar)) botaoOuvir.focus();
    botaoPausar.disabled = parado;
    botaoParar.disabled = parado;
    botaoPausar.textContent = estado === "pausado" ? "Continuar" : "Pausar";
  };

  const vozEscolhida = () => {
    const vozes = vozesDoPortugues();
    return vozes.find((v) => v.name === voz.campo.value) || vozes[0] || null;
  };

  const encerrar = (mensagem) => {
    rodada++;
    fala.cancel();
    frases = [];
    posicao = 0;
    estado = "parado";
    atualizarBotoes();
    if (mensagem) anunciar(mensagem);
  };

  const falarProxima = (minhaRodada) => {
    if (minhaRodada !== rodada) return;
    if (posicao >= frases.length) {
      encerrar("Leitura concluída.");
      return;
    }
    const trecho = new SpeechSynthesisUtterance(frases[posicao]);
    trecho.lang = "pt-BR";
    const escolhida = vozEscolhida();
    if (escolhida) trecho.voice = escolhida;
    trecho.rate = Number(velocidade.campo.value) || 1;
    trecho.addEventListener("end", () => {
      if (minhaRodada !== rodada) return;
      posicao++;
      falarProxima(minhaRodada);
    });
    trecho.addEventListener("error", (e) => {
      if (minhaRodada !== rodada || e.error === "interrupted" || e.error === "canceled") return;
      encerrar("Não foi possível continuar a leitura em voz alta.");
    });
    fala.speak(trecho);
  };

  botaoOuvir.addEventListener("click", () => {
    const selecionado = getSelection()?.toString().trim() || "";
    const lista = (selecionado ? [selecionado] : textosDoMain()).flatMap((texto) => dividirEmFrases(texto));
    if (!lista.length) {
      anunciar("Não há texto para ler.");
      return;
    }
    rodada++;
    fala.cancel();
    frases = lista;
    posicao = 0;
    estado = "lendo";
    atualizarBotoes();
    anunciar(selecionado ? "Lendo o texto selecionado." : "Lendo o conteúdo da página.");
    falarProxima(rodada);
  });

  botaoPausar.addEventListener("click", () => {
    if (estado === "lendo") {
      fala.pause();
      estado = "pausado";
      anunciar("Leitura pausada.");
    } else if (estado === "pausado") {
      fala.resume();
      estado = "lendo";
      anunciar("Leitura retomada.");
    }
    atualizarBotoes();
  });

  botaoParar.addEventListener("click", () => encerrar("Leitura interrompida."));
  velocidade.campo.addEventListener("change", () => guardar.gravar("ecoverde-voz-velocidade", velocidade.campo.value));
  voz.campo.addEventListener("change", () => guardar.gravar("ecoverde-voz", voz.campo.value));

  // Sair da página para a leitura (o navegador poderia continuar falando).
  addEventListener("pagehide", () => {
    rodada++;
    fala.cancel();
  });

  const restaurar = () => {
    encerrar();
    velocidade.campo.value = "1";
    voz.campo.value = "";
    guardar.remover("ecoverde-voz-velocidade");
    guardar.remover("ecoverde-voz");
  };
  return { grupo, restaurar };
}

function iniciarAcessibilidade() {
  const grupo = $(".controles-acessibilidade");
  const botaoContraste = $("#btn-contraste");
  const aviso = $("#aviso-acessibilidade");
  const NIVEL_MAX = 3;
  const anunciar = (texto) => { if (aviso) aviso.textContent = texto; };

  /* Cores ------------------------------------------------------------ */
  const radiosCor = [];
  const aplicarCor = (cor) => {
    for (const { classe } of Object.values(MODOS_COR)) if (classe) raiz.classList.remove(classe);
    if (MODOS_COR[cor].classe) raiz.classList.add(MODOS_COR[cor].classe);
    botaoContraste?.setAttribute("aria-pressed", cor === "alto-contraste");
    for (const radio of radiosCor) radio.checked = radio.value === cor;
  };
  const escolherCor = (cor, mensagem = `Cores: ${MODOS_COR[cor].nome}.`) => {
    aplicarCor(cor);
    guardar.gravar("ecoverde-cor", cor);
    guardar.remover("ecoverde-contraste"); // chave antiga: a escolha agora fica em "ecoverde-cor"
    anunciar(mensagem);
  };

  /* Fonte ------------------------------------------------------------ */
  const aplicarFonte = (nivel) => {
    raiz.classList.remove("fonte-1", "fonte-2", "fonte-3");
    if (nivel > 0) raiz.classList.add(`fonte-${nivel}`);
  };

  // Só 0 a 3, como no script do <head>: um valor estranho salvo é ignorado
  // (antes virava uma classe inexistente, como "fonte-9").
  const nivelSalvo = () => {
    const nivel = parseInt(guardar.ler("ecoverde-fonte"), 10);
    return nivel >= 0 && nivel <= NIVEL_MAX ? nivel : 0;
  };

  const mudarFonte = (delta) => {
    const novo = delta === 0 ? 0 : Math.min(NIVEL_MAX, Math.max(0, nivelSalvo() + delta));
    aplicarFonte(novo);
    guardar.gravar("ecoverde-fonte", novo);
    anunciar(novo === 0 ? "Tamanho de texto padrão." : `Tamanho de texto: nível ${novo} de ${NIVEL_MAX}.`);
  };

  aplicarCor(corSalva());
  aplicarFonte(nivelSalvo());

  // Botão rápido da barra: liga e desliga o alto contraste (sincronizado com o painel).
  botaoContraste?.addEventListener("click", () => {
    const ativo = !raiz.classList.contains("alto-contraste");
    escolherCor(ativo ? "alto-contraste" : "padrao", ativo ? "Alto contraste ativado." : "Alto contraste desativado.");
  });

  $("#btn-fonte-mais")?.addEventListener("click", () => mudarFonte(1));
  $("#btn-fonte-menos")?.addEventListener("click", () => mudarFonte(-1));
  $("#btn-fonte-padrao")?.addEventListener("click", () => mudarFonte(0));

  // Os botões "Libras" e "Mais opções" estão no HTML das páginas (e não são
  // criados aqui): se surgissem depois do primeiro desenho, a barra mudaria de
  // altura e empurraria a página (CLS). Sem JavaScript a barra toda fica escondida.
  const botaoLibras = $("#btn-libras");
  const botaoMais = $("#btn-mais-opcoes");
  if (!grupo || !aviso || !botaoMais) return;

  // Botão "Libras": abre o tradutor VLibras. Fica com o espaço reservado,
  // invisível e fora do Tab (data-aguardando), até o VLibras carregar (seção 5).
  // O botão do próprio VLibras fica no fim da página; este fica no começo.
  botaoLibras?.addEventListener("click", () => {
    window.VLibrasWidget?.open?.();
    anunciar("Tradutor de Libras aberto.");
  });

  /* Painel "Mais opções" --------------------------------------------- */
  const painel = criar("div", { id: "painel-acessibilidade", class: "painel-acessibilidade", hidden: "" });
  grupo.after(painel); // logo depois dos botões: o Tab segue de "Mais opções" para o painel
  botaoMais.setAttribute("aria-controls", painel.id); // só agora o painel existe (o W3C exige o id)

  const definirPainel = (aberto) => {
    painel.hidden = !aberto;
    botaoMais.setAttribute("aria-expanded", aberto);
  };
  botaoMais.addEventListener("click", () => definirPainel(painel.hidden));
  // Esc fecha o painel e devolve o foco ao botão
  const fecharComEsc = (e) => {
    if (e.key === "Escape" && !painel.hidden) {
      definirPainel(false);
      botaoMais.focus();
    }
  };
  painel.addEventListener("keydown", fecharComEsc);
  botaoMais.addEventListener("keydown", fecharComEsc);

  // Grupo "Cores"
  const grupoCores = grupoDoPainel("Cores");
  const opcoesCor = criar("div", { class: "painel-acessibilidade__opcoes" });
  for (const [valor, { nome }] of Object.entries(MODOS_COR)) {
    const { caixa, campo } = opcaoDoPainel("radio", "ecoverde-cor", `cor-${valor}`, valor, nome);
    campo.addEventListener("change", () => { if (campo.checked) escolherCor(valor); });
    radiosCor.push(campo);
    opcoesCor.append(caixa);
  }
  grupoCores.append(opcoesCor);
  painel.append(grupoCores);
  aplicarCor(corSalva()); // marca o radio da cor atual

  // Grupo "Leitura em voz alta": só existe se o navegador tiver a Web Speech API.
  let leitura = null;
  if (window.speechSynthesis && typeof window.SpeechSynthesisUtterance === "function") {
    leitura = criarLeituraEmVozAlta(anunciar);
    painel.append(leitura.grupo);
  }

  // Grupo "Leitura facilitada" (checkboxes)
  const grupoFacil = grupoDoPainel("Leitura facilitada");
  const opcoesFacil = criar("div", { class: "painel-acessibilidade__opcoes" });
  const caixasFacil = LEITURA_FACILITADA.map((opcao) => {
    const { caixa, campo } = opcaoDoPainel("checkbox", opcao.chave, opcao.id, "1", opcao.rotulo);
    campo.checked = guardar.ler(opcao.chave) === "1";
    raiz.classList.toggle(opcao.classe, campo.checked);
    campo.addEventListener("change", () => {
      raiz.classList.toggle(opcao.classe, campo.checked);
      if (campo.checked) guardar.gravar(opcao.chave, "1");
      else guardar.remover(opcao.chave);
      anunciar(campo.checked ? opcao.ligado : opcao.desligado);
    });
    opcoesFacil.append(caixa);
    return { opcao, campo };
  });
  grupoFacil.append(opcoesFacil);
  painel.append(grupoFacil);

  // "Restaurar padrão": desfaz tudo, inclusive o tamanho da fonte.
  const acoes = criar("div", { class: "painel-acessibilidade__acoes" });
  const botaoRestaurar = criar("button", { type: "button", id: "btn-restaurar-padrao" }, "Restaurar padrão");
  botaoRestaurar.addEventListener("click", () => {
    aplicarCor("padrao");
    aplicarFonte(0);
    for (const { opcao, campo } of caixasFacil) {
      campo.checked = false;
      raiz.classList.remove(opcao.classe);
    }
    leitura?.restaurar();
    for (const chave of ["ecoverde-cor", "ecoverde-contraste", "ecoverde-fonte", ...LEITURA_FACILITADA.map((o) => o.chave)]) {
      guardar.remover(chave);
    }
    anunciar("Preferências de acessibilidade restauradas para o padrão.");
  });
  acoes.append(botaoRestaurar);
  painel.append(acoes);
}

/* 3. CARROSSEL ---------------------------------------------------------
   Não avança sozinho: a rotação só começa se o usuário pedir.
   Pausa ao receber foco ou ponteiro; setas do teclado navegam. */
function iniciarCarrossel(carrossel) {
  const slides = $$(".carrossel__slide", carrossel);
  const trilho = $(".carrossel__trilho", carrossel);
  const indicadores = $$(".carrossel__indicador", carrossel);
  const btnRotacao = $("[data-carrossel-rotacao]", carrossel);
  const INTERVALO = 7000;
  let atual = 0;
  let temporizador = null;
  let rotacaoAtiva = false;

  if (!slides.length || !trilho) return;

  const mostrar = (indice) => {
    atual = (indice + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-ativo", i === atual);
      slide.setAttribute("aria-hidden", i !== atual);
      if (i === atual) indicadores[i]?.setAttribute("aria-current", "true");
      else indicadores[i]?.removeAttribute("aria-current");
    });
  };

  const pararRotacao = () => { clearInterval(temporizador); temporizador = null; };
  const iniciarRotacao = () => {
    pararRotacao();
    temporizador = setInterval(() => mostrar(atual + 1), INTERVALO);
  };

  const definirRotacao = (ativa) => {
    rotacaoAtiva = ativa;
    // Na rotação automática, não interromper o leitor de tela
    trilho.setAttribute("aria-live", ativa ? "off" : "polite");
    // Texto visível = nome acessível (WCAG 2.5.3)
    if (btnRotacao) btnRotacao.textContent = ativa ? "Pausar rotação" : "Iniciar rotação";
    if (ativa) iniciarRotacao(); else pararRotacao();
  };

  $("[data-carrossel-anterior]", carrossel)?.addEventListener("click", () => mostrar(atual - 1));
  $("[data-carrossel-proximo]", carrossel)?.addEventListener("click", () => mostrar(atual + 1));
  indicadores.forEach((indicador, i) => indicador.addEventListener("click", () => mostrar(i)));

  if (btnRotacao) {
    if (reduzirMovimento) btnRotacao.hidden = true; // respeita menos movimento
    btnRotacao.addEventListener("click", () => definirRotacao(!rotacaoAtiva));
  }

  carrossel.addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea, select")) return;
    if (e.key === "ArrowLeft") { mostrar(atual - 1); e.preventDefault(); }
    if (e.key === "ArrowRight") { mostrar(atual + 1); e.preventDefault(); }
  });

  // Pausa temporária enquanto o usuário interage
  carrossel.addEventListener("focusin", pararRotacao);
  carrossel.addEventListener("mouseenter", pararRotacao);
  carrossel.addEventListener("focusout", (e) => {
    if (rotacaoAtiva && !carrossel.contains(e.relatedTarget)) iniciarRotacao();
  });
  carrossel.addEventListener("mouseleave", () => {
    if (rotacaoAtiva && !carrossel.contains(document.activeElement)) iniciarRotacao();
  });

  definirRotacao(false);
  mostrar(0);
}

/* 4. FORMULÁRIOS --------------------------------------------------------
   A validação principal é a nativa do HTML5. Este trecho mostra a
   mensagem de erro junto ao campo, marca aria-invalid e exibe a
   confirmação (o projeto ainda não tem backend).
   Campos com data-validacao="nome|email|telefone|mensagem" recebem também
   as regras de js/validacao.js, aplicadas com setCustomValidity. Se esse
   arquivo não carregar, vale só a validação HTML5. */
const regras = globalThis.EcoValidacao;
const REGRA_DO_CAMPO = {
  nome: regras?.validarNome,
  email: regras?.validarEmail,
  telefone: regras?.validarTelefone,
  mensagem: regras?.validarMensagem,
};

// E-mail cujo domínio o servidor disse não existir: campo → { valor, mensagem }.
// Sai assim que a pessoa edita o campo.
const erroDoServidor = new WeakMap();

/** Recalcula o erro personalizado do campo. Sempre limpa antes, para nada ficar "travado". */
function aplicarRegra(campo) {
  const regra = REGRA_DO_CAMPO[campo.dataset.validacao];
  if (!regra) return;
  campo.setCustomValidity("");
  if (!campo.value.trim()) return; // vazio: quem cuida é o "required"

  const doServidor = erroDoServidor.get(campo);
  const mensagem = regra(campo.value) ||
    (doServidor?.valor === campo.value.trim() ? doServidor.mensagem : "");
  campo.setCustomValidity(mensagem);
}

function mensagemPara(campo) {
  const v = campo.validity;
  const label = campo.id ? $(`label[for="${campo.id}"]`) : null;
  const rotulo = label ? `“${label.textContent.replace("*", "").trim()}”` : "Este campo";

  if (v.valueMissing) {
    if (campo.type === "radio") return "Selecione uma das opções.";
    if (campo.type === "checkbox") return "Marque esta opção para continuar.";
    if (campo.tagName === "SELECT") return `Selecione uma opção em ${rotulo}.`;
    return `Preencha o campo ${rotulo}.`;
  }
  if (v.customError) return campo.validationMessage; // regras de js/validacao.js
  if (v.typeMismatch && campo.type === "email") return "Informe um e-mail válido, por exemplo: nome@exemplo.com.";
  if (v.patternMismatch) return campo.dataset.erroFormato || "O formato informado não é válido.";
  if (v.rangeUnderflow) return `O valor mínimo é ${campo.min}.`;
  if (v.rangeOverflow) return `O valor máximo é ${campo.max}.`;
  if (v.tooShort) return `O campo ${rotulo} deve ter pelo menos ${campo.minLength} caracteres.`;
  if (v.tooLong) return `O campo ${rotulo} deve ter no máximo ${campo.maxLength} caracteres.`;
  if (v.badInput || v.stepMismatch) return "Informe um número válido.";
  return campo.validationMessage;
}

function limparErros(base) {
  $$(".mensagem-erro", base).forEach((saida) => { saida.textContent = ""; });
  $$("[aria-invalid]", base).forEach((campo) => campo.removeAttribute("aria-invalid"));
  $$(".is-invalido", base).forEach((el) => el.classList.remove("is-invalido"));
}

function atualizarErro(campo) {
  const container = campo.closest(".campo, fieldset");
  if (!container) return;
  aplicarRegra(campo);
  // validity.valid em vez de checkValidity(): checkValidity() dispara o evento
  // "invalid", que chama esta função de novo (laço infinito).
  const valido = campo.validity.valid;
  const grupo = campo.type === "radio" ? $$(`input[name="${campo.name}"]`, container) : [campo];

  grupo.forEach((item) => {
    if (valido) item.removeAttribute("aria-invalid");
    else item.setAttribute("aria-invalid", "true");
  });
  container.classList.toggle("is-invalido", !valido);
  const saida = $(".mensagem-erro", container);
  if (saida) saida.textContent = valido ? "" : mensagemPara(campo);
}

/* Pergunta ao servidor se o domínio do e-mail recebe mensagens.
   Devolve "existe", "inexistente" ou "indefinido". Qualquer falha vira
   "indefinido", e "indefinido" nunca bloqueia o formulário. */
const resultadosEmail = new Map(); // e-mail já verificado → resultado

async function verificarEmailNoServidor(campo) {
  const valor = campo.value.trim();
  if (!valor || !regras || regras.validarEmail(valor)) return "indefinido"; // só e-mail com formato válido

  let resultado = resultadosEmail.get(valor.toLowerCase());
  if (!resultado) {
    try {
      const resposta = await fetch(`/api/verificar-email?email=${encodeURIComponent(valor)}`);
      if (!resposta.ok) return "indefinido";
      ({ resultado } = await resposta.json());
    } catch {
      return "indefinido"; // sem servidor ou sem rede
    }
    if (resultado !== "existe" && resultado !== "inexistente") return "indefinido";
    resultadosEmail.set(valor.toLowerCase(), resultado);
  }

  // A pessoa mudou o e-mail enquanto esperava: a resposta antiga não vale mais.
  if (campo.value.trim() !== valor) return "indefinido";

  if (resultado === "inexistente") {
    const dominio = valor.split("@").pop().toLowerCase();
    erroDoServidor.set(campo, {
      valor,
      mensagem: `Não encontramos o domínio ${dominio}. Confira se o e-mail foi digitado corretamente.`,
    });
    atualizarErro(campo);
  }
  return resultado;
}

function iniciarFormulario(form) {
  const status = $(".form__status", form);
  const botaoEnviar = $('[type="submit"]', form);
  const campoEmail = $('[data-validacao="email"]', form);
  let tentouEnviar = false;
  let verificando = false;

  $$("input, select, textarea", form).forEach((campo) => {
    campo.addEventListener("invalid", () => { tentouEnviar = true; atualizarErro(campo); });
    campo.addEventListener("blur", () => {
      // Telefone: formata ao sair do campo, nunca durante a digitação.
      if (campo.dataset.validacao === "telefone" && regras) {
        const formatado = regras.formatarTelefone(campo.value);
        if (formatado !== campo.value) campo.value = formatado;
      }
      aplicarRegra(campo);
      if (tentouEnviar || campo.value) atualizarErro(campo);
      if (campo === campoEmail) verificarEmailNoServidor(campo);
    });
    campo.addEventListener("input", () => {
      erroDoServidor.delete(campo); // editou: o aviso do servidor some
      aplicarRegra(campo);          // e a regra é recalculada a cada mudança
      if (campo.getAttribute("aria-invalid") === "true") atualizarErro(campo);
    });
    campo.addEventListener("change", () => { if (tentouEnviar) atualizarErro(campo); });
    aplicarRegra(campo); // valor que o navegador já preencheu (voltar à página, preenchimento automático)
  });

  // Doação: o campo "outro valor" fica obrigatório quando escolhido
  const outroValor = $("[data-outro-valor]", form);
  if (outroValor) {
    const campoOutro = document.getElementById(outroValor.dataset.outroValor);
    const containerOutro = campoOutro.closest(".campo");

    const sincronizarOutro = () => {
      const ativo = outroValor.checked;
      campoOutro.required = ativo;
      campoOutro.disabled = !ativo;
      containerOutro.hidden = !ativo;
      if (!ativo) {
        campoOutro.value = "";
        limparErros(containerOutro);
      }
    };

    $$(`input[name="${outroValor.name}"]`, form).forEach((radio) => {
      radio.addEventListener("change", () => {
        sincronizarOutro();
        if (outroValor.checked) campoOutro.focus();
      });
    });
    sincronizarOutro();
  }

  form.addEventListener("submit", async (e) => {
    // O navegador só dispara "submit" com todos os campos válidos.
    // INTEGRAÇÃO PENDENTE: sem backend, o envio é interrompido aqui e
    // apenas uma confirmação de interface é exibida.
    e.preventDefault();
    if (verificando) return;

    // Antes da confirmação, confere no servidor se o domínio do e-mail existe.
    if (campoEmail?.value.trim()) {
      const valor = campoEmail.value.trim();
      verificando = true;
      if (botaoEnviar) botaoEnviar.disabled = true; // evita clique duplo
      if (status) {
        status.className = "form__status";
        status.textContent = "Verificando e-mail…";
      }
      const resultado = await verificarEmailNoServidor(campoEmail);
      verificando = false;
      if (botaoEnviar) botaoEnviar.disabled = false;

      if (campoEmail.value.trim() !== valor) {
        // O e-mail mudou durante a verificação: não confirma; a pessoa envia de novo.
        if (status) status.textContent = "";
        return;
      }
      if (resultado === "inexistente") {
        if (status) status.textContent = "";
        tentouEnviar = true;
        atualizarErro(campoEmail); // mostra "Não encontramos o domínio…" junto ao campo
        campoEmail.focus();
        return;
      }
    }

    if (status) {
      status.className = "form__status form__status--sucesso";
      status.textContent = form.dataset.sucesso ||
        "Dados validados com sucesso. Envio não realizado: integração com servidor pendente.";
    }
    form.reset();
    tentouEnviar = false;
    $$(".is-invalido", form).forEach((el) => el.classList.remove("is-invalido"));
    outroValor?.dispatchEvent(new Event("change"));
    status?.focus();
  });

  form.addEventListener("reset", () => {
    limparErros(form);
    // reset() muda os valores sem disparar "input": limpa os erros personalizados aqui.
    $$("input, select, textarea", form).forEach((campo) => {
      campo.setCustomValidity("");
      erroDoServidor.delete(campo);
    });
  });
}

/* 5. VLIBRAS ------------------------------------------------------------
   Tradutor oficial do governo federal para Libras (https://vlibras.gov.br).
   O próprio script cria o botão e a janela do avatar (em shadow DOM), então
   não há HTML do VLibras nas páginas e o W3C não é afetado.
   - Carrega depois do "load" da página, para não atrasar o site.
   - O widget se inicializa sozinho mesmo com a página já carregada
     (testado), por isso não é preciso disparar um "load" falso.
   - À esquerda (position "L"), para nunca cobrir o EcoBot, que fica à direita.
   - Sem internet ou com o site do governo fora do ar, nada acontece. */
const VLIBRAS_RAIZ = "https://vlibras.gov.br/app";

function iniciarVLibras() {
  if (document.getElementById("vlibras-script")) return; // não carrega duas vezes

  // Padrões lidos pelo script do VLibras, caso ele se inicialize antes do onload.
  window.VLibrasWidget = { path: VLIBRAS_RAIZ, position: "L" };

  const carregar = () => {
    const script = document.createElement("script");
    script.id = "vlibras-script";
    script.src = `${VLIBRAS_RAIZ}/vlibras-plugin.js`;
    script.async = true;
    script.addEventListener("load", () => {
      // Parâmetros: endereço, personalização, avatar e posição.
      if (window.VLibras?.Widget) new window.VLibras.Widget(VLIBRAS_RAIZ, undefined, undefined, "L");
      // Widget pronto: mostra o botão "Libras" da barra de acessibilidade (seção 2).
      const botaoLibras = $("#btn-libras");
      if (typeof window.VLibrasWidget?.open === "function") botaoLibras?.removeAttribute("data-aguardando");
      else if (botaoLibras) botaoLibras.hidden = true;
    });
    // Falha de rede: o site segue normalmente, sem o tradutor (e sem o botão "Libras").
    script.addEventListener("error", () => {
      script.remove();
      const botaoLibras = $("#btn-libras");
      if (botaoLibras) botaoLibras.hidden = true;
    });
    document.body.append(script);
  };

  if (document.readyState === "complete") carregar();
  else window.addEventListener("load", carregar, { once: true });
}

/* INICIALIZAÇÃO ------------------------------------------------------- */
iniciarMenu();
iniciarAcessibilidade();
$$("[data-carrossel]").forEach(iniciarCarrossel);
$$("form[data-validar]").forEach(iniciarFormulario);
iniciarVLibras();
