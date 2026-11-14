// Verificação do domínio do e-mail pelo registro MX (servidor de e-mail).
// Só confere se o domínio recebe e-mails; não confirma que a caixa existe.
// Respostas:
//   "existe"      → o domínio tem servidor de e-mail.
//   "inexistente" → o domínio não existe ou declara que não recebe e-mails.
//   "indefinido"  → não deu para saber (tempo esgotado, falha de rede).
//                   Nesse caso o formulário não bloqueia o envio.
import { resolveMx } from "node:dns/promises";
import { separarEmail } from "../public/js/validacao.js";

const ERROS_DE_DOMINIO_INEXISTENTE = new Set(["ENOTFOUND", "ENODATA"]);

/**
 * Cria a função que verifica domínios, com cache em memória.
 * O resolvedor de DNS é injetável para os testes não dependerem da internet.
 */
export function criarVerificadorEmail({
  resolverMx = resolveMx,
  tempoLimite = 3000,
  validadeCache = 60 * 60 * 1000, // 1 hora
  tamanhoMaximoCache = 1000,
  agora = Date.now,
} = {}) {
  const cache = new Map();

  async function consultarDns(dominio) {
    let temporizador;
    const esgotou = new Promise((resolve) => {
      temporizador = setTimeout(() => resolve(null), tempoLimite);
    });
    try {
      const registros = await Promise.race([resolverMx(dominio), esgotou]);
      if (registros === null) return "indefinido";
      // "MX nulo" (RFC 7505): o domínio avisa que não recebe e-mails.
      const servidores = registros.filter((mx) => mx.exchange && mx.exchange !== ".");
      return servidores.length ? "existe" : "inexistente";
    } catch (erro) {
      return ERROS_DE_DOMINIO_INEXISTENTE.has(erro.code) ? "inexistente" : "indefinido";
    } finally {
      clearTimeout(temporizador);
    }
  }

  return async function verificarDominio(dominio) {
    const chave = dominio.toLowerCase();
    const salvo = cache.get(chave);
    if (salvo && agora() - salvo.quando < validadeCache) return salvo.resultado;

    const resultado = await consultarDns(chave);
    // "indefinido" não entra no cache: na próxima vez tenta de novo.
    if (resultado !== "indefinido") {
      cache.delete(chave);
      if (cache.size >= tamanhoMaximoCache) cache.delete(cache.keys().next().value); // sai o mais antigo
      cache.set(chave, { resultado, quando: agora() });
    }
    return resultado;
  };
}

/** Domínio do e-mail, ou null se o formato for inválido (mesma regra do formulário). */
export function dominioDoEmail(email) {
  if (typeof email !== "string" || email.length > 254) return null;
  return separarEmail(email)?.dominio ?? null;
}
