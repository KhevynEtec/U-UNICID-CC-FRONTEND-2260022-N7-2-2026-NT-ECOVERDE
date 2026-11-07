// "Cérebro" do EcoBot: procura a resposta mais adequada no FAQ local.
// Não usa API externa nem chave: funciona em qualquer ambiente.
import { FAQ, SUGESTOES_INICIAIS } from "./faq.js";

export const TAMANHO_MAXIMO = 300;

// Palavras muito comuns que não ajudam a identificar o assunto.
const PALAVRAS_VAZIAS = new Set([
  "a", "o", "as", "os", "um", "uma", "de", "da", "do", "das", "dos", "e", "em", "no", "na",
  "nos", "nas", "por", "para", "pra", "com", "que", "qual", "quais", "como", "eu", "voce",
  "me", "se", "ser", "sao", "e", "isso", "esse", "essa", "sobre", "posso", "pode", "fazer",
]);

/** Minúsculas, sem acentos e sem pontuação. */
export function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function pontuar(perguntaNormalizada, palavras, item) {
  let pontos = 0;
  for (const chave of item.chaves) {
    const chaveNorm = normalizar(chave);
    if (chaveNorm.includes(" ")) {
      // Expressão com mais de uma palavra: vale mais se aparecer inteira.
      if (perguntaNormalizada.includes(chaveNorm)) pontos += 3;
    } else if (palavras.some((p) => p === chaveNorm || (chaveNorm.length >= 5 && p.startsWith(chaveNorm)))) {
      pontos += 2;
    }
  }
  return pontos;
}

/**
 * Responde a uma pergunta usando o FAQ.
 * @param {string} pergunta
 * @returns {{ resposta: string, link?: { href: string, texto: string }, sugestoes: string[], encontrou: boolean }}
 */
export function perguntarIA(pergunta) {
  const perguntaNormalizada = normalizar(pergunta);
  const palavras = perguntaNormalizada.split(" ").filter((p) => p && !PALAVRAS_VAZIAS.has(p));

  let melhor = null;
  let melhorPontos = 0;
  for (const item of FAQ) {
    const pontos = pontuar(perguntaNormalizada, palavras, item);
    if (pontos > melhorPontos) {
      melhor = item;
      melhorPontos = pontos;
    }
  }

  if (!melhor) {
    return {
      encontrou: false,
      resposta:
        "Ainda não sei responder isso. Posso falar sobre reciclagem, economia de água e energia, " +
        "a Usina de Itaipu, o Setembro Verde e os recursos de acessibilidade do site.",
      sugestoes: SUGESTOES_INICIAIS,
    };
  }

  return {
    encontrou: true,
    resposta: melhor.resposta,
    link: melhor.link,
    sugestoes: melhor.relacionadas ?? [],
  };
}
