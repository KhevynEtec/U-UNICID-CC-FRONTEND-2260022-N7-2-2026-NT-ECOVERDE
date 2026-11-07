// Testes do EcoBot. Rode com: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import { perguntarIA, normalizar } from "../lib/ia.js";
import { FAQ } from "../lib/faq.js";

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
  test(`"${pergunta}" responde sobre ${idEsperado}`, () => {
    const esperado = FAQ.find((item) => item.id === idEsperado);
    const { resposta, encontrou } = perguntarIA(pergunta);
    assert.equal(encontrou, true);
    assert.equal(resposta, esperado.resposta);
  });
}

test("pergunta fora do assunto devolve resposta padrão com sugestões", () => {
  const { encontrou, sugestoes } = perguntarIA("Qual a cotação do dólar?");
  assert.equal(encontrou, false);
  assert.ok(sugestoes.length > 0);
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
