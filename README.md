# EcoVerde — Sustentabilidade, energia limpa e inclusão

**Site publicado:** https://u-unicid-cc-frontend-2260022-n7-2-2026-nt-ecover-production.up.railway.app

Portal web educativo e acessível que une três pilares: **sustentabilidade** (reciclagem e uso racional da água e da energia), **energia limpa** (estudo de caso da Usina Binacional de Itaipu) e **inclusão social** (causa Setembro Verde e acessibilidade digital). Inclui o **EcoBot**, assistente que tira dúvidas sobre os temas do site.

Projeto acadêmico da disciplina **Desenvolvimento Front-End para Web** · UNICID – Universidade Cidade de São Paulo · 2026.2 · Prof. Paulo Sérgio Fratta.

**Equipe Promptdão:** Alexandre Almeida de Jesus Nogueira, Khevyn Lopes dos Santos, Luis Plinio Cornélio Mota, Marcos Paulo Cornélio Mota e Yuri Navas Moreira.

> Nenhum dado factual foi inventado: números, notícias e preços têm a fonte indicada na própria página.

---

## Funcionalidades

**10 páginas** interligadas, com o mesmo cabeçalho, menu, barra de acessibilidade e rodapé:

| Página | Arquivo | Conteúdo |
| --- | --- | --- |
| Início | `index.html` | Hero, três pilares, destaque dos ODS, carrossel acessível, dicas e chamada para o Setembro Verde |
| Sobre | `sobre.html` | História, cronograma, missão, visão, valores, “EcoVerde e os ODS” e público-alvo |
| Itaipu | `itaipu.html` | Artigo educativo: geração renovável, energia limpa, ecossistemas e impactos |
| Setembro Verde | `doacao.html` | A causa e um formulário de doação com validação forte (demonstrativo) |
| Acessibilidade | `acessibilidade.html` | Compromisso, teclas de atalho, navegação por teclado, painel “Mais opções”, Libras, formulários, privacidade e limitações conhecidas |
| Galeria | `galeria.html` | Imagens com `figure`, `figcaption`, fonte e texto alternativo |
| Mídia | `midia.html` | Vídeo autoral narrado com legendas, Podcast EcoVerde com transcrição e mapa da região de Itaipu |
| Notícias | `noticias.html` | Notícias reais por categoria, com data e fonte |
| Contato | `contato.html` | Formulário com validação forte e cards da equipe |
| Orçamento | `orcamento_hospedagem.html` | Comparativo de hospedagem verde e registro de domínio |

**Acessibilidade (público prioritário: pessoas com deficiência)**

- Link “Pular para o conteúdo principal” e teclas de atalho no padrão eMAG (1 conteúdo, 2 menu, 3 rodapé, 4 acessibilidade, 5 EcoBot).
- Alto contraste e ajuste do tamanho do texto na barra do topo.
- **Painel “Mais opções”:** quatro modos de cor (Padrão, Alto contraste, Modo escuro e Escala de cinza), leitura em voz alta com as vozes do próprio navegador (Web Speech API), leitura facilitada (espaçamento do texto pelo critério 1.4.12 da WCAG e destaque de links) e “Restaurar padrão”. As preferências ficam salvas só no navegador e são aplicadas antes do primeiro desenho da página.
- **Libras com o VLibras**, tradutor oficial do governo federal: botão “Libras” na barra do topo ou botão no canto inferior esquerdo da tela.
- Navegação completa por teclado, foco visível que não fica escondido atrás do EcoBot nem do VLibras, contraste WCAG AA (também no modo escuro) e respeito a `prefers-reduced-motion`.

**EcoBot — FAQ + API de IA**

- Botão no canto de todas as páginas. Responde em duas camadas:
  1. **FAQ local** (`lib/faq.js`): perguntas frequentes com respostas tiradas do próprio site, cada uma com link para a página de origem.
  2. **API de IA** (Claude Haiku 5.5, da Anthropic): só quando o FAQ não encontra resposta. Recebe o conteúdo do site como base e tem instrução para não inventar dados. As respostas aparecem marcadas como **“Resposta gerada por IA”**.
- Sem a chave `IA_API_KEY`, ou se a API falhar, o EcoBot continua funcionando só com o FAQ.
- A chave fica só no servidor e cada visitante pode fazer até 15 perguntas por minuto.

**Formulários (contato e doação):** validação HTML5 com regras próprias (`public/js/validacao.js`) para nome, e-mail, telefone e mensagem. Elas recusam dados falsos (como o nome “aa”, o e-mail kk@email.com ou o telefone 11111111), sugerem a correção de domínios digitados errado e conferem o DDD. O servidor consulta se o domínio do e-mail existe (registro MX), sem gravar o e-mail. Os formulários são demonstrativos: a mensagem e a doação não são enviadas e nenhum pagamento é processado.

**ODS:** o projeto se relaciona com os ODS 7, 10, 12 e 13 da Agenda 2030, explicados na página Sobre com a fonte da ONU Brasil. O EcoBot também responde sobre eles.

---

## Como rodar localmente

Requisito: [Node.js](https://nodejs.org) 20.12 ou superior.

```bash
git clone https://github.com/KhevynEtec/U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE.git
cd U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE
npm install
npm start      # abre em http://localhost:3000
npm test       # testes automatizados: EcoBot, validação dos formulários e verificação de e-mail
```

Para ativar a camada de IA, copie `.env.example` para `.env` e preencha `IA_API_KEY`. O `.env` não vai para o Git.

---

## Tecnologias e publicação

- **Front-end:** HTML5 semântico, CSS3 puro (um arquivo, mobile-first, com variáveis) e JavaScript nativo. Sem frameworks e sem fontes externas. A única biblioteca externa no front-end é o VLibras (ver “Decisões do projeto”).
- **Servidor:** Node.js + Express (`server.js`) — entrega a pasta `public/` e as rotas `POST /api/assistente` (EcoBot), `GET /api/verificar-email` (domínio do e-mail dos formulários) e `GET /api/saude` (servidor no ar). O EcoBot e a verificação de e-mail têm limite de pedidos por visitante.
- **IA do EcoBot:** SDK oficial `@anthropic-ai/sdk`.
- **Versionamento:** Git e GitHub. Desde a Aula 06, cada tarefa tem a sua branch e o seu pull request.
- **Deploy:** Railway, com publicação automática a cada merge na `main`. Passo a passo em [docs/deploy-railway.md](docs/deploy-railway.md).

Paleta: Verde Folha `#2E7D32`, Azul Hidro `#0288D1`, Setembro Verde `#7CB342`, Fundo Claro `#F5F5F5` e Texto Escuro `#212121`. Cores claras demais para texto comum aparecem só em superfícies, com variantes escuras para textos e links.

---

## Estrutura de pastas

```
├── public/                    # o site
│   ├── *.html                 # as 10 páginas
│   ├── css/style.css
│   ├── js/script.js           # menu, barra e painel de acessibilidade, carrossel, formulários, VLibras
│   ├── js/validacao.js        # regras dos formulários (nome, e-mail, telefone, mensagem)
│   ├── js/ecobot.js           # widget do EcoBot
│   └── assets/                # imagens, ícones, vídeo, áudio e legendas
├── lib/
│   ├── faq.js                 # perguntas e respostas do EcoBot
│   ├── ia.js                  # FAQ primeiro; API de IA se configurada
│   └── email.js               # verifica o domínio do e-mail (registro MX)
├── test/                      # testes: ia, validacao e email (npm test)
├── server.js                  # servidor Express
├── docs/                      # documentação do projeto (ver abaixo)
├── .cursor/rules/             # regras da IA (Cursor)
├── .cursor/mcp.json           # servidores MCP: GitHub, Railway e Figma
├── AGENTS.md                  # resumo das regras para qualquer agente de IA
└── .env.example               # modelo de variáveis; o .env real fica fora do Git
```

---

## Decisões do projeto

- **Script curto no `<head>` das páginas:** troca `no-js` por `js` e aplica as preferências salvas antes do primeiro desenho, para evitar o pulo do menu, a tela piscar de clara para escura e o deslocamento de layout (CLS). É a única exceção ao JavaScript inline, registrada em [.cursor/rules/html-semantico.mdc](.cursor/rules/html-semantico.mdc).
- **`!important` só no alto contraste e na leitura facilitada:** são preferências da pessoa e precisam valer sobre o estilo de qualquer componente. Exceção registrada em [.cursor/rules/css-estilo.mdc](.cursor/rules/css-estilo.mdc). O modo escuro não usa `!important`.
- **VLibras como única biblioteca externa no front-end:** é o tradutor oficial de Libras do governo federal, e os navegadores não têm tradução para Libras. É carregado depois da página e, se falhar, o site segue normalmente. Exceção registrada no [plano de contexto](docs/plano-contexto.md).
- **Galeria com ilustrações originais em SVG** no lugar das fotos do Unsplash/Pexels previstas no escopo: os direitos de uso ficam garantidos (são da própria equipe), os arquivos são leves e cada imagem tem descrição alternativa completa.

---

## Documentação

| Documento | Conteúdo |
| --- | --- |
| [Plano de contexto](docs/plano-contexto.md) | Briefing permanente do projeto, com as 11 seções do modelo da Aula 06 |
| [Diário de bordo](docs/diario-de-bordo.md) | Registro das atividades, decisões, dificuldades e prompts usados |
| [Evidências de testes](docs/evidencias-testes.md) | W3C, acessibilidade, responsividade, formulários, mídia, EcoBot e deploy |
| [Orçamento de hospedagem](docs/orcamento-hospedagem.md) | Comparativo de hospedagem verde e domínio |
| [Deploy no Railway](docs/deploy-railway.md) | Passo a passo da publicação e cuidados com segredos |
| [Regras da IA](.cursor/rules/) | Padrões de HTML, CSS, acessibilidade e commits que os agentes seguem |

---

## Uso de inteligência artificial

Conforme o escopo, a equipe usou ChatGPT, Claude e Gemini como apoio ao longo do projeto. A partir da Aula 06, o trabalho no repositório foi feito com um agente de IA (Claude Code, no VS Code), guiado pelo plano de contexto e pelas regras em `.cursor/rules/`, que o Cursor também reconhece. Desde a Aula 06, as mudanças entram na `main` por pull request, com o diff revisado pela equipe. Os commits feitos com IA têm a linha `Co-Authored-By` do agente, e os prompts e decisões estão registrados no [diário de bordo](docs/diario-de-bordo.md).

No site, a IA aparece no EcoBot (respostas marcadas como “gerada por IA”) e na produção do vídeo e do podcast da página Mídia, feitos a partir de roteiros da equipe e identificados na própria página.

---

## Pendências

- Registrar em [docs/evidencias-testes.md](docs/evidencias-testes.md) e no [diário de bordo](docs/diario-de-bordo.md) os testes e as decisões dos PRs #39, #40, #41, #42, #43, #45 e #46 (validação dos formulários, pulo do menu, VLibras, painel de acessibilidade, posição do VLibras, ODS e índice lateral).
