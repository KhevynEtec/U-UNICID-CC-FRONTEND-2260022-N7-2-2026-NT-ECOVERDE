// Servidor do EcoVerde: entrega o site (public/) e a rota do EcoBot.
import express from "express";
import path from "node:path";

// Em desenvolvimento, lê as variáveis do arquivo .env (fora do Git).
// No Railway elas vêm da aba Variables, então a falta do arquivo é normal.
try {
  process.loadEnvFile();
} catch {
  /* sem .env: segue com as variáveis do ambiente */
}

const { perguntarIA, iaConfigurada, TAMANHO_MAXIMO } = await import("./lib/ia.js");
const { criarVerificadorEmail, dominioDoEmail } = await import("./lib/email.js");

const app = express();
const PORTA = process.env.PORT || 3000;

app.disable("x-powered-by");
app.set("trust proxy", 1); // o Railway fica na frente do servidor como proxy
app.use(express.json({ limit: "4kb" }));
app.use(express.static(path.join(import.meta.dirname, "public"), { extensions: ["html"] }));

// Limite simples de pedidos por visitante (IP), com contagem própria para cada rota.
function criarLimitador({ limitePorMinuto, mensagem }) {
  const pedidosPorIp = new Map();
  setInterval(() => {
    const agora = Date.now();
    for (const [ip, registro] of pedidosPorIp) if (agora - registro.inicio > 60_000) pedidosPorIp.delete(ip);
  }, 60_000).unref();

  return function limitarPedidos(req, res, next) {
    const agora = Date.now();
    const registro = pedidosPorIp.get(req.ip);
    if (!registro || agora - registro.inicio > 60_000) {
      pedidosPorIp.set(req.ip, { inicio: agora, total: 1 });
      return next();
    }
    if (++registro.total > limitePorMinuto) return res.status(429).json({ erro: mensagem });
    next();
  };
}

// EcoBot: protege os créditos da API de IA.
const limitarEcoBot = criarLimitador({
  limitePorMinuto: 15,
  mensagem: "Muitas perguntas seguidas. Aguarde um minuto e tente de novo.",
});

app.post("/api/assistente", limitarEcoBot, async (req, res) => {
  const pergunta = typeof req.body?.pergunta === "string" ? req.body.pergunta.trim() : "";

  if (!pergunta) {
    return res.status(400).json({ erro: "Envie uma pergunta no campo \"pergunta\"." });
  }
  if (pergunta.length > TAMANHO_MAXIMO) {
    return res.status(400).json({ erro: `A pergunta deve ter até ${TAMANHO_MAXIMO} caracteres.` });
  }

  res.json(await perguntarIA(pergunta));
});

// Verificação do domínio do e-mail dos formulários (registro MX).
// O formulário chama ao sair do campo de e-mail e antes da confirmação.
const verificarDominio = criarVerificadorEmail();
const limitarVerificacaoEmail = criarLimitador({
  limitePorMinuto: 30,
  mensagem: "Muitas verificações de e-mail seguidas. Aguarde um minuto e tente de novo.",
});

app.get("/api/verificar-email", limitarVerificacaoEmail, async (req, res) => {
  const dominio = dominioDoEmail(req.query.email);
  if (!dominio) {
    return res.status(400).json({ erro: "Envie um e-mail em formato válido no parâmetro \"email\"." });
  }
  res.json({ resultado: await verificarDominio(dominio) });
});

// Usada pelo Railway (e por nós) para saber se o servidor está no ar.
app.get("/api/saude", (_req, res) => res.json({ status: "ok", ia: iaConfigurada() }));

// Corpo JSON inválido ou grande demais.
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({ erro: status === 500 ? "Erro interno do servidor." : "Requisição inválida." });
});

app.listen(PORTA, () => {
  console.log(`EcoVerde no ar em http://localhost:${PORTA}`);
  console.log(iaConfigurada()
    ? "EcoBot: FAQ + API de IA ativos."
    : "EcoBot: só FAQ (defina IA_API_KEY para ativar a API de IA).");
});
