// Testes da verificação de domínio (lib/email.js). Rode com: npm test
// Nenhum teste usa a internet: o DNS é sempre um resolvedor falso.
import { test } from "node:test";
import assert from "node:assert/strict";
import { criarVerificadorEmail, dominioDoEmail } from "../lib/email.js";

const erroDns = (code) => Object.assign(new Error(code), { code });

/** DNS falso: responde pela tabela e conta as consultas. */
function dnsFalso(tabela) {
  const consultas = [];
  const resolverMx = async (dominio) => {
    consultas.push(dominio);
    const resposta = tabela[dominio];
    if (resposta instanceof Error) throw resposta;
    if (resposta === undefined) throw erroDns("ENOTFOUND");
    return resposta;
  };
  return { resolverMx, consultas };
}

test("domínio com servidor de e-mail: existe", async () => {
  const { resolverMx } = dnsFalso({ "gmail.com": [{ exchange: "gmail-smtp-in.l.google.com", priority: 5 }] });
  assert.equal(await criarVerificadorEmail({ resolverMx })("gmail.com"), "existe");
});

test("domínio que não existe (ENOTFOUND) ou sem MX (ENODATA): inexistente", async () => {
  const { resolverMx } = dnsFalso({ "semmx.com.br": erroDns("ENODATA") });
  const verificar = criarVerificadorEmail({ resolverMx });
  assert.equal(await verificar("naoexiste-xyz.com"), "inexistente");
  assert.equal(await verificar("semmx.com.br"), "inexistente");
});

test("MX nulo (o domínio declara que não recebe e-mails): inexistente", async () => {
  const { resolverMx } = dnsFalso({ "nulo.com": [{ exchange: "", priority: 0 }], "ponto.com": [{ exchange: ".", priority: 0 }] });
  const verificar = criarVerificadorEmail({ resolverMx });
  assert.equal(await verificar("nulo.com"), "inexistente");
  assert.equal(await verificar("ponto.com"), "inexistente");
});

test("falha de rede ou de servidor DNS: indefinido", async () => {
  const { resolverMx } = dnsFalso({ "falha.com": erroDns("ESERVFAIL"), "rede.com": erroDns("ECONNREFUSED") });
  const verificar = criarVerificadorEmail({ resolverMx });
  assert.equal(await verificar("falha.com"), "indefinido");
  assert.equal(await verificar("rede.com"), "indefinido");
});

test("DNS que não responde a tempo: indefinido", async () => {
  const resolverMx = () => new Promise(() => {}); // nunca responde
  const inicio = Date.now();
  assert.equal(await criarVerificadorEmail({ resolverMx, tempoLimite: 50 })("lento.com"), "indefinido");
  assert.ok(Date.now() - inicio < 1000);
});

test("cache: o mesmo domínio não é consultado de novo (sem diferença de maiúsculas)", async () => {
  const { resolverMx, consultas } = dnsFalso({ "gmail.com": [{ exchange: "mx.gmail.com", priority: 5 }] });
  const verificar = criarVerificadorEmail({ resolverMx });
  await verificar("gmail.com");
  await verificar("GMAIL.com");
  assert.deepEqual(consultas, ["gmail.com"]);
});

test("cache: expira depois da validade e não guarda resultado indefinido", async () => {
  let relogio = 0;
  const { resolverMx, consultas } = dnsFalso({
    "gmail.com": [{ exchange: "mx.gmail.com", priority: 5 }],
    "falha.com": erroDns("ESERVFAIL"),
  });
  const verificar = criarVerificadorEmail({ resolverMx, validadeCache: 1000, agora: () => relogio });
  await verificar("gmail.com");
  relogio = 2000;
  await verificar("gmail.com");
  await verificar("falha.com");
  await verificar("falha.com");
  assert.deepEqual(consultas, ["gmail.com", "gmail.com", "falha.com", "falha.com"]);
});

test("cache: tem tamanho máximo e descarta o domínio mais antigo", async () => {
  const { resolverMx, consultas } = dnsFalso({});
  const verificar = criarVerificadorEmail({ resolverMx, tamanhoMaximoCache: 2 });
  for (const d of ["a.com", "b.com", "c.com", "a.com"]) await verificar(d);
  assert.deepEqual(consultas, ["a.com", "b.com", "c.com", "a.com"]);
});

test("dominioDoEmail usa a mesma regra de formato do formulário", () => {
  assert.equal(dominioDoEmail("Maria@Gmail.com"), "gmail.com");
  assert.equal(dominioDoEmail("maria@gmail"), null);
  assert.equal(dominioDoEmail("ma..ria@gmail.com"), null);
  assert.equal(dominioDoEmail(undefined), null);
  assert.equal(dominioDoEmail(`${"a".repeat(250)}@gmail.com`), null);
});
