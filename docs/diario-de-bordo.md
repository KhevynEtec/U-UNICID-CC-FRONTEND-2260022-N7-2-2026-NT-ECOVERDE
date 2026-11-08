# Diário de Bordo – EcoVerde

Registro do desenvolvimento do projeto pela equipe **Promptdão**.
Cada integrante deve registrar suas atividades, decisões e dificuldades.

## Cronograma (conforme escopo)

| Etapa | Atividade | Prazo | Status |
|---|---|---|---|
| 1 | Elaboração do escopo, mapa do site e wireframes | 21/09/2026 | Concluída |
| 2 | Estruturação do HTML5 semântico das 10 páginas | 15/10/2026 | Concluída |
| 3 | Estilização CSS3, responsividade e acessibilidade (cores/contraste) | 30/10/2026 | Concluída |
| 4 | Inserção de multimídia (`video`, `audio`, `iframe`) e formulários | 10/11/2026 | Concluída (mídia demonstrativa) |
| 5 | Validação W3C, testes de acessibilidade, `/docs` e compactação (.zip) | 30/11/2026 | Em andamento |

> Ferramenta de gestão definida no escopo: Trello / Notion.

## Modelo de registro

```
### DD/MM/AAAA – Título da atividade
**Responsável:** nome do integrante
**O que foi feito:**
**Decisões tomadas:**
**Dificuldades e soluções:**
**Próximos passos:**
```

## Registros

### 19/10/2026 – Implementação inicial do portal (com apoio de IA)
**Responsável:** Khevyn lopes dos Santos
**O que foi feito:**
- Criação da estrutura de pastas e das 10 páginas HTML5 interligadas.
- Definição do design system em `css/style.css` (variáveis de cor, tipografia, espaçamento, botões, cards, formulários, tabelas, foco visível, breakpoints de 600, 900 e 1100 px).
- Componentes globais: skip link, barra de acessibilidade com atalhos (eMAG), header com menu responsivo, trilha de navegação e footer.
- Carrossel acessível, formulários com validação HTML5 e mensagens de erro acessíveis.
- Ilustrações SVG originais, vídeo demonstrativo com legendas WebVTT e áudio demonstrativo.
- Documentação inicial em `/docs`.

**Decisões tomadas:**
- `#0288D1` e `#7CB342` não atingem contraste 4,5:1 com texto comum; foram mantidos em superfícies e elementos decorativos, com variantes escuras da mesma família (`#01579B`, `#33691E`) para textos e links.
- Fonte do sistema (Open Sans/Arial) sem download externo, reduzindo requisições.
- Imagens em SVG (ilustrações) e WebP (pôster do vídeo) para baixo consumo de dados.
- Conteúdos factuais não fornecidos no briefing (dados de Itaipu, preços, notícias) marcados como “A complementar”, sem invenção.
- Rotação automática do carrossel desligada por padrão.

**Dificuldades e soluções:**
- Menu com 10 itens: em telas menores que 1100 px passa a ser recolhível por botão com `aria-expanded`.
- Legendas `.vtt` podem ser bloqueadas ao abrir via `file://`: documentado o uso de servidor local no README.

**Próximos passos:**
- Coletar dados oficiais de Itaipu e preencher os espaços “A complementar”.
- Preencher as tabelas de orçamento com fornecedores reais.
- Substituir vídeo, áudio e notícias demonstrativos por conteúdo oficial.
- Testes manuais com leitor de tela e WAVE; registrar em `evidencias-testes.md`.

### 07/11/2026 – Aula 06: plano de contexto, Rules, MCP, EcoBot e preparação do deploy (com agente de IA)
**Responsável:** Khevyn Lopes dos Santos, com o agente Claude Code (Claude Opus 5.5) no VS Code
**O que foi feito:**
- `docs/plano-contexto.md` com as 11 seções do modelo da Aula 06 (inclui ODS 7, 10, 12 e 13).
- 7 regras em `.cursor/rules/` (`projeto-ecoverde`, `html-semantico`, `css-estilo`, `acessibilidade`, `git-commits`, `cursor-rules`, `self-improvement`) e `AGENTS.md`.
- `.cursor/mcp.json` com GitHub, Railway e Figma; tokens só por variável de ambiente. `.gitignore` e `.env.example`.
- Site movido para `public/`; servidor `server.js` (Node.js + Express) com `POST /api/assistente`.
- EcoBot (FAQ + API de IA): widget acessível (`public/js/ecobot.js`); o servidor responde primeiro pelo FAQ local (`lib/faq.js`) e, se o FAQ não souber, pela API de IA Claude (`lib/ia.js`), quando `IA_API_KEY` está definida. 16 testes automatizados (`npm test`), sem gastar créditos.
- Uma branch e um pull request por etapa.

**Prompts usados (resumo):**
1. "A partir de agora teremos que seguir à risca a rubrica do PDF da Aula 06. Dê uma breve explicação detalhada antes de começarmos." → o agente analisou o repositório e propôs um plano em 7 fases, aguardando validação.
2. Decisões da equipe passadas ao agente: mover o site para `public/`; EcoBot funcionando com FAQ mesmo sem chave de API; permitir branches e PRs no GitHub; trabalhar pelo Claude Code em vez do Cursor.
3. "Ele tem que ser FAQ e API de IA" → o agente manteve o FAQ como primeira camada e acrescentou a API de IA como segunda.

**Decisões tomadas:**
- O FAQ só usa informações **já publicadas no site** (regra de não inventar dados) e aponta a página de origem.
- A API de IA recebe o conteúdo do FAQ no prompt de sistema, com a instrução de não inventar números ou fatos; respostas dela aparecem marcadas como "gerada por IA".
- FAQ primeiro: é gratuito, instantâneo e confiável; a IA só cobre o que o FAQ não sabe. Se a API falhar ou recusar, o EcoBot volta para o FAQ.
- Limite de 15 perguntas por minuto por visitante, para proteger os créditos da chave no site público.
- O widget é criado por JavaScript (`ecobot.js`) para não duplicar HTML nas 10 páginas; respostas inseridas com `textContent` (sem risco de injeção de HTML).
- O `styles.css` antigo da raiz (não usado por nenhuma página) foi mantido fora de `public/` até a equipe decidir se pode ser apagado.
- Os arquivos `.cursor/` foram criados fora do Cursor; o Cursor os reconhece ao abrir o projeto.

**Dificuldades e soluções:**
- O Windows bloqueou a renomeação da pasta `assets/`; os arquivos foram movidos um a um com `git mv`, preservando o histórico.
- O README tinha quebras de linha misturadas (CR, LF, CRLF); foram padronizadas antes da edição para o diff mostrar só as mudanças reais.
- O GitHub CLI (`gh`) não estava instalado; as branches foram enviadas por `git push` e os PRs abertos pelo site do GitHub.

**Próximos passos:**
- Revisar e fazer o merge dos PRs (ordem em `docs/deploy-railway.md`).
- Publicar no Railway e colocar o link no README.
- Abrir o projeto no Cursor e registrar prints das Rules e do MCP em `docs/evidencias/`.
- Testar o EcoBot com teclado e leitor de tela e registrar em `evidencias-testes.md`.

### 07/11/2026 – Publicação no Railway, mídia autoral, evidências da Aula 06 e conteúdo pendente
**Responsável:** Khevyn Lopes dos Santos, com o agente Claude Code no VS Code
**O que foi feito:**
- Merge dos pull requests #2 a #7 na `main`, na ordem planejada: plano de contexto, regras, MCP, servidor e EcoBot, diário e link do deploy.
- Chave da API da Anthropic criada no Console (com créditos próprios, separados do plano Pro do Claude) e guardada só no `.env` local e nas *Variables* do Railway. A camada de IA do EcoBot passou a usar o modelo **Claude Haiku 5.5**.
- Site publicado no Railway, com *Serverless* ativado: https://u-unicid-cc-frontend-2260022-n7-2-2026-nt-ecover-production.up.railway.app — páginas, `/api/saude` e EcoBot (FAQ e IA) testados na URL pública.
- Projeto aberto no Cursor: foram reconhecidas as 8 regras do projeto (7 de `.cursor/rules/` + `AGENTS.md`) e os 3 servidores MCP (`github`, `railway`, `figma`). Prints em `docs/evidencias/` e seção 7 de `evidencias-testes.md` atualizada.
- Revisão completa do projeto contra o escopo: estrutura das 10 páginas, 428 links internos sem erro e 0 erros no W3C nas 5 páginas validadas automaticamente.
- Página Mídia (branch `feat/midia-autoral`): retirados o vídeo, o podcast (MP3 de 86 MB) e os embeds do YouTube, que eram de terceiros. Entraram um vídeo vertical autoral de 48 s, com `<video controls poster>`, legendas sincronizadas e transcrição, e o episódio 0 do Podcast EcoVerde (27 s), com `<audio controls>` e transcrição. A pasta de mídia caiu de cerca de 92 MB para 5,8 MB.
- README reescrito: link do site, funcionalidades, EcoBot, como rodar, documentação, declaração de uso de IA e pendências reais.
- Conteúdo pendente: o “A complementar” da página Contato virou o link do repositório no GitHub, o da página Setembro Verde virou um aviso de projeto acadêmico e as tabelas de `orcamento-hospedagem.md` foram preenchidas com os mesmos dados da página de orçamento.

**Prompts usados (resumo):**
1. "Ele tem que ser FAQ e API de IA" → o agente manteve o FAQ como primeira camada e acrescentou a API de IA como segunda.
2. "Usei o Claude Haiku 5.5" → o agente trocou o modelo e removeu o fallback de recusa, que o Haiku não suporta.
3. "Analise o projeto inteiro do zero e veja o que precisa ser feito" → o agente comparou o projeto com o escopo e apontou a falta do `<video>` próprio, o áudio de 86 MB de terceiros e o `docs/README.md` desatualizado.
4. "Pode retirar os vídeos, já que violam diretrizes, e vamos continuar só com os vídeos e áudios autorais nossos" → retirada do material de terceiros e roteiros de 30 a 60 s para o vídeo e o podcast.

**Decisões tomadas:**
- Haiku 5.5 em vez de Opus: respostas curtas de chat não precisam do modelo maior, e o custo por pergunta fica bem menor.
- A chave nunca é colada em chat, print ou arquivo versionado.
- Railway com *Serverless*; o site fica no ar até a nota sair (apresentação em 09/11, com prazo até 16/11).
- Só material autoral no site: roteiros da equipe, com vídeo e narração produzidos com apoio de IA e identificados na página.
- Seguindo a orientação do professor (HTML5, CSS3 e JS sem código complexo), a mídia nova usa só tags HTML e 6 linhas de CSS, sem JavaScript novo.
- Contato sem telefone nem e-mail pessoal (LGPD): o canal oficial é o repositório.
- Prints só onde não há outra prova: Rules e MCP no Cursor. Deploy e PRs são comprovados pelos próprios links.
- As cores escuras de texto citadas no registro de 19/10 (`#01579B`, `#33691E`) foram trocadas depois, em 26/10, por tons de verde (`#256D2A`, `#2E7D32`), que também atingem contraste AA. O registro antigo foi mantido como histórico.

**Dificuldades e soluções:**
- Os primeiros valores informados para a chave eram o ID e a versão mascarada da chave; foi criada uma chave nova e copiada no momento da criação.
- A conta antiga do Railway estava com o teste expirado; o deploy foi refeito e o site publicado.
- No Cursor, a pasta aberta era a de fora (`ecoverde-atualizado`); a pasta certa do repositório foi adicionada em *Repositories*, e as regras e o MCP foram encontrados em *Customize*.
- O vídeo autoral veio em formato vertical (9:16); o CSS passou a limitar a altura para ele caber na tela, e a capa foi gerada a partir de um quadro do próprio vídeo.
- Na análise do vídeo, o navegador em modo automático não decodificava os quadros; a captura foi feita com o vídeo tocando.
- Um registro deste diário foi sobrescrito por engano enquanto o arquivo estava aberto no editor e foi reescrito.

**Próximos passos:**
- PR da `feat/midia-autoral` (antes) e da `docs/conteudo-pendente` (depois), cada um aprovado e com merge feito por outro integrante.
- Testes manuais divididos entre os integrantes (W3C, WAVE, Lighthouse, responsividade, formulários, mídia e EcoBot), cada um em sua branch e PR, com registro neste diário.
- Confirmar com o professor se a compactação em `.zip` (etapa 5 do escopo) é necessária além do GitHub.

### DD/MM/AAAA – _[próximo registro]_
**Responsável:**
**O que foi feito:**
**Decisões tomadas:**
**Dificuldades e soluções:**
**Próximos passos:**
