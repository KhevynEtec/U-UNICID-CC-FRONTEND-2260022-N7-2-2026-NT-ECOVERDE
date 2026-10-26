/* EcoVerde — script.js
   JavaScript só onde HTML/CSS não bastam. Sem bibliotecas.
   O conteúdo continua acessível sem JS (aprimoramento progressivo).
   1. Menu   2. Acessibilidade (contraste e fonte)   3. Carrossel   4. Formulários */
"use strict";

const raiz = document.documentElement;
raiz.classList.remove("no-js");
raiz.classList.add("js");

// localStorage pode estar bloqueado no navegador
const guardar = {
  ler: (chave) => { try { return localStorage.getItem(chave); } catch { return null; } },
  gravar: (chave, valor) => { try { localStorage.setItem(chave, valor); } catch { /* sem persistência */ } },
};

const reduzirMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (seletor, base = document) => base.querySelector(seletor);
const $$ = (seletor, base = document) => [...base.querySelectorAll(seletor)];

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

/* 2. ACESSIBILIDADE --------------------------------------------------- */
function iniciarAcessibilidade() {
  const botaoContraste = $("#btn-contraste");
  const aviso = $("#aviso-acessibilidade");
  const NIVEL_MAX = 3;
  const anunciar = (texto) => { if (aviso) aviso.textContent = texto; };

  const aplicarContraste = (ativo) => {
    raiz.classList.toggle("alto-contraste", ativo);
    botaoContraste?.setAttribute("aria-pressed", ativo);
  };

  const aplicarFonte = (nivel) => {
    raiz.classList.remove("fonte-1", "fonte-2", "fonte-3");
    if (nivel > 0) raiz.classList.add(`fonte-${nivel}`);
  };

  const nivelSalvo = () => parseInt(guardar.ler("ecoverde-fonte"), 10) || 0;

  const mudarFonte = (delta) => {
    const novo = delta === 0 ? 0 : Math.min(NIVEL_MAX, Math.max(0, nivelSalvo() + delta));
    aplicarFonte(novo);
    guardar.gravar("ecoverde-fonte", novo);
    anunciar(novo === 0 ? "Tamanho de texto padrão." : `Tamanho de texto: nível ${novo} de ${NIVEL_MAX}.`);
  };

  aplicarContraste(guardar.ler("ecoverde-contraste") === "1");
  aplicarFonte(nivelSalvo());

  botaoContraste?.addEventListener("click", () => {
    const ativo = !raiz.classList.contains("alto-contraste");
    aplicarContraste(ativo);
    guardar.gravar("ecoverde-contraste", ativo ? "1" : "0");
    anunciar(ativo ? "Alto contraste ativado." : "Alto contraste desativado.");
  });

  $("#btn-fonte-mais")?.addEventListener("click", () => mudarFonte(1));
  $("#btn-fonte-menos")?.addEventListener("click", () => mudarFonte(-1));
  $("#btn-fonte-padrao")?.addEventListener("click", () => mudarFonte(0));
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
   A validação principal é a nativa do HTML5. Este trecho apenas mostra a
   mensagem de erro junto ao campo, marca aria-invalid e exibe a
   confirmação (o projeto ainda não tem backend). */
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
  const valido = campo.checkValidity();
  const grupo = campo.type === "radio" ? $$(`input[name="${campo.name}"]`, container) : [campo];

  grupo.forEach((item) => {
    if (valido) item.removeAttribute("aria-invalid");
    else item.setAttribute("aria-invalid", "true");
  });
  container.classList.toggle("is-invalido", !valido);
  const saida = $(".mensagem-erro", container);
  if (saida) saida.textContent = valido ? "" : mensagemPara(campo);
}

function iniciarFormulario(form) {
  const status = $(".form__status", form);
  let tentouEnviar = false;

  $$("input, select, textarea", form).forEach((campo) => {
    campo.addEventListener("invalid", () => { tentouEnviar = true; atualizarErro(campo); });
    campo.addEventListener("blur", () => { if (tentouEnviar || campo.value) atualizarErro(campo); });
    campo.addEventListener("input", () => { if (campo.getAttribute("aria-invalid") === "true") atualizarErro(campo); });
    campo.addEventListener("change", () => { if (tentouEnviar) atualizarErro(campo); });
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

  form.addEventListener("submit", (e) => {
    // O navegador só dispara "submit" com todos os campos válidos.
    // INTEGRAÇÃO PENDENTE: sem backend, o envio é interrompido aqui e
    // apenas uma confirmação de interface é exibida.
    e.preventDefault();
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

  form.addEventListener("reset", () => limparErros(form));
}

/* INICIALIZAÇÃO ------------------------------------------------------- */
iniciarMenu();
iniciarAcessibilidade();
$$("[data-carrossel]").forEach(iniciarCarrossel);
$$("form[data-validar]").forEach(iniciarFormulario);
