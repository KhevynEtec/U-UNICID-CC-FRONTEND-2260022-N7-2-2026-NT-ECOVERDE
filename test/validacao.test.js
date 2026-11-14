// Testes das regras dos formulários (public/js/validacao.js). Rode com: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validarNome, validarEmail, separarEmail, sugerirDominio,
  validarTelefone, formatarTelefone, validarMensagem,
} from "../public/js/validacao.js";

const aceita = (fn, valores) => {
  for (const v of valores) assert.equal(fn(v), "", `deveria aceitar: ${v}`);
};
const recusa = (fn, valores) => {
  for (const v of valores) assert.notEqual(fn(v), "", `deveria recusar: ${v}`);
};

test("campo vazio não é tratado aqui (fica com o required)", () => {
  for (const fn of [validarNome, validarEmail, validarTelefone, validarMensagem]) {
    assert.equal(fn(""), "");
    assert.equal(fn("   "), "");
  }
});

/* NOME */
test("nome: aceita nomes reais com acento, conectivos, hífen e apóstrofo", () => {
  aceita(validarNome, [
    "Maria da Silva", "João Pedro dos Santos", "José e Maria Souza", "Ana-Clara Oliveira",
    "Pedro D'Ávila", "Pedro D’Ávila", "Lynn Souza", "Yuri Navas", "  Luís   Cornélio  ", "ÂNGELA MÜLLER",
  ]);
});

test("nome: recusa os exemplos da issue e nomes falsos", () => {
  recusa(validarNome, [
    "aa", "Maria", "aa bb", "kk Silva", "Maria S", "Maria S.", "Maria 2", "Maria_Silva",
    "Maaaria Silva", "Brr Silva", "da Silva", "de dos",
  ]);
});

test("nome: mensagens explicam como corrigir", () => {
  assert.match(validarNome("Maria"), /nome e sobrenome/);
  assert.match(validarNome("aa"), /não parece um nome/);
  assert.match(validarNome("Maaaria Silva"), /3 vezes/);
  assert.match(validarNome("Maria S"), /pelo menos 2 letras/);
  assert.match(validarNome("Maria 2"), /só letras/);
});

/* E-MAIL */
test("e-mail: aceita endereços reais", () => {
  aceita(validarEmail, [
    "maria.silva@gmail.com", "joao+site@outlook.com", "a@unicid.edu.br", "ana_clara@empresa.com.br",
    "Maria.Silva@Gmail.com", "k@gmail.com",
  ]);
});

test("e-mail: formato rígido", () => {
  recusa(validarEmail, [
    "maria", "maria@", "@gmail.com", "maria@gmail", "maria@gmail.c", "maria@@gmail.com",
    ".maria@gmail.com", "maria.@gmail.com", "ma..ria@gmail.com", "maria@-gmail.com",
    "maria silva@gmail.com", "maria@gmail.123", `${"a".repeat(65)}@gmail.com`,
  ]);
  aceita(validarEmail, [`${"a".repeat(63)}b@gmail.com`]);
  assert.match(validarEmail(`${"a".repeat(65)}@gmail.com`), /64 caracteres/);
  assert.match(validarEmail("ma..ria@gmail.com"), /dois pontos/);
});

test("e-mail: recusa o exemplo da issue, domínios de exemplo e temporários", () => {
  recusa(validarEmail, [
    "kk@email.com", "maria@email.com", "maria@exemplo.com", "maria@exemplo.com.br", "maria@example.org",
    "maria@mailinator.com", "maria@yopmail.com", "maria@10minutemail.com", "maria@temp-mail.org",
    "maria@maildrop.cc", "maria@EXAMPLE.COM",
  ]);
  assert.match(validarEmail("maria@email.com"), /exemplo ou temporários/);
});

test("e-mail: recusa parte local repetida ou palavra de teste", () => {
  recusa(validarEmail, [
    "kk@gmail.com", "aaa@gmail.com", "teste@gmail.com", "Teste123@gmail.com", "test@outlook.com",
    "asdf@gmail.com", "qwerty@gmail.com", "abc@gmail.com", "xxx@gmail.com",
  ]);
  aceita(validarEmail, ["testemunha@gmail.com", "abcdario@gmail.com"]);
});

test("e-mail: sugere a correção de erros de digitação", () => {
  assert.equal(validarEmail("nome@gmial.com"), "Você quis dizer nome@gmail.com?");
  assert.equal(validarEmail("maria@gmail.con"), "Você quis dizer maria@gmail.com?");
  assert.equal(validarEmail("maria@HOTMIAL.com"), "Você quis dizer maria@hotmail.com?");
  assert.equal(validarEmail("maria@outlok.com"), "Você quis dizer maria@outlook.com?");
  assert.equal(validarEmail("maria@yahoo.con"), "Você quis dizer maria@yahoo.com?");
  assert.equal(sugerirDominio("gmai.com"), "gmail.com");
  assert.equal(sugerirDominio("gmail.com"), null);
});

test("e-mail: separarEmail devolve o domínio em minúsculas", () => {
  assert.deepEqual(separarEmail(" Maria@Gmail.COM "), { local: "Maria", dominio: "gmail.com" });
  assert.equal(separarEmail("maria"), null);
});

/* TELEFONE */
test("telefone: aceita celular e fixo, com ou sem +55 e formatação", () => {
  aceita(validarTelefone, [
    "(11) 91234-5678", "11912345678", "11 91234 5678", "+55 11 91234-5678", "+5511912345678",
    "(21) 3123-4567", "2131234567", "(61) 2108-3000", "(55) 99876-1234",
  ]);
});

test("telefone: recusa o exemplo da issue e números inválidos", () => {
  recusa(validarTelefone, [
    "11111111", "(11) 1234-5678", "(20) 91234-5678", "(10) 3123-4567", "(11) 81234-5678",
    "(11) 6123-4567", "(11) 99999-9999", "(11) 91111-1111", "(11) 2222-2222", "(11) 2345-6789",
    "(11) 98765-4321", "(11) 91234-567a", "123",
  ]);
  assert.match(validarTelefone("(20) 91234-5678"), /DDD 20/);
  assert.match(validarTelefone("(11) 81234-5678"), /começa com 9/);
  assert.match(validarTelefone("(11) 6123-4567"), /2, 3, 4 ou 5/);
  assert.match(validarTelefone("(11) 99999-9999"), /parece de teste/);
});

test("telefone: formata ao sair do campo e mantém o que for inválido", () => {
  assert.equal(formatarTelefone("11912345678"), "(11) 91234-5678");
  assert.equal(formatarTelefone("+55 11 91234 5678"), "(11) 91234-5678");
  assert.equal(formatarTelefone("2131234567"), "(21) 3123-4567");
  assert.equal(formatarTelefone("11111111"), "11111111");
  assert.equal(formatarTelefone(""), "");
});

/* MENSAGEM */
test("mensagem: recusa caractere repetido ou texto sem letras", () => {
  recusa(validarMensagem, ["aaaaaaaaaaaa", "a a a a a a", "kkkkkkkkkk", "1234567890", "!!!!!!!!!!", "...... ???"]);
  aceita(validarMensagem, ["Gostei muito do site!", "Quero ajudar no Setembro Verde 2026."]);
});
