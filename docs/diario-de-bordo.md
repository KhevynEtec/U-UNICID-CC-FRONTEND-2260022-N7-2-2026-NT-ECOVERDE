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
**Responsável:** _[preencher]_
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
- EcoBot: widget acessível (`public/js/ecobot.js`) + FAQ local (`lib/faq.js`), sem chave de API. 12 testes automatizados (`npm test`).
- Uma branch e um pull request por etapa.

**Prompts usados (resumo):**
1. "A partir de agora teremos que seguir à risca a rubrica do PDF da Aula 06. Dê uma breve explicação detalhada antes de começarmos." → o agente analisou o repositório e propôs um plano em 7 fases, aguardando validação.
2. Decisões da equipe passadas ao agente: mover o site para `public/`; EcoBot funcionando só com FAQ, sem chave de API; permitir branches e PRs no GitHub; trabalhar pelo Claude Code em vez do Cursor.

**Decisões tomadas:**
- O EcoBot só responde com informações **já publicadas no site** (regra de não inventar dados). Cada resposta aponta a página de origem.
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

### DD/MM/AAAA – _[próximo registro]_
**Responsável:**
**O que foi feito:**
**Decisões tomadas:**
**Dificuldades e soluções:**
**Próximos passos:**
