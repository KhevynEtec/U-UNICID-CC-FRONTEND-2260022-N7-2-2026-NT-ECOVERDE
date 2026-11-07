// "Cérebro" do EcoBot, em duas camadas:
//   1. FAQ local (lib/faq.js) — responde primeiro, sem custo e sem chave.
//   2. API de IA (Claude, da Anthropic) — só quando o FAQ não encontra
//      resposta E a variável de ambiente IA_API_KEY está configurada.
// Sem chave, ou se a API falhar, o EcoBot continua funcionando só com o FAQ.
import Anthropic from "@anthropic-ai/sdk";
import { FAQ, SUGESTOES_INICIAIS } from "./faq.js";

export const TAMANHO_MAXIMO = 300;
const MODELO = "claude-opus-5-5";

// Palavras muito comuns que não ajudam a identificar o assunto.
const PALAVRAS_VAZIAS = new Set([
  "a", "o", "as", "os", "um", "uma", "de", "da", "do", "das", "dos", "e", "em", "no", "na",
  "nos", "nas", "por", "para", "pra", "com", "que", "qual", "quais", "como", "eu", "voce",
  "me", "se", "ser", "sao", "isso", "esse", "essa", "sobre", "posso", "pode", "fazer",
]);

const RESPOSTA_PADRAO =
  "Ainda não sei responder isso. Posso falar sobre reciclagem, economia de água e energia, " +
  "a Usina de Itaipu, o Setembro Verde e os recursos de acessibilidade do site.";

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

/** Camada 1: procura a pergunta no FAQ. Devolve o item encontrado ou null. */
export function buscarNoFaq(pergunta) {
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
  return melhor;
}

// O conteúdo do FAQ vai no prompt de sistema: a IA responde com base no que o
// site já publica, e não inventa números ou fatos (regra do projeto).
const BASE_DO_SITE = FAQ.map(
  (item) => `- ${item.resposta}${item.link ? ` (página: ${item.link.href})` : ""}`
).join("\n");

const PROMPT_SISTEMA = `Você é o EcoBot, assistente do EcoVerde, um portal educativo e acessível sobre sustentabilidade (reciclagem, uso racional de água e energia), energia limpa (estudo de caso da Usina de Itaipu) e inclusão social (Setembro Verde e acessibilidade digital). O portal é um projeto acadêmico da equipe Promptdão, da UNICID.

Como responder:
- Escreva em português do Brasil, em linguagem simples, com no máximo 3 frases curtas e sem Markdown (o texto aparece num balão de chat e é lido por leitores de tela).
- Use as informações do site abaixo como fonte principal. Para dados específicos (números, datas, nomes, preços, notícias), use somente o que está nessa lista; se o dado não estiver nela, diga que não tem essa informação e indique a página mais próxima do site.
- Conhecimento geral sobre sustentabilidade e acessibilidade pode ser usado, desde que seja amplamente aceito.
- Se a pergunta não tiver relação com os temas do portal, diga com gentileza que só pode ajudar com esses temas.
- Os formulários do site são demonstrativos: nenhum pagamento é processado. Nunca peça dados pessoais.

Informações publicadas no site:
${BASE_DO_SITE}`;

let clientePadrao;
function obterCliente() {
  if (!process.env.IA_API_KEY) return null;
  clientePadrao ??= new Anthropic({
    apiKey: process.env.IA_API_KEY,
    timeout: 30_000, // o visitante está esperando no chat
    maxRetries: 1,
  });
  return clientePadrao;
}

/** Camada 2: pergunta à API de IA. Devolve o texto ou null se não houver resposta útil. */
export async function perguntarParaApi(pergunta, cliente) {
  const resposta = await cliente.beta.messages.create({
    model: MODELO,
    max_tokens: 4000,
    output_config: { effort: "low" }, // perguntas curtas de chat
    // Se o modelo recusar por segurança, a API tenta outro modelo na mesma chamada.
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    system: [{ type: "text", text: PROMPT_SISTEMA, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: pergunta }],
  });

  if (resposta.stop_reason === "refusal") return null;

  const texto = resposta.content
    .filter((bloco) => bloco.type === "text")
    .map((bloco) => bloco.text)
    .join(" ")
    .trim();
  return texto || null;
}

/**
 * Responde a uma pergunta: primeiro pelo FAQ, depois pela API de IA (se configurada).
 * @param {string} pergunta
 * @param {{ cliente?: object | null }} [opcoes] permite injetar um cliente nos testes
 * @returns {Promise<{ resposta: string, fonte: "faq" | "ia", encontrou: boolean,
 *   link?: { href: string, texto: string }, sugestoes: string[] }>}
 */
export async function perguntarIA(pergunta, { cliente = obterCliente() } = {}) {
  const item = buscarNoFaq(pergunta);
  if (item) {
    return {
      fonte: "faq",
      encontrou: true,
      resposta: item.resposta,
      link: item.link,
      sugestoes: item.relacionadas ?? [],
    };
  }

  if (cliente) {
    try {
      const texto = await perguntarParaApi(pergunta, cliente);
      if (texto) {
        return { fonte: "ia", encontrou: true, resposta: texto, sugestoes: SUGESTOES_INICIAIS };
      }
    } catch (erro) {
      // Falha da API (chave inválida, limite, rede): registra e cai no FAQ.
      if (erro instanceof Anthropic.AuthenticationError) {
        console.error("EcoBot: IA_API_KEY inválida.");
      } else if (erro instanceof Anthropic.RateLimitError) {
        console.error("EcoBot: limite de uso da API de IA atingido.");
      } else if (erro instanceof Anthropic.APIError) {
        console.error(`EcoBot: erro ${erro.status} da API de IA.`);
      } else {
        console.error("EcoBot: falha ao contatar a API de IA:", erro.message);
      }
    }
  }

  return { fonte: "faq", encontrou: false, resposta: RESPOSTA_PADRAO, sugestoes: SUGESTOES_INICIAIS };
}

/** Indica se a camada de IA está ativa (usado no log de inicialização). */
export const iaConfigurada = () => Boolean(process.env.IA_API_KEY);
