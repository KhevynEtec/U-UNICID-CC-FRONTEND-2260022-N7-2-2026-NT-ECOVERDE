/* EcoVerde — validacao.js
   Regras de validação dos formulários de contato e doação, em funções puras:
   cada uma recebe o texto digitado e devolve "" quando está certo ou a
   mensagem de erro em português, explicando como corrigir.
   Campo vazio devolve "": quem cuida de campo obrigatório é o "required".
   Usado por js/script.js (navegador), pelo server.js e pelos testes em test/. */

/* NOME ---------------------------------------------------------------- */
const CONECTIVOS = new Set(["da", "de", "do", "das", "dos", "e"]);
const SO_LETRAS = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/; // letras com acento, espaço, hífen e apóstrofo
const VOGAL = /[aeiouyà-æè-ïò-öù-ü]/;

export function validarNome(valor) {
  const nome = valor.trim().replace(/\s+/g, " ").replace(/’/g, "'");
  if (!nome) return "";

  if (!SO_LETRAS.test(nome)) {
    return "Use só letras no nome. Espaço, hífen (-) e apóstrofo (') também são aceitos.";
  }
  if (/(.)\1\1/i.test(nome.replace(/[ '-]/g, ""))) {
    return "O nome tem a mesma letra repetida 3 vezes seguidas. Confira se foi digitado corretamente.";
  }

  const palavras = nome.toLowerCase().split(" ").filter((p) => !CONECTIVOS.has(p));
  for (const palavra of palavras) {
    const letras = palavra.replace(/['-]/g, "");
    if (letras.length < 2) {
      return "Escreva o nome completo, sem abreviações: cada palavra precisa ter pelo menos 2 letras.";
    }
    if (/^(.)\1+$/.test(letras) || !VOGAL.test(letras)) {
      return `“${palavra}” não parece um nome. Informe seu nome e sobrenome verdadeiros.`;
    }
  }
  if (palavras.length < 2) {
    return "Informe nome e sobrenome, por exemplo: Maria da Silva.";
  }
  return "";
}

/* E-MAIL -------------------------------------------------------------- */
// Domínios de exemplo e de e-mail temporário.
export const DOMINIOS_RECUSADOS = new Set([
  "email.com", "exemplo.com", "exemplo.com.br", "example.com", "example.org", "example.net",
  "teste.com", "test.com", "dominio.com", "mailinator.com", "yopmail.com", "10minutemail.com",
  "guerrillamail.com", "temp-mail.org", "sharklasers.com", "trashmail.com", "maildrop.cc",
]);

// Erros de digitação comuns nos provedores mais usados.
export const CORRECOES_DOMINIO = {
  "gmial.com": "gmail.com", "gmai.com": "gmail.com", "gmal.com": "gmail.com", "gamil.com": "gmail.com",
  "gnail.com": "gmail.com", "gmaill.com": "gmail.com", "gmail.co": "gmail.com", "gmail.con": "gmail.com",
  "gmail.cm": "gmail.com", "gmail.om": "gmail.com",
  "hotmial.com": "hotmail.com", "hotmai.com": "hotmail.com", "hotmal.com": "hotmail.com",
  "hotmil.com": "hotmail.com", "homail.com": "hotmail.com", "hotmail.co": "hotmail.com",
  "hotmail.con": "hotmail.com", "hotmail.cm": "hotmail.com",
  "outlok.com": "outlook.com", "outllok.com": "outlook.com", "outloo.com": "outlook.com",
  "outlook.co": "outlook.com", "outlook.con": "outlook.com",
  "yaho.com": "yahoo.com", "yahooo.com": "yahoo.com", "yahoo.con": "yahoo.com", "yahoo.cm": "yahoo.com",
  "yahoo.com.bt": "yahoo.com.br", "hotmail.com.bt": "hotmail.com.br",
  "iclod.com": "icloud.com", "icloud.con": "icloud.com",
};

const PALAVRA_DE_TESTE = /^(teste|test|asdf|qwerty|abc|xxx)\d*$/;
const PARTE_LOCAL = /^[a-z0-9._%+-]+$/i;
const PARTE_DOMINIO = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/i;

/** Separa o e-mail em parte local e domínio, ou devolve null se o formato for inválido. */
export function separarEmail(valor) {
  const email = valor.trim();
  const partes = email.split("@");
  if (partes.length !== 2) return null;
  const [local, dominio] = partes;

  if (local.length < 1 || local.length > 64 || !PARTE_LOCAL.test(local)) return null;
  if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) return null;

  const rotulos = dominio.split(".");
  if (dominio.length > 253 || rotulos.length < 2) return null;
  if (!rotulos.every((r) => PARTE_DOMINIO.test(r))) return null;
  if (!/^[a-z]{2,}$/i.test(rotulos.at(-1))) return null;

  return { local, dominio: dominio.toLowerCase() };
}

/** Devolve o domínio correto quando o digitado é um erro comum (gmial.com → gmail.com). */
export function sugerirDominio(dominio) {
  return CORRECOES_DOMINIO[dominio.toLowerCase()] ?? null;
}

export function validarEmail(valor) {
  const email = valor.trim();
  if (!email) return "";

  const partes = separarEmail(email);
  if (!partes) {
    const local = email.split("@")[0];
    if (local.length > 64) return "A parte antes do @ pode ter no máximo 64 caracteres.";
    if (/^\.|\.@|\.\./.test(email)) {
      return "O e-mail não pode ter ponto no início, ponto antes do @ nem dois pontos seguidos.";
    }
    return "Informe um e-mail completo, no formato nome@provedor.com.br.";
  }

  const { local, dominio } = partes;
  const sugestao = sugerirDominio(dominio);
  if (sugestao) return `Você quis dizer ${local}@${sugestao}?`;

  if (DOMINIOS_RECUSADOS.has(dominio)) {
    return `Não aceitamos e-mails de exemplo ou temporários (@${dominio}). Use um e-mail que você acessa.`;
  }
  const localMinusculo = local.toLowerCase();
  if (/^(.)\1+$/.test(localMinusculo) || PALAVRA_DE_TESTE.test(localMinusculo)) {
    return "Esse e-mail parece de teste. Informe o e-mail que você usa de verdade.";
  }
  return "";
}

/* TELEFONE ------------------------------------------------------------ */
// DDDs em uso no Brasil (Plano de Numeração da Anatel).
export const DDDS = new Set([
  "11", "12", "13", "14", "15", "16", "17", "18", "19",
  "21", "22", "24", "27", "28",
  "31", "32", "33", "34", "35", "37", "38",
  "41", "42", "43", "44", "45", "46", "47", "48", "49",
  "51", "53", "54", "55",
  "61", "62", "63", "64", "65", "66", "67", "68", "69",
  "71", "73", "74", "75", "77", "79",
  "81", "82", "83", "84", "85", "86", "87", "88", "89",
  "91", "92", "93", "94", "95", "96", "97", "98", "99",
]);

/** Só os dígitos, sem o +55 do início (10 dígitos para fixo, 11 para celular). */
function digitosDoTelefone(valor) {
  const digitos = valor.replace(/\D/g, "");
  const comPais = valor.trim().startsWith("+") || digitos.length > 11;
  return comPais && digitos.startsWith("55") ? digitos.slice(2) : digitos;
}

function ehSequencia(digitos) {
  const passos = new Set();
  for (let i = 1; i < digitos.length; i++) passos.add(digitos.charCodeAt(i) - digitos.charCodeAt(i - 1));
  return passos.size === 1 && (passos.has(1) || passos.has(-1));
}

export function validarTelefone(valor) {
  const telefone = valor.trim();
  if (!telefone) return "";

  if (/[^\d\s()+-]/.test(telefone)) {
    return "Use só números. Parênteses, espaço, hífen e o +55 também são aceitos. Exemplo: (11) 91234-5678.";
  }
  const digitos = digitosDoTelefone(telefone);
  if (digitos.length !== 10 && digitos.length !== 11) {
    return "Informe o telefone com DDD: 11 dígitos para celular ou 10 para fixo. Exemplo: (11) 91234-5678.";
  }

  const ddd = digitos.slice(0, 2);
  const numero = digitos.slice(2);
  if (!DDDS.has(ddd)) return `O DDD ${ddd} não existe no Brasil. Confira o código da sua cidade.`;
  if (digitos.length === 11 && numero[0] !== "9") {
    return "Celular com 11 dígitos começa com 9 depois do DDD. Exemplo: (11) 91234-5678.";
  }
  if (digitos.length === 10 && !"2345".includes(numero[0])) {
    return "Telefone fixo começa com 2, 3, 4 ou 5 depois do DDD. Se for celular, inclua o 9: (11) 91234-5678.";
  }

  // Repetição: olha os 8 dígitos finais (pega 91111-1111).
  // Sequência: olha o número inteiro, para não recusar o exemplo (11) 91234-5678.
  if (/^(\d)\1+$/.test(numero.slice(-8)) || ehSequencia(numero)) {
    return "Esse número parece de teste (dígitos repetidos ou em sequência). Informe seu telefone verdadeiro.";
  }
  return "";
}

/** Formata como (11) 91234-5678 ou (11) 3123-4567. Telefone inválido volta sem mudança. */
export function formatarTelefone(valor) {
  if (validarTelefone(valor) || !valor.trim()) return valor;
  const digitos = digitosDoTelefone(valor);
  const numero = digitos.slice(2);
  return `(${digitos.slice(0, 2)}) ${numero.slice(0, -4)}-${numero.slice(-4)}`;
}

/* MENSAGEM ------------------------------------------------------------ */
export function validarMensagem(valor) {
  const texto = valor.trim();
  if (!texto) return "";
  if (!/[A-Za-zÀ-ÖØ-öø-ÿ]/.test(texto)) {
    return "Escreva a mensagem com palavras: ela não pode ter só números ou símbolos.";
  }
  if (/^(.)\1*$/.test(texto.toLowerCase().replace(/\s/g, ""))) {
    return "A mensagem não pode ser um único caractere repetido. Escreva sua dúvida, sugestão ou elogio.";
  }
  return "";
}

// No navegador, js/script.js (script comum, não módulo) usa as regras por aqui.
globalThis.EcoValidacao = {
  validarNome, validarEmail, separarEmail, sugerirDominio, validarTelefone, formatarTelefone, validarMensagem,
};
