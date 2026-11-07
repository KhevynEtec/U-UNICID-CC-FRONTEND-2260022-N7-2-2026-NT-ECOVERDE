// Testes do EcoBot. Rode com: npm test
// Nenhum teste chama a API de verdade: usamos um cliente falso.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import { perguntarIA, normalizar } from "../lib/ia.js";
import { FAQ } from "../lib/faq.js";

const SEM_IA = { cliente: null };

/** Cliente falso que imita client.messages.create. */
function clienteFalso(resposta) {
  const chamadas = [];
  return {
    chamadas,
    messages: {
      create: async (params) => {
        chamadas.push(params);
        if (resposta instanceof Error) throw resposta;
        return resposta;
      },
    },
  };
}

const casos = [
  ["Como separar o lixo reciclável?", "reciclagem"],
  ["O que é a Usina de Itaipu?", "itaipu"],
  ["Quais os impactos de Itaipu?", "impactos"],
  ["Como uma hidrelétrica gera energia?", "hidreletrica"],
  ["O que é o SETEMBRO VERDE?", "setembro-verde"],
  ["Como posso doar?", "doacao"],
  ["Quais são os atalhos de teclado?", "atalhos"],
  ["Como economizar água em casa?", "agua"],
  ["oi", "saudacao"],
];

for (const [pergunta, idEsperado] of casos) {
  test(`FAQ: "${pergunta}" responde sobre ${idEsperado}`, async () => {
    const esperado = FAQ.find((item) => item.id === idEsperado);
    const { resposta, encontrou, fonte } = await perguntarIA(pergunta, SEM_IA);
    assert.equal(encontrou, true);
    assert.equal(fonte, "faq");
    assert.equal(resposta, esperado.resposta);
  });
}

test("FAQ tem prioridade: não chama a API quando encontra a resposta", async () => {
  const cliente = clienteFalso({ stop_reason: "end_turn", content: [{ type: "text", text: "da IA" }] });
  const { fonte } = await perguntarIA("O que é a Usina de Itaipu?", { cliente });
  assert.equal(fonte, "faq");
  assert.equal(cliente.chamadas.length, 0);
});

test("sem chave de API, pergunta fora do FAQ recebe resposta padrão", async () => {
  const { encontrou, fonte, sugestoes } = await perguntarIA("Qual a cotação do dólar?", SEM_IA);
  assert.equal(encontrou, false);
  assert.equal(fonte, "faq");
  assert.ok(sugestoes.length > 0);
});

test("com chave, pergunta fora do FAQ é respondida pela API de IA", async () => {
  const cliente = clienteFalso({
    stop_reason: "end_turn",
    content: [{ type: "thinking", thinking: "" }, { type: "text", text: "Resposta da IA." }],
  });
  const resultado = await perguntarIA("Por que o vidro demora tanto para se decompor?", { cliente });
  assert.equal(resultado.fonte, "ia");
  assert.equal(resultado.resposta, "Resposta da IA.");
  assert.equal(cliente.chamadas.length, 1);
  assert.equal(cliente.chamadas[0].model, "claude-haiku-5-5");
  assert.match(cliente.chamadas[0].system[0].text, /EcoBot/);
});

test("se a API falhar, o EcoBot volta para a resposta padrão do FAQ", async () => {
  const cliente = clienteFalso(new Error("rede fora do ar"));
  const original = console.error;
  console.error = () => {};
  try {
    const resultado = await perguntarIA("Pergunta sem resposta no FAQ xyz", { cliente });
    assert.equal(resultado.fonte, "faq");
    assert.equal(resultado.encontrou, false);
  } finally {
    console.error = original;
  }
});

test("recusa da IA (stop_reason refusal) cai na resposta padrão", async () => {
  const cliente = clienteFalso({ stop_reason: "refusal", content: [] });
  const resultado = await perguntarIA("Pergunta sem resposta no FAQ xyz", { cliente });
  assert.equal(resultado.encontrou, false);
});

test("normalizar remove acentos, maiúsculas e pontuação", () => {
  assert.equal(normalizar("  Água, ENERGIA e Inclusão!  "), "agua energia e inclusao");
});

test("todo link do FAQ aponta para uma página que existe em public/", () => {
  for (const item of FAQ) {
    if (!item.link) continue;
    const arquivo = item.link.href.split("#")[0];
    assert.ok(existsSync(path.join(import.meta.dirname, "..", "public", arquivo)), `${item.id}: ${arquivo}`);
  }
});
