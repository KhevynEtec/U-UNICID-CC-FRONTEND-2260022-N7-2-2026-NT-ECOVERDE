/* ==========================================================================
   EcoBot — assistente de perguntas frequentes do EcoVerde
   --------------------------------------------------------------------------
   - Envia a pergunta para POST /api/assistente (server.js) e mostra a resposta.
     O servidor responde pelo FAQ e, se não souber, pela API de IA; respostas
     da IA aparecem identificadas para o visitante.
   - Acessível: botão com aria-expanded, histórico em role="log" com
     aria-live, Esc fecha e devolve o foco, tudo operável por teclado.
   - Respostas inseridas com textContent (nunca innerHTML) por segurança.
   ========================================================================== */
(() => {
  "use strict";

  const ROTA = "/api/assistente";
  const SUGESTOES = [
    "Como separar o lixo reciclável?",
    "O que é a Usina de Itaipu?",
    "O que é o Setembro Verde?",
    "Quais são os atalhos de teclado?",
  ];

  const criar = (tag, atributos = {}, texto) => {
    const el = document.createElement(tag);
    for (const [nome, valor] of Object.entries(atributos)) el.setAttribute(nome, valor);
    if (texto) el.textContent = texto;
    return el;
  };

  /* Estrutura do widget ------------------------------------------------- */
  const raiz = criar("aside", { class: "ecobot", "aria-labelledby": "ecobot-titulo" });

  const botaoAbrir = criar("button", {
    type: "button",
    class: "ecobot__abrir",
    "aria-expanded": "false",
    "aria-controls": "ecobot-painel",
  });
  botaoAbrir.append(
    criar("span", { class: "ecobot__abrir-icone", "aria-hidden": "true" }, "💬"),
    criar("span", { id: "ecobot-titulo", class: "ecobot__abrir-texto" }, "EcoBot"),
    criar("span", { class: "visually-hidden" }, " – assistente de dúvidas")
  );

  const painel = criar("div", { id: "ecobot-painel", class: "ecobot__painel", hidden: "" });

  const cabecalho = criar("div", { class: "ecobot__cabecalho" });
  const titulo = criar("p", { class: "ecobot__titulo" }, "EcoBot – tire suas dúvidas");
  const botaoFechar = criar("button", { type: "button", class: "ecobot__fechar" });
  botaoFechar.append(
    criar("span", { "aria-hidden": "true" }, "×"),
    criar("span", { class: "visually-hidden" }, "Fechar EcoBot")
  );
  cabecalho.append(titulo, botaoFechar);

  const historico = criar("div", {
    class: "ecobot__historico",
    role: "log",
    "aria-live": "polite",
    "aria-label": "Conversa com o EcoBot",
    tabindex: "0",
  });

  const listaSugestoes = criar("ul", { class: "ecobot__sugestoes", "aria-label": "Perguntas sugeridas" });

  const form = criar("form", { class: "ecobot__form" });
  const rotulo = criar("label", { for: "ecobot-pergunta", class: "visually-hidden" }, "Digite sua pergunta");
  const campo = criar("input", {
    type: "text",
    id: "ecobot-pergunta",
    name: "pergunta",
    maxlength: "300",
    autocomplete: "off",
    placeholder: "Digite sua pergunta…",
    required: "",
  });
  const botaoEnviar = criar("button", { type: "submit", class: "btn btn--primario ecobot__enviar" }, "Enviar");
  form.append(rotulo, campo, botaoEnviar);

  const aviso = criar(
    "p",
    { class: "ecobot__aviso" },
    "Respostas automáticas: perguntas frequentes do site e, quando necessário, uma IA. Não informe dados pessoais."
  );

  painel.append(cabecalho, historico, listaSugestoes, form, aviso);
  raiz.append(botaoAbrir, painel);

  /* Comportamento ------------------------------------------------------- */
  const adicionarMensagem = (autor, texto, link, fonte) => {
    const item = criar("div", { class: `ecobot__msg ecobot__msg--${autor}` });
    item.append(criar("span", { class: "visually-hidden" }, autor === "bot" ? "EcoBot disse: " : "Você perguntou: "));
    item.append(criar("p", {}, texto));
    if (link?.href) {
      const a = criar("a", { href: link.href }, link.texto || "Saiba mais");
      item.append(a);
    }
    if (fonte === "ia") {
      item.append(criar("small", { class: "ecobot__fonte" }, "Resposta gerada por IA – pode conter erros."));
    }
    historico.append(item);
    historico.scrollTop = historico.scrollHeight;
  };

  const mostrarSugestoes = (lista) => {
    listaSugestoes.replaceChildren();
    for (const texto of lista.slice(0, 4)) {
      const li = criar("li");
      const botao = criar("button", { type: "button", class: "ecobot__sugestao" }, texto);
      botao.addEventListener("click", () => perguntar(texto));
      li.append(botao);
      listaSugestoes.append(li);
    }
  };

  let ocupado = false;
  async function perguntar(texto) {
    const pergunta = texto.trim();
    if (!pergunta || ocupado) return;
    ocupado = true;
    botaoEnviar.disabled = true;
    adicionarMensagem("usuario", pergunta);

    try {
      const resposta = await fetch(ROTA, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pergunta }),
      });
      const dados = await resposta.json();
      if (!resposta.ok) {
        // Erro conhecido do servidor (pergunta inválida, limite de pedidos).
        adicionarMensagem("bot", dados.erro || "Não consegui responder agora. Tente de novo.");
        return;
      }
      adicionarMensagem("bot", dados.resposta, dados.link, dados.fonte);
      mostrarSugestoes(dados.sugestoes?.length ? dados.sugestoes : SUGESTOES);
    } catch (erro) {
      adicionarMensagem(
        "bot",
        "Não consegui responder agora. Se você abriu o arquivo direto no computador, rode o servidor com npm start."
      );
    } finally {
      ocupado = false;
      botaoEnviar.disabled = false;
      campo.value = "";
      campo.focus();
    }
  }

  const abrir = () => {
    painel.hidden = false;
    botaoAbrir.setAttribute("aria-expanded", "true");
    raiz.classList.add("is-aberto");
    if (!historico.childElementCount) {
      adicionarMensagem("bot", "Olá! Eu sou o EcoBot. Pergunte sobre reciclagem, energia limpa, Itaipu, Setembro Verde ou acessibilidade.");
      mostrarSugestoes(SUGESTOES);
    }
    campo.focus();
  };

  const fechar = () => {
    painel.hidden = true;
    botaoAbrir.setAttribute("aria-expanded", "false");
    raiz.classList.remove("is-aberto");
    botaoAbrir.focus();
  };

  botaoAbrir.addEventListener("click", () => (painel.hidden ? abrir() : fechar()));
  botaoFechar.addEventListener("click", fechar);
  painel.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fechar();
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    perguntar(campo.value);
  });

  // Fica antes do rodapé na ordem de leitura, depois do conteúdo principal.
  const rodape = document.getElementById("rodape");
  if (rodape) rodape.before(raiz);
  else document.body.append(raiz);
})();
