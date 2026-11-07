// Servidor do EcoVerde: entrega o site (public/) e a rota do EcoBot.
import express from "express";
import path from "node:path";
import { perguntarIA, TAMANHO_MAXIMO } from "./lib/ia.js";

const app = express();
const PORTA = process.env.PORT || 3000;

app.disable("x-powered-by");
app.use(express.json({ limit: "4kb" }));
app.use(express.static(path.join(import.meta.dirname, "public"), { extensions: ["html"] }));

app.post("/api/assistente", (req, res) => {
  const pergunta = typeof req.body?.pergunta === "string" ? req.body.pergunta.trim() : "";

  if (!pergunta) {
    return res.status(400).json({ erro: "Envie uma pergunta no campo \"pergunta\"." });
  }
  if (pergunta.length > TAMANHO_MAXIMO) {
    return res.status(400).json({ erro: `A pergunta deve ter até ${TAMANHO_MAXIMO} caracteres.` });
  }

  res.json(perguntarIA(pergunta));
});

// Usada pelo Railway (e por nós) para saber se o servidor está no ar.
app.get("/api/saude", (_req, res) => res.json({ status: "ok" }));

// Corpo JSON inválido ou grande demais.
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({ erro: status === 500 ? "Erro interno do servidor." : "Requisição inválida." });
});

app.listen(PORTA, () => {
  console.log(`EcoVerde no ar em http://localhost:${PORTA}`);
});
