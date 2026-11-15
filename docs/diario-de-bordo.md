# Diário de Bordo – EcoVerde

Registro do desenvolvimento do projeto pela equipe **Promptdão**.
Cada integrante deve registrar suas atividades, decisões e dificuldades.

## Cronograma (conforme escopo)

| Etapa | Atividade | Prazo | Status |
|---|---|---|---|
| 1 | Elaboração do escopo, mapa do site e wireframes | 21/09/2026 | Concluída |
| 2 | Estruturação do HTML5 semântico das 10 páginas | 15/10/2026 | Concluída |
| 3 | Estilização CSS3, responsividade e acessibilidade (cores/contraste) | 30/10/2026 | Concluída |
| 4 | Inserção de multimídia (`video`, `audio`, `iframe`) e formulários | 10/11/2026 | Concluída (mídia autoral) |
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

### 08/11/2026 – Issues por página abertas com o agente do Cursor
**Responsável:** Khevyn Lopes dos Santos, com o agente do Cursor (abertura das issues) e o agente Claude Code no VS Code (verificação e registro)
**O que foi feito:**
- Pelo Cursor, foram abertas 10 issues no GitHub (#11 a #20), uma para cada página já entregue, todas com o mesmo checklist da regra `html-semantico.mdc`: um único `h1`, `section` com `aria-labelledby`, imagens com `alt`, link no menu com `aria-current="page"` e validação W3C.
- O Claude Code conferiu automaticamente no código os quatro primeiros itens nas 10 páginas:
  - um único `h1` em todas;
  - todas as `section` com `aria-labelledby` apontando para um id existente, exceto a barra de acessibilidade do topo, que usa `aria-label` (ela não tem título visível, então o uso está correto);
  - nenhuma das 46 imagens sem `alt`;
  - todas as páginas no `nav#menu`, com `aria-current="page"` na página atual.
- O item “Validação W3C” fica para o teste manual de cada página.

**Decisões tomadas:**
- Cada integrante fica responsável por duas issues: confere a página, marca o checklist e fecha a issue pelo PR de testes, com `Closes #número` na descrição.
- A barra de acessibilidade continua com `aria-label`; isso será comentado nas issues em vez de alterar o HTML.

**Dificuldades e soluções:**
- As issues #12 e #18 saíram com pequenos erros de digitação no texto (“sobre.htmll” e “Página: doacao.html”); a correção é feita pelo botão *Edit* da própria issue.

**Próximos passos:**
- Atribuir as issues (*Assignees*), validar cada página no W3C e fechar as issues junto com os PRs de testes.

### 08/11/2026 – Validação W3C das 10 páginas, correções e testes manuais
**Responsável:** equipe Promptdão, com o agente Claude Code no VS Code (verificação dos prints, correções e registro)

**Participação de cada integrante** (conforme o histórico do GitHub):

| Integrante | O que fez |
|---|---|
| Alexandre Almeida de Jesus Nogueira | Validou no W3C as páginas Início (#11) e Sobre (#12), anexou os prints e fechou as issues; fez o merge do PR #21 (registro das issues no diário). |
| Khevyn Lopes dos Santos | Abriu as 10 issues com o agente do Cursor; validou Acessibilidade (#14), Contato (#19) e Orçamento (#20), refazendo o print da #20; revisou e fechou as issues #13 a #16; validou o CSS no W3C, o que revelou o erro corrigido no PR #22; abriu os PRs #21, #22, #24 e #25 e acompanhou o deploy no Railway. |
| Luis Plinio Cornélio Mota | Validou no W3C a página Itaipu (#13) e anexou o print. |
| Marcos Paulo Cornélio Mota | Validou no W3C as páginas Notícias (#15) e Galeria (#16) e anexou os prints. |
| Yuri Navas Moreira | Validou no W3C as páginas Mídia (#17) e Doação (#18), anexou os prints e fechou as issues; fez o merge dos PRs #22 (correção do CSS) e #23 (sugestão do EcoBot). |

**O que foi feito:**
- As 10 páginas passaram no W3C com **0 erros e 0 avisos**, validando a URL publicada no Railway; cada print está no comentário da issue da página (#11 a #20).
- CSS: o validador apontou 1 erro na linha 731 (`linear-gradient` com uma cor só, sobra da troca do cabeçalho azul por verde). Corrigido no PR #22 com cor sólida; os 31 alertas restantes são informativos (variáveis CSS, prefixo `-webkit-`, `clip` do texto para leitor de tela e cores iguais de fundo e borda nos botões).
- EcoBot: passou a mostrar uma sugestão de pergunta por vez, em vez de até quatro (PRs #23 e #24).
- EcoBot pelo teclado: o botão ficava no fim da ordem do `Tab` (28 tabulações na página inicial). Foi criado o **atalho 5** (`Alt + 5` no Chrome e no Edge), no padrão eMAG dos atalhos 1 a 4, documentado na tabela da página Acessibilidade e no FAQ (PR #25).
- Notícias: a foto de uma notícia era bloqueada pelo site de origem e aparecia quebrada. A notícia foi trocada por uma da Agência Brasil (18/10/2026), com foto creditada (PR #25).
- Testes manuais de acessibilidade, responsividade, formulários, multimídia e EcoBot registrados em `evidencias-testes.md`.

**Decisões tomadas:**
- As issues foram fechadas com o print no comentário (*Close with comment*), em vez de pelo PR: o print fica junto do checklist de cada página.
- A barra de acessibilidade mantém `aria-label`, porque não tem título visível; as demais `section` usam `aria-labelledby`.
- Teste que não foi feito fica ⏳ com a observação “não testado”, e não ✅.

**Dificuldades e soluções:**
- O primeiro print da issue #20 mostrava o resultado da página Contato (a URL foi trocada sem clicar em *Check*); o print foi refeito.
- Os deploys do PR #23 falharam no Railway com “Failed to build an image” e sem log de build. A página de status do Railway mostrava um incidente (*GitHub Outage Affecting Builds*). O site continuou no ar com a versão anterior e, quando o serviço voltou, o deploy do PR #25 foi concluído com sucesso.
- O registro de 08/11 sobre as issues tinha sido inserido por engano dentro do bloco “Modelo de registro”; foi movido para esta seção.

**Próximos passos:**
- Concluir os itens ⏳ (leitor de tela e movimento reduzido) e descrever as ressalvas ⚠️ em `evidencias-testes.md`.
- Apagar `styles.css` e `Screenshot_1.png` da raiz.
- Confirmar com o professor se a compactação em `.zip` é necessária.

### 14/11/2026 – Entrega final: correções do professor, acessibilidade ampliada, ODS e documentação
**Responsável:** equipe Promptdão, com o Claude (chat) no planejamento e na revisão e o agente Claude Code no VS Code na execução

**Participação de cada integrante** (conforme o histórico do GitHub e as tarefas manuais da etapa):

| Integrante | O que fez |
|---|---|
| Alexandre Almeida de Jesus Nogueira | Testou o site com o leitor de tela NVDA (14/11/2026); fez o merge dos PRs #39 (formulários) e #40 (pulo do menu). |
| Khevyn Lopes dos Santos | Autor dos commits dos 8 PRs da etapa (30 commits, com o agente Claude Code); validou manualmente as 10 páginas no validator.w3.org pela URL do Railway; conferiu de ouvido a leitura em voz alta no Microsoft Edge; fez o merge dos PRs #41, #46 e #47. |
| Luis Plinio Cornélio Mota | Fez o merge dos PRs #42 (painel de acessibilidade) e #45 (ODS). |
| Marcos Paulo Cornélio Mota | Nenhuma atividade registrada no histórico desta etapa. |
| Yuri Navas Moreira | Fez o merge do PR #43 (posição do VLibras) e comentou “Alteração validada” no PR. |

**O que foi feito:**
- PR #39 (issue #32): validação forte dos formulários de contato e doação (nome, e-mail, telefone e mensagem), verificação do domínio do e-mail pelo registro MX e correção de um laço infinito antigo.
- PR #40 (issue #33): o menu não pula mais ao carregar no celular; CLS de 0,521 para 0 no Lighthouse mobile.
- PR #41 (issue #34): tradutor VLibras nas 10 páginas.
- PR #42 (issue #35): painel “Mais opções” com 4 modos de cor, leitura em voz alta, leitura facilitada e “Restaurar padrão”, além do botão “Libras” na barra.
- PR #43 (refs #35): botão do VLibras no canto inferior esquerdo, sem cobrir o painel nem o EcoBot.
- PR #45 (issue #36): seção “EcoVerde e os ODS” e ligação do site aos ODS 7, 10, 12 e 13.
- PR #46 (issue #44): índice lateral da Itaipu e das Notícias rolando por dentro quando não cabe na tela.
- PR #47 (issue #37): página de acessibilidade e README atualizados com os recursos novos e as decisões do projeto.
- Testes da etapa registrados em `evidencias-testes.md` (seções 1.1, 8 e 9), incluindo o Lighthouse das 10 páginas no site publicado.

**Prompts usados (resumo) e uso de IA:**
- O professor apontou que os formulários aceitavam dados falsos e pediu acessibilidade para pessoas surdas, mais opções de contraste e recursos para deficiência visual.
- A equipe usou o Claude (chat) para analisar o projeto contra a rubrica da Aula 06 e o escopo, planejar as etapas e revisar cada plano e cada resultado.
- O Claude Code no VS Code executou cada etapa numa branch própria, com pull request. Cada etapa começou com um prompt com contexto (AGENTS.md e regras), tarefa, regras de validação e processo (“mostre o plano antes de editar, sem push nem merge até eu pedir”). O agente mostrava o plano, a equipe aprovava ou ajustava e só então ele editava, testava e abria o PR.
- Os commits feitos com IA têm a linha `Co-Authored-By` do agente.

**Decisões tomadas:**
- E-mail: verificação do domínio pelo registro MX no servidor; se a rota falhar ou não souber responder, o formulário não bloqueia.
- VLibras como única biblioteca externa no front-end, por ser o tradutor oficial do governo e não haver tradução para Libras nos navegadores.
- Preferências salvas aplicadas por um script curto no `<head>` (opção B), para a tela não piscar e nada pular de lugar.
- A posição “BL” não existe na versão 7.12.3 do VLibras; o botão foi para o canto inferior esquerdo por um `<style>` dentro do shadow DOM do widget.
- Paleta do modo escuro aprovada pela equipe, com contraste AA medido (textos verdes em `#81C784` e erros em `#FF8A80`).
- Chave “onu” retirada do FAQ dos ODS, porque roubaria perguntas como “O que a ONU fala sobre reciclagem?”.
- A meta 10.2 entrou no card do ODS 10 por estar na fonte oficial (ONU Brasil) e citar a inclusão independentemente de deficiência.
- A galeria continua com ilustrações originais em SVG, no lugar das fotos previstas no escopo.

**Dificuldades e soluções:**
- Um laço infinito antigo em `atualizarErro` (o `checkValidity()` disparava o evento `invalid`, que chamava a função de novo) apareceu nos testes dos formulários e foi corrigido no PR #39.
- O pulo do menu dependia da velocidade de carregamento: numa das três rodadas do Lighthouse ele não aparecia. Com a correção, as três deram CLS 0.
- Em telas de altura média, o botão do VLibras no meio da lateral cobria um checkbox do painel; foi para o canto inferior esquerdo (PR #43).
- O validator.w3.org bloqueia pedidos automáticos; as validações automáticas dos PRs foram feitas no validator.nu (mesmo mecanismo), e a validação final das 10 páginas foi feita manualmente no validator.w3.org.
- O axe encontrou bugs antigos de contraste no alto contraste: teclas (`<kbd>`) com texto branco sobre fundo branco e textos verde-escuros sobre preto. Foram corrigidos no PR #42.
- 5 dos 8 PRs desta etapa tiveram o merge feito por outro integrante. Os PRs #41, #46 e #47 tiveram o merge feito pelo próprio autor (Khevyn), o que contraria a regra da equipe, por causa do prazo de entrega (16/11). Para compensar, cada PR teve descrição completa, testes registrados e revisão do plano e do resultado antes do merge.

**Próximos passos:**
- Revisão dos PRs #41, #46 e #47 por outro integrante, com comentário de revisão no GitHub, mesmo após o merge.
- Itens ainda ⏳ em `evidencias-testes.md`: movimento reduzido, o `title` do mapa com leitor de tela e o anúncio da resposta do EcoBot pelo leitor de tela.
- Confirmar com o professor se a compactação em `.zip` é necessária.

### 15/11/2026 – Fotos do Pixabay nas páginas principais
**Responsável:** Khevyn Lopes dos Santos, com o agente Claude Code no VS Code

**O que foi feito:**
- 7 ilustrações das páginas Início (topo e carrossel), Sobre (2), Itaipu (2) e Setembro Verde (1) foram trocadas por imagens de uso livre do Pixabay, escolhidas pela equipe. A galeria continua com as ilustrações originais em SVG.
- Cada imagem foi convertida para WebP e recortada na mesma proporção da ilustração que substituiu, para o layout não mudar. Peso: cerca de 9 MB nos originais e 372 KB nas versões do site. A foto do topo da Início tem também uma versão de 720 px para o celular.
- Texto alternativo novo para cada imagem e crédito “Pixabay” na legenda.
- Validação (detalhes na seção 8.9 de `evidencias-testes.md`): W3C com 0 erros, axe com 0 violações nos 4 modos de cor, Lighthouse com acessibilidade 100 e CLS 0 nas 4 páginas, e desempenho de 95 a 99.

**Decisões tomadas:**
- Recortar as fotos na proporção das ilustrações antigas, para nada mudar de tamanho nas páginas.
- Uma foto de recife de coral com tartaruga marinha foi descartada para a seção dos ecossistemas da Itaipu, porque o reservatório é de água doce; entrou uma foto de peixes em um rio.
- O crédito ficou só “Pixabay”, porque o autor de cada foto não foi registrado.

**Dificuldades e soluções:**
- A foto do topo derrubou o desempenho da página inicial para 92 no celular; uma versão de 720 px, escolhida pelo navegador com `srcset`, levou de volta a 95 (a `main` mediu 96 na mesma hora).
- O validador do W3C não aceita o atributo `fetchpriority` em `<img>`; ele foi retirado para manter 0 erros.

**Próximos passos:**
- Medir o Lighthouse no site publicado depois do merge.
- Se possível, registrar o autor e o link de cada foto no Pixabay para completar os créditos.

### DD/MM/AAAA – _[próximo registro]_
**Responsável:**
**O que foi feito:**
**Decisões tomadas:**
**Dificuldades e soluções:**
**Próximos passos:**
