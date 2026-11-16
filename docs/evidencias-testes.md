# Evidências de Testes – EcoVerde

Registro dos testes exigidos no escopo. A seção **“Testes automatizados já executados”** traz os resultados obtidos em 19/10/2026 durante o desenvolvimento. As tabelas de testes manuais devem ser preenchidas pela equipe, com capturas de tela salvas em `docs/evidencias/` (criar a pasta quando houver capturas).

**Legenda de status:** ✅ Aprovado · ⚠️ Aprovado com ressalvas · ❌ Reprovado · ⏳ Pendente

---

## Testes automatizados já executados (19/10/2026)

| Teste | Ferramenta | Escopo | Resultado |
|---|---|---|---|
| Validação HTML | Nu Html Checker (vnu.jar – mesmo motor do W3C Validator), executado localmente | 10 páginas | ✅ 0 erros, 0 avisos |
| Validação CSS | Nu Html Checker (`--also-check-css`) | `css/style.css` | ✅ 0 erros |
| Acessibilidade automática | axe-core (regras WCAG 2.0/2.1 A e AA + boas práticas) em Chromium | 10 páginas × 2 larguras (1280 px e 375 px) | ✅ 0 violações |
| Hierarquia de títulos | Script próprio | 10 páginas | ✅ um `h1` por página, sem saltos de nível |
| Rolagem horizontal | Script próprio | 10 páginas × 2 larguras | ✅ nenhuma |
| Links e âncoras internos | Script próprio (status HTTP e existência dos `id`) | Todos os links, imagens, mídias e scripts | ✅ nenhum quebrado |
| Erros de JavaScript | Console do navegador | 10 páginas | ✅ nenhum |
| Texto ampliado | Largura de 640 px (equivalente a zoom de 200%) + tamanho de texto máximo do portal | Início, Itaipu, Contato, Orçamento | ✅ sem rolagem horizontal |

> Observação: em uma execução do axe na página inicial, dois itens do carrossel foram apontados com baixo contraste porque a medição ocorreu durante a animação de entrada (fade de 320 ms). Repetindo após o fim da animação, não houve violação.

### Testes funcionais automatizados (Playwright)

| Cenário | Resultado esperado | Resultado |
|---|---|---|
| 1º `Tab` em qualquer página | Foco no link “Pular para o conteúdo principal” | ✅ |
| `Enter` no skip link | Foco vai para `#main-content` | ✅ |
| Botão “Menu” (375 px) | Menu abre e `aria-expanded="true"` | ✅ |
| `Esc` dentro do menu | Menu fecha e foco volta ao botão | ✅ |
| Carrossel – botão “Próximo” e seta → | Avança para o destaque seguinte | ✅ |
| Doação enviada vazia | Envio bloqueado; mensagens de erro em texto em 5 campos; foco no 1º campo inválido | ✅ |
| “Outro valor” selecionado | Campo de valor aparece e passa a ser obrigatório | ✅ |
| Valor abaixo de R$ 5 / telefone inválido | Mensagens “O valor mínimo é 5.” e formato de telefone | ✅ |
| Doação preenchida corretamente | Mensagem de confirmação anunciada (`role="status"`); nenhum dado enviado | ✅ |
| Botão “Alto contraste” | Modo ativado e mantido após recarregar a página | ✅ |

---

## 1. Validação W3C (manual, no site oficial)

Validar em https://validator.w3.org/ (página por upload ou URL).

| Página | Data | Erros | Avisos | Status | Evidência |
|---|---|---|---|---|---|
| index.html | 08/11/2026 | 0 | 0 | ✅ | [Print na issue #11](https://github.com/KhevynEtec/U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE/issues/11#issuecomment-6724802745) |
| sobre.html | 08/11/2026 | 0 | 0 | ✅ | [Print na issue #12](https://github.com/KhevynEtec/U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE/issues/12#issuecomment-6725371709) |
| itaipu.html | 08/11/2026 | 0 | 0 | ✅ | [Print na issue #13](https://github.com/KhevynEtec/U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE/issues/13#issuecomment-6725715471) |
| doacao.html | 08/11/2026 | 0 | 0 | ✅ | [Print na issue #18](https://github.com/KhevynEtec/U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE/issues/18#issuecomment-6724963856) |
| acessibilidade.html | 08/11/2026 | 0 | 0 | ✅ | [Print na issue #14](https://github.com/KhevynEtec/U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE/issues/14#issuecomment-6724806168) |
| galeria.html | 08/11/2026 | 0 | 0 | ✅ | [Print na issue #16](https://github.com/KhevynEtec/U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE/issues/16#issuecomment-6725602464) |
| midia.html | 08/11/2026 | 0 | 0 | ✅ | [Print na issue #17](https://github.com/KhevynEtec/U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE/issues/17#issuecomment-6724945334) |
| noticias.html | 08/11/2026 | 0 | 0 | ✅ | [Print na issue #15](https://github.com/KhevynEtec/U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE/issues/15#issuecomment-6725544542) |
| contato.html | 08/11/2026 | 0 | 0 | ✅ | [Print na issue #19](https://github.com/KhevynEtec/U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE/issues/19#issuecomment-6724865911) |
| orcamento_hospedagem.html | 08/11/2026 | 0 | 0 | ✅ | [Print na issue #20](https://github.com/KhevynEtec/U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE/issues/20#issuecomment-6724901276) |
| css/style.css (W3C CSS Validator) | 08/11/2026 | 0 (1 erro corrigido no [PR #22](https://github.com/KhevynEtec/U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE/pull/22)) | Alertas informativos | ✅ | Alertas: variáveis CSS, prefixo `-webkit-`, `clip` do texto para leitor de tela e cores iguais de fundo e borda nos botões |

### 1.1 Nova validação manual (14/11/2026)

Depois dos PRs da entrega final, as 10 páginas foram validadas de novo **manualmente no validator.w3.org, pela URL do Railway**, por Khevyn Lopes dos Santos em 14/11/2026: **as 10 páginas com 0 erros**.

As validações automáticas feitas durante os PRs usaram o **validator.nu**, que é o mesmo mecanismo (Nu Html Checker), porque o validator.w3.org bloqueia pedidos automáticos com uma verificação anti-robô.

## 2. Testes de acessibilidade

### 2.1 WAVE (https://wave.webaim.org/ ou extensão do navegador)

| Página | Erros | Alertas de contraste | Alertas | Status | Evidência |
|---|---|---|---|---|---|
| index.html | 0 | 0 | 12 | ✅ | [print](evidencias/wave/index.png) |
| sobre.html | 0 | 0 | 10 | ✅ | [print](evidencias/wave/sobre.png) |
| itaipu.html | 0 | 0 | 9 | ✅ | [print](evidencias/wave/itaipu.png) |
| doacao.html | 0 | 0 | 8 | ✅ | [print](evidencias/wave/doacao.png) |
| acessibilidade.html | 0 | 0 | 8 | ✅ | [print](evidencias/wave/acessibilidade.png) |
| galeria.html | 0 | 0 | 19 | ✅ | [print](evidencias/wave/galeria.png) |
| midia.html | 0 | 0 | 12 | ✅ | [print](evidencias/wave/midia.png) |
| noticias.html | 0 | 0 | 9 | ✅ | [print](evidencias/wave/noticias.png) |
| contato.html | 0 | 0 | 7 | ✅ | [print](evidencias/wave/contato.png) |
| orcamento_hospedagem.html | 0 | 0 | 8 | ✅ | [print](evidencias/wave/orcamento_hospedagem.png) |

Teste feito em 08/11/2026 no site publicado no Railway. As 10 páginas ficaram com **0 erros e 0 erros de contraste**. A nota AIM ficou em 9,8 de 10, e em 9,6 na galeria.

Os alertas não são erros. São pontos que o WAVE pede para uma pessoa conferir:

- **Accesskey (5 por página):** são os atalhos 1 a 5, do padrão eMAG. Foram colocados de propósito e estão explicados na página de acessibilidade.
- **Long alternative text:** são textos alternativos longos, escritos para descrever bem as imagens. Por isso a galeria tem mais alertas (11).
- **Redundant link:** a logo e o item "Início" do menu levam para a mesma página.
- **Possible heading:** um texto em destaque que o WAVE acha que poderia ser um título.
- **Audio/Video (mídia):** é um lembrete para conferir se há legenda e transcrição. A página de mídia tem as duas.

### 2.2 Checklist manual

| Item | Como testar | Status | Observações |
|---|---|---|---|
| Navegação somente por teclado | Percorrer cada página só com `Tab`, `Shift+Tab`, `Enter`, `Espaço`, setas | ✅ | |
| Foco visível | Conferir o contorno amarelo em todos os elementos | ✅ | |
| Ordem lógica de tabulação | A ordem do foco segue a ordem visual | ✅ | |
| Teclas de atalho 1–4 | Testar no Chrome/Edge (`Alt`), Firefox (`Alt+Shift`), macOS (`Ctrl+Option`) | ✅ | |
| Leitor de tela (NVDA/VoiceOver) | Ler títulos, regiões, imagens, formulários e carrossel | ✅ | Testado com NVDA por Alexandre Almeida de Jesus Nogueira em 14/11/2026 (navegador não informado): as páginas do site foram lidas pelo NVDA sem problemas encontrados. |
| Textos alternativos | Conferir se cada `alt` descreve a imagem | ✅ | Presença de `alt` confirmada pelo WAVE (08/11) e pelo axe; qualidade das descrições: não informado. |
| Labels dos formulários | Cada campo anuncia seu rótulo e instruções | ✅ | |
| Mensagens de erro | Erros anunciados e explicam como corrigir | ✅ | Testes do [PR #39](https://github.com/KhevynEtec/U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE/pull/39) (mensagem junto ao campo, explicando como corrigir) e teste com NVDA de 14/11/2026. |
| Headings | Lista de títulos do leitor de tela faz sentido | ✅ | |
| Links e botões | Textos de link compreensíveis fora de contexto | ✅ | |
| ARIA | `aria-current`, `aria-expanded`, `aria-pressed` atualizam corretamente | ✅ | |
| Contraste | Conferir com WAVE ou Colour Contrast Analyser | ✅ | |
| Alto contraste e tamanho de texto | Ativar os controles da barra superior | ✅ | |
| `lang="pt-BR"` | Leitor de tela pronuncia em português | ✅ | |
| Movimento reduzido | Ativar “reduzir movimento” no sistema e conferir que não há animações | ⏳ | Não testado: não há teste registrado com a opção do sistema ligada. O CSS desliga as animações em `prefers-reduced-motion`. |

## 3. Testes de responsividade

Testes de 16/11/2026 no Google Chrome em modo sem janela, com emulação de largura e 900 px de altura, sobre o código da main (commit 0333bad, o mesmo publicado) rodando com npm start. Os resultados dos PRs da entrega final, no Microsoft Edge, continuam citados. Não foram usados aparelhos físicos. As 6 fotos das notícias vêm dos sites das reportagens e não entraram neste teste. Elas foram conferidas no site publicado em 14/11/2026.

| Largura | Navegador | Menu | Layout | Imagens | Tabelas | Status |
|---|---|---|---|---|---|---|
| 375 px (celular) | Google Chrome sem janela, emulação (16/11/2026); Microsoft Edge, emulação (PRs) | ✅ botão "Menu" abre com Enter, mostra os 10 links, Esc fecha e devolve o foco (PR #40 e 16/11) | ✅ sem rolagem horizontal nas 10 páginas, também com fonte 3 + espaçamento (PR #42 e 16/11) | ✅ 30 imagens locais carregam, sem distorção e dentro da tela (16/11) | ✅ as 4 tabelas rolam dentro da própria caixa, focável pelo teclado (PR #42 e 16/11) | ✅ |
| 600 px | Google Chrome sem janela, emulação (16/11/2026); Microsoft Edge, emulação (PR #43) | ✅ botão "Menu", mesmo teste (16/11) | ✅ sem rolagem horizontal; controles do painel e dos formulários sem cobertura (PR #43 e 16/11) | ✅ mesmo resultado (16/11) | ✅ as 4 tabelas rolam dentro da própria caixa (16/11) | ✅ |
| 800 px | Google Chrome sem janela, emulação (16/11/2026); Microsoft Edge, emulação (PRs #43 e #45) | ✅ botão "Menu", mesmo teste (16/11) | ✅ sem rolagem horizontal; controles sem cobertura (PRs #43, #45 e 16/11) | ✅ mesmo resultado (16/11) | ✅ a do Orçamento rola na caixa; as outras cabem (16/11) | ✅ |
| 1024 px | Google Chrome sem janela, emulação (16/11/2026); Microsoft Edge, emulação (PR #43) | ✅ botão "Menu", mesmo teste (16/11) | ✅ sem rolagem horizontal; controles sem cobertura (PR #43 e 16/11) | ✅ mesmo resultado (16/11) | ✅ as 4 cabem na tela (16/11) | ✅ |
| 1280 px | Google Chrome sem janela, emulação (16/11/2026); Microsoft Edge, emulação (PRs #43, #45 e #46) | ✅ menu fixo na barra, 10 links visíveis (16/11) | ✅ sem rolagem horizontal; índice lateral (PR #46 e 16/11) | ✅ mesmo resultado (16/11) | ✅ as 4 cabem na tela (16/11) | ✅ |
| 1440 px | Google Chrome sem janela, emulação (16/11/2026); Microsoft Edge, emulação (PR #46) | ✅ menu fixo na barra, 10 links visíveis (16/11) | ✅ sem rolagem horizontal; índice com fonte 3 + espaçamento (PR #46 e 16/11) | ✅ mesmo resultado (16/11) | ✅ as 4 cabem na tela (16/11) | ✅ |
| Texto ampliado (fonte 3 + espaçamento) | Chromium (19/10); Microsoft Edge (PR #42); Google Chrome sem janela (16/11/2026) | ✅ nas 6 larguras, mesmo teste do menu (16/11) | ✅ sem rolagem horizontal nas 10 páginas, nas 6 larguras (16/11) | ✅ mesmo resultado (16/11) | ✅ as que não cabem rolam dentro da caixa, nas 6 larguras (16/11) | ✅ |

## 4. Testes dos formulários

| Formulário | Cenário | Esperado | Status |
|---|---|---|---|
| Doação | Enviar vazio | Bloqueia e mostra erros | ✅ |
| Doação | E-mail sem “@” | Erro de e-mail | ✅ |
| Doação | “Outro valor” sem valor | Erro no campo de valor | ✅ |
| Doação | Tudo válido | Mensagem de confirmação | ✅ |
| Contato | Enviar vazio | Bloqueia e mostra erros | ✅ |
| Contato | Telefone sem DDD | Erro de formato | ✅ |
| Contato | Mensagem com menos de 10 caracteres | Erro de tamanho | ✅ |
| Contato | Tudo válido | Mensagem de confirmação | ✅ |
| Ambos | Botão “Limpar formulário” | Campos e erros limpos | ✅ |

## 5. Testes multimídia

| Recurso | Cenário | Esperado | Status |
|---|---|---|---|
| Vídeo | Reproduzir/pausar pelo teclado | Controles funcionam | ✅ |
| Vídeo | Pôster exibido antes do play | Imagem WebP aparece | ✅ |
| Vídeo | Legendas (servidor local) | Legendas em português sincronizadas | ✅ |
| Vídeo | Transcrição | Abre e fecha pelo teclado | ✅ |
| Áudio | Reproduzir/pausar pelo teclado | Controles funcionam | ✅ |
| Áudio | Transcrição | Abre e fecha pelo teclado | ✅ |
| iframe | Mapa carrega | Mapa do OpenStreetMap exibido | ✅ |
| iframe | Leitor de tela | Anuncia o `title` do iframe | ⏳ Não testado com leitor de tela; o `title` está no código e passou no W3C. |
| Geral | Sem reprodução automática | Nada toca sozinho | ✅ |

## 6. Servidor e EcoBot (07/11/2026)

### 6.1 Testes automatizados já executados

| Teste | Ferramenta | Resultado |
|---|---|---|
| FAQ (9 perguntas típicas), prioridade do FAQ sobre a IA, resposta da IA, falha e recusa da IA, normalização, links válidos | `npm test` (node:test, com cliente de IA falso) | ✅ 16 de 16 aprovados |
| Servidor sem `IA_API_KEY` | `curl` | ✅ responde só pelo FAQ; `/api/saude` mostra `"ia": false` |
| Servidor com chave inválida | `curl` | ✅ API recusa a chave, erro registrado no log e resposta padrão do FAQ (site não quebra) |
| Limite de 15 perguntas por minuto | `curl` (17 pedidos seguidos) | ✅ status 429 com mensagem em português |
| As 10 páginas servidas pelo Express | `curl` em `localhost` | ✅ todas com status 200 |
| `POST /api/assistente` com pergunta válida | `curl` | ✅ resposta JSON com texto, link e sugestões |
| Pergunta vazia ou JSON inválido | `curl` | ✅ status 400 com mensagem de erro |
| Arquivos do servidor não expostos (`/server.js`, `/.env`) | `curl` | ✅ status 404 |
| Botão do EcoBot visível no desktop (1280 px) | Captura com Edge headless | ✅ |

### 6.1.1 Testes na URL pública (Railway, 07/11/2026)

URL: https://u-unicid-cc-frontend-2260022-n7-2-2026-nt-ecover-production.up.railway.app

| Teste | Ferramenta | Resultado |
|---|---|---|
| `/api/saude` | `curl` | ✅ `{"status":"ok","ia":true}` (chave da IA configurada nas Variables do Railway) |
| As 10 páginas e a raiz `/` | `curl` | ✅ todas com status 200 |
| CSS, JS, `ecobot.js`, vídeo MP4 e legendas VTT | `curl` | ✅ status 200 |
| `/server.js` e `/.env` não expostos | `curl` | ✅ status 404 |
| Pergunta do FAQ ("O que é a Usina de Itaipu?") | `curl` | ✅ `fonte: faq`, resposta e link para itaipu.html |
| Pergunta fora do FAQ ("Por que o vidro demora para se decompor?") | `curl` | ✅ `fonte: ia`, resposta curta em português, coerente com o site e com orientação de coleta seletiva |

### 6.2 Testes manuais (preencher)

| Cenário | Resultado esperado | Status |
|---|---|---|
| `Alt+5` até o botão EcoBot e `Enter` | Painel abre, foco vai para o campo de pergunta, `aria-expanded="true"` | ✅ |
| Enviar pergunta com `Enter` | Resposta aparece e é anunciada pelo leitor de tela | ⏳ A resposta aparece; o anúncio pelo leitor de tela não foi testado. |
| `Esc` com o painel aberto | Painel fecha e o foco volta ao botão EcoBot | ✅ |
| Botões de sugestão | Enviam a pergunta correspondente | ✅ |
| Pergunta fora do FAQ, com `IA_API_KEY` válida | Resposta da IA com o aviso "Resposta gerada por IA" | ✅ |
| Modo alto contraste ativo | Widget em preto e branco, links em amarelo | ✅ |
| Celular (375 px) | Painel cabe na tela sem rolagem horizontal | ✅ |
| URL pública no Railway | Site e EcoBot funcionando | ✅ (testes automatizados em 6.1.1; conferir também no navegador) |

## 7. Evidências da Aula 06

| Evidência | Onde ver | Resultado | Status |
|---|---|---|---|
| Regras carregadas no Cursor | Cursor → *Customize → Rules* | 8 regras do projeto reconhecidas (as 7 de `.cursor/rules/` + `AGENTS.md`). [print](evidencias/cursor-rules.png) | ✅ 07/11/2026 |
| Servidores MCP configurados | Cursor → *Customize → MCPs* | `github`, `railway` e `figma` reconhecidos a partir do `.cursor/mcp.json`. Aparecem como *Disabled*: o Cursor só ativa MCP de projeto depois de aprovação e configuração dos tokens. [print](evidencias/cursor-mcp.png) | ✅ 07/11/2026 |
| Pull requests feitos com agente | [Aba Pull requests do GitHub](https://github.com/KhevynEtec/U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE/pulls?q=is%3Apr+is%3Aclosed) | PRs #2 a #7: plano de contexto, regras, MCP, servidor e EcoBot, diário e link do deploy | ✅ 07/11/2026 |
| Deploy concluído | [Site publicado](https://u-unicid-cc-frontend-2260022-n7-2-2026-nt-ecover-production.up.railway.app) | Site e EcoBot no ar no Railway (testes na seção 6.1.1) | ✅ 07/11/2026 |

## 8. Entrega final (14/11/2026)

Resultados registrados nas descrições dos pull requests da entrega final. Salvo indicação, os testes no navegador foram feitos no **Microsoft Edge em modo sem janela**, com o servidor local (`npm start`).

### 8.1 Formulários – [PR #39](https://github.com/KhevynEtec/U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE/pull/39) (issue #32)

| Teste | Resultado | Status |
|---|---|---|
| Casos do professor: nome “aa”, e-mail `kk@email.com`, telefone `11111111` | Recusados, com a mensagem junto ao campo explicando como corrigir. Também conferidos no site publicado em 14/11/2026 | ✅ |
| Casos válidos (ex.: “Maria da Silva”, `maria.silva@gmail.com`, `11987651234`) | Aceitos; o telefone é formatado como `(11) 98765-1234` ao sair do campo | ✅ |
| Rota `GET /api/verificar-email` | `gmail.com` e `unicid.edu.br` → `existe`; domínio inventado → `inexistente`; formato inválido → erro 400 | ✅ |
| Envio com domínio inexistente | Sem confirmação; foco no campo de e-mail com “Não encontramos o domínio…” | ✅ |
| E-mail trocado durante a verificação | A resposta antiga é ignorada | ✅ |
| `npm test` | 43 testes aprovados no estado final do projeto (41 ao fim do PR #39) | ✅ |
| W3C (`contato.html` e `doacao.html`) | 0 erros | ✅ |

### 8.2 Pulo do menu no celular – [PR #40](https://github.com/KhevynEtec/U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE/pull/40) (issue #33)

| Teste | Antes | Depois | Status |
|---|---|---|---|
| Lighthouse 12.6.1 mobile na `index.html` (servidor local, mediana de 3 rodadas): CLS | 0,521 | 0 | ✅ |
| Lighthouse 12.6.1 mobile na `index.html`: desempenho | 78 | 100 | ✅ |
| Menu a 375 px: abre, fecha e `Esc` devolve o foco ao botão | — | Funciona | ✅ |
| Sem JavaScript: menu sempre visível | — | Funciona | ✅ |
| W3C, 10 páginas | — | 0 erros | ✅ |

### 8.3 VLibras – [PR #41](https://github.com/KhevynEtec/U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE/pull/41) (issue #34) e [PR #43](https://github.com/KhevynEtec/U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE/pull/43) (posição)

| Teste | Resultado | Status |
|---|---|---|
| Widget nas 10 páginas | Aparece em todas, sem erro de JavaScript | ✅ |
| Script do VLibras chegando 4 s depois do `load` da página | O botão aparece, com um único evento `load` (nenhum `load` falso) | ✅ |
| Clique num parágrafo com o tradutor aberto | O texto vai para o serviço de tradução do VLibras e o avatar sinaliza | ✅ |
| Sem acesso ao VLibras | Sem botão; site e EcoBot funcionando | ✅ |
| Posição | Canto inferior esquerdo, na altura do EcoBot (PR #43) | ✅ |
| Sobreposição com o EcoBot a 375, 600, 800, 1024 e 1280 px | Nenhuma, com o EcoBot fechado; com o painel do EcoBot aberto cobrindo o canto, o botão do VLibras some e volta ao fechar | ✅ |
| Controles do painel e dos formulários cobertos (`elementFromPoint`) nas 5 larguras | Nenhum | ✅ |
| Foco no botão do VLibras quando ele some | Vai para o botão “Libras” da barra | ✅ |
| Janela do avatar com o EcoBot aberto | Continua visível e por cima de tudo | ✅ |
| Alto contraste + fonte 3 | Botão e avatar sem deformar | ✅ |

### 8.4 Painel “Mais opções” – [PR #42](https://github.com/KhevynEtec/U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE/pull/42) (issue #35)

| Teste | Resultado | Status |
|---|---|---|
| axe-core, 10 páginas × 4 modos de cor | 0 violações, com o painel e o EcoBot abertos e os formulários com erros | ✅ |
| axe-core com espaçamento + links destacados + fonte 3 | 0 violações nos 4 modos | ✅ |
| Lighthouse (`index.html` e `contato.html`), Padrão e Modo escuro | Acessibilidade 100, desempenho 100 e CLS 0 | ✅ |
| Roteiro completo de teclado (abrir, cada opção, `Esc`, Restaurar) | 29 verificações aprovadas, foco visível em todas as paradas, sem armadilha | ✅ |
| Foco escondido atrás do EcoBot ou do VLibras (Tab pelo painel e pelos formulários) | 0 paradas escondidas a 375 px (antes: 20 de 68), também com fonte 3, com o EcoBot aberto e a 1280 px | ✅ |
| Leitura em voz alta | Conferida de ouvido por Khevyn Lopes dos Santos em 14/11/2026, no Microsoft Edge: texto selecionado, páginas inteiras, Pausar, Continuar, Parar e velocidade | ✅ |
| EcoBot e VLibras fixos ao rolar, nos 4 modos | Sim (a escala de cinza fica no `<html>`) | ✅ |
| Preferências ao trocar de página e ao recarregar | Mantidas | ✅ |
| 375 px com fonte 3 + espaçamento + painel aberto | Sem rolagem horizontal nas 10 páginas | ✅ |

**Contraste do Modo escuro medido pelo axe** (1.617 elementos nas 10 páginas):

| Contraste | Cores | Elementos |
|---|---|---|
| 4,72:1 | `#F1F8E9` sobre `#2E7D32` | `.lead` do cabeçalho das páginas internas (igual ao modo padrão) |
| 4,81:1 | `#FFFFFF` sobre `#8D6E00` | rótulo do `.placeholder` |
| 5,13:1 | `#FFFFFF` sobre `#2E7D32` | botões verdes, botão do EcoBot, títulos dos cabeçalhos, trilha, cabeçalho das tabelas |
| 5,86:1 | `#F1F8E9` sobre `#256D2A` | `.lead` do hero |
| 6,36:1 | `#FFFFFF` sobre `#256D2A` | links do menu, sobretítulo do hero |
| 6,36:1 | `#256D2A` sobre `#FFFFFF` | botão claro nas faixas verdes |
| 6,43:1 | `#212121` sobre `#7CB342` | botão Setembro Verde |
| 7,13:1 | `#81C784` sobre `#2A2A2A` | tags, “Transcrição”, links dentro de avisos, mensagens de sucesso |
| 7,30:1 | `#FF8A80` sobre `#1E1E1E` | mensagens de erro |
| 8,28:1 | `#81C784` sobre `#1E1E1E` | “EcoVerde” do logo, item atual do menu, sobretítulos, `.link-seta`, botões do carrossel, sugestões do EcoBot, datas |
| 8,87:1 | `#BDBDBD` sobre `#1E1E1E` | slogan, ajuda, créditos, legendas, aviso do EcoBot |
| 9,31:1 | `#81C784` sobre `#121212` | links do conteúdo, sobretítulos |
| 9,97:1 | `#BDBDBD` sobre `#121212` | `.lead`, `figcaption`, `.fontes` |
| 11,50:1 | `#E6E6E6` sobre `#2A2A2A` | campos, mensagens do EcoBot, `.aviso`, `.destaque`, `.dado`, `.placeholder` |
| 13,36:1 | `#E6E6E6` sobre `#1E1E1E` | cards, carrossel, títulos de seção |
| 13,39:1 | `#E8F5E9` sobre `#1B2A1C` | textos do rodapé |
| 15,01:1 | `#E6E6E6` sobre `#121212` | texto corrido e títulos |
| 15,06:1 | `#FFFFFF` sobre `#1B2A1C` | links do rodapé |
| 16,10:1 | `#FFFFFF` sobre `#212121` | barra de acessibilidade e painel |

### 8.5 ODS – [PR #45](https://github.com/KhevynEtec/U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE/pull/45) (issue #36)

| Teste | Resultado | Status |
|---|---|---|
| Nomes e objetivos dos ODS 7, 10, 12 e 13 | Conferidos na ONU Brasil (brasil.un.org/pt-br/sdgs) em 14/11/2026 | ✅ |
| Meta 10.2 | Está na página oficial do ODS 10 e cita “deficiência”; incluída no card do ODS 10 | ✅ |
| FAQ: perguntas sobre os ODS | 4 perguntas vão para a resposta nova, com o link para `sobre.html#ods` | ✅ |
| FAQ: perguntas que já existiam | 21 perguntas continuam indo para as mesmas respostas; a chave “onu” foi retirada porque roubaria “O que a ONU fala sobre reciclagem?” | ✅ |
| axe, 4 páginas alteradas × 4 modos | 0 violações, também com a leitura facilitada | ✅ |
| Lighthouse (`sobre.html` e `index.html`), Padrão e Modo escuro | Acessibilidade 100 | ✅ |
| 375 px | Sem rolagem horizontal; nenhum link coberto pelo EcoBot ou pelo VLibras | ✅ |

### 8.6 Índice lateral – [PR #46](https://github.com/KhevynEtec/U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE/pull/46) (issue #44)

| Teste | Resultado | Status |
|---|---|---|
| Links do índice com Tab, fonte 3 + espaçamento, a 1100, 1280 e 1440 px | Itaipu (8 links) e Notícias (6 links): todos dentro da tela e da área visível do índice | ✅ |
| Sem preferências (1280 px) | O índice cabe e não aparece barra de rolagem | ✅ |
| `contato.html` e `orcamento_hospedagem.html` | Sem mudança (o índice delas não fica fixo) | ✅ |
| Roda do mouse sobre o índice | O índice rola primeiro; a página só depois do fim do índice | ✅ |
| axe, 4 páginas com índice × 4 modos | 0 violações, com e sem fonte 3 + espaçamento | ✅ |

**Contraste da barra de rolagem do índice** (puxador sobre trilho; mínimo exigido para interface: 3:1):

| Modo | Cores | Contraste |
|---|---|---|
| Padrão e Escala de cinza | `#424242` sobre `#E0E0E0` | 7,6:1 |
| Modo escuro | `#8A8A8A` sobre `#2A2A2A` | 4,2:1 |
| Alto contraste | `#FFEB3B` sobre `#000000` | 17,2:1 |

### 8.7 Documentação – [PR #47](https://github.com/KhevynEtec/U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE/pull/47) (issue #37)

| Teste | Resultado | Status |
|---|---|---|
| W3C, `acessibilidade.html` | 0 erros, 0 avisos | ✅ |
| axe, `acessibilidade.html` × 4 modos | 0 violações, também com a leitura facilitada | ✅ |
| Lighthouse, `acessibilidade.html`, Padrão e Modo escuro | Acessibilidade 100 | ✅ |
| Links internos dos dois README e da página | 61 links apontam para arquivos e âncoras que existem | ✅ |

### 8.8 Lighthouse no site publicado (14/11/2026)

Lighthouse 12.6.1, modo mobile, executado com `npx` (sem adicionar ao `package.json`), na URL do Railway, 3 rodadas por página. Os valores são a mediana; o desempenho mostra também as 3 rodadas.

| Página | Acessibilidade | Desempenho (3 rodadas) | Boas práticas | SEO | CLS |
|---|---|---|---|---|---|
| index.html | 100 | 98 (98 / 99 / 97) | 96 | 100 | 0 |
| sobre.html | 100 | 100 (100 / 100 / 100) | 96 | 100 | 0 |
| itaipu.html | 100 | 99 (100 / 99 / 99) | 96 | 100 | 0 |
| doacao.html | 100 | 100 (100 / 100 / 100) | 96 | 100 | 0 |
| acessibilidade.html | 100 | 100 (100 / 100 / 100) | 96 | 100 | 0 |
| galeria.html | 100 | 99 (99 / 99 / 100) | 96 | 100 | 0 |
| midia.html | 100 | 98 (98 / 90 / 98) | 96 | 100 | 0 |
| noticias.html | 100 | 100 (100 / 100 / 100) | 96 | 100 | 0 |
| contato.html | 100 | 99 (99 / 99 / 99) | 96 | 100 | 0 |
| orcamento_hospedagem.html | 100 | 100 (100 / 99 / 100) | 96 | 100 | 0 |

**Boas práticas 96:** em todas as páginas, o único item é `image-aspect-ratio`. A imagem é do próprio VLibras (`vlibras-popup.webp`, 450 × 120 px, exibida em 40 × 40 px dentro do botão do widget), e não do código do EcoVerde.

### 8.9 Fotos do Pixabay nas páginas (15/11/2026)

Troca das ilustrações por 7 fotos do Pixabay nas páginas Início, Sobre, Itaipu e Setembro Verde (branch `feat/fotos-pixabay`). Lighthouse 12.6.1, modo mobile, **servidor local**, 3 rodadas por página (mediana). O site publicado será medido depois do merge.

| Página | Acessibilidade | Desempenho (3 rodadas) | CLS |
|---|---|---|---|
| index.html | 100 | 95 (95 / 95 / 95) | 0 |
| sobre.html | 100 | 99 (99 / 99 / 99) | 0 |
| itaipu.html | 100 | 99 (99 / 99 / 99) | 0 |
| doacao.html | 100 | 99 (99 / 99 / 99) | 0 |

Na mesma máquina e no mesmo momento, a `index.html` da `main` (ainda com a ilustração) deu desempenho 96: a diferença de 1 ponto está dentro da variação do Lighthouse. Em ambas, o maior elemento da tela (LCP) é o parágrafo de texto do topo, e não a foto.

| Teste | Resultado | Status |
|---|---|---|
| W3C (`index`, `sobre`, `itaipu` e `doacao`) e `style.css` | 0 erros | ✅ |
| axe, 4 páginas × 4 modos de cor | 0 violações, também com a leitura facilitada | ✅ |
| 375, 800 e 1280 px | Sem rolagem horizontal; nenhum link coberto pelo EcoBot ou pelo VLibras, também com fonte 3 + espaçamento | ✅ |
| Peso das imagens | Originais com cerca de 9 MB; versões do site em WebP com 372 KB no total | ✅ |

## 9. Limitações conhecidas

- **EcoBot sobre o fim do painel “Mais opções”:** a 375 px com a fonte no nível 3 e a página no topo, o botão do EcoBot cobre o seletor “Velocidade”, no pé da tela. Pelo teclado, a página rola e o seletor aparece; com o mouse, é preciso rolar a página.
- **Palavras quebradas sem hífen no índice lateral:** com fonte 3 + espaçamento, palavras longas do índice (Itaipu e Notícias), como “Importância”, são quebradas no meio, porque o navegador não faz hifenização em português aqui. O texto continua legível e os links funcionam.
- **VLibras depende do site do governo:** se o vlibras.gov.br estiver fora do ar, o botão “Libras” não aparece e o restante do site funciona normalmente.
