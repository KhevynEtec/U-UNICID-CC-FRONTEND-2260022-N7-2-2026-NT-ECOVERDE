# EcoVerde — Sustentabilidade, energia limpa e inclusão

> Cópia do README principal mantida na pasta `/docs`, como pede o escopo do projeto. Os links abaixo partem desta pasta.

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
| Início | `index.html` | Hero, três pilares, carrossel acessível, dicas e chamada para o Setembro Verde |
| Sobre | `sobre.html` | História, cronograma, missão, visão, valores e público-alvo |
| Itaipu | `itaipu.html` | Artigo educativo: geração renovável, energia limpa, ecossistemas e impactos |
| Setembro Verde | `doacao.html` | A causa e um formulário de doação validado (demonstrativo) |
| Acessibilidade | `acessibilidade.html` | Compromisso, teclas de atalho e navegação por teclado |
| Galeria | `galeria.html` | Imagens com `figure`, `figcaption`, fonte e texto alternativo |
| Mídia | `midia.html` | Vídeo autoral narrado com legendas, Podcast EcoVerde com transcrição e mapa da região de Itaipu |
| Notícias | `noticias.html` | Notícias reais por categoria, com data e fonte |
| Contato | `contato.html` | Formulário validado e cards da equipe |
| Orçamento | `orcamento_hospedagem.html` | Comparativo de hospedagem verde e registro de domínio |

**Acessibilidade (público prioritário: pessoas com deficiência)**

- Link “Pular para o conteúdo principal” e teclas de atalho no padrão eMAG (1 conteúdo, 2 menu, 3 rodapé, 4 acessibilidade).
- Alto contraste e ajuste do tamanho do texto, salvos no navegador.
- Navegação completa por teclado, foco visível, contraste WCAG AA e respeito a `prefers-reduced-motion`.

**EcoBot — FAQ + API de IA**

- Botão no canto de todas as páginas. Responde em duas camadas:
  1. **FAQ local** (`lib/faq.js`): perguntas frequentes com respostas tiradas do próprio site, cada uma com link para a página de origem.
  2. **API de IA** (Claude Haiku 5.5, da Anthropic): só quando o FAQ não encontra resposta. Recebe o conteúdo do site como base e tem instrução para não inventar dados. As respostas aparecem marcadas como **“Resposta gerada por IA”**.
- Sem a chave `IA_API_KEY`, ou se a API falhar, o EcoBot continua funcionando só com o FAQ.
- A chave fica só no servidor e cada visitante pode fazer até 15 perguntas por minuto.

Os formulários validam os dados, mas **não enviam nada**: nenhum dado pessoal é coletado e nenhum pagamento é processado.

---

## Como rodar localmente

Requisito: [Node.js](https://nodejs.org) 20.12 ou superior.

```bash
git clone https://github.com/KhevynEtec/U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE.git
cd U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE
npm install
npm start      # abre em http://localhost:3000
npm test       # testes automatizados do EcoBot
```

Para ativar a camada de IA, copie `.env.example` para `.env` e preencha `IA_API_KEY`. O `.env` não vai para o Git.

---

## Tecnologias e publicação

- **Front-end:** HTML5 semântico, CSS3 puro (um arquivo, mobile-first, com variáveis) e JavaScript nativo. Sem frameworks e sem fontes externas.
- **Servidor:** Node.js + Express (`server.js`) — entrega a pasta `public/` e a rota `POST /api/assistente` do EcoBot.
- **IA do EcoBot:** SDK oficial `@anthropic-ai/sdk`.
- **Versionamento:** Git e GitHub. Desde a Aula 06, cada tarefa tem a sua branch e o seu pull request.
- **Deploy:** Railway, com publicação automática a cada merge na `main`. Passo a passo em [docs/deploy-railway.md](deploy-railway.md).

Paleta: Verde Folha `#2E7D32`, Azul Hidro `#0288D1`, Setembro Verde `#7CB342`, Fundo Claro `#F5F5F5` e Texto Escuro `#212121`. Cores claras demais para texto comum aparecem só em superfícies, com variantes escuras para textos e links.

---

## Estrutura de pastas

```
├── public/                    # o site
│   ├── *.html                 # as 10 páginas
│   ├── css/style.css
│   ├── js/script.js           # menu, acessibilidade, carrossel, formulários
│   ├── js/ecobot.js           # widget do EcoBot
│   └── assets/                # imagens, ícones, vídeo, áudio e legendas
├── lib/
│   ├── faq.js                 # perguntas e respostas do EcoBot
│   └── ia.js                  # FAQ primeiro; API de IA se configurada
├── test/ia.test.js            # testes do EcoBot
├── server.js                  # servidor Express
├── docs/                      # documentação do projeto (ver abaixo)
├── .cursor/rules/             # regras da IA (Cursor)
├── .cursor/mcp.json           # servidores MCP: GitHub, Railway e Figma
├── AGENTS.md                  # resumo das regras para qualquer agente de IA
└── .env.example               # modelo de variáveis; o .env real fica fora do Git
```

---

## Documentação

| Documento | Conteúdo |
| --- | --- |
| [Plano de contexto](plano-contexto.md) | Briefing permanente do projeto, com as 11 seções do modelo da Aula 06 |
| [Diário de bordo](diario-de-bordo.md) | Registro das atividades, decisões, dificuldades e prompts usados |
| [Evidências de testes](evidencias-testes.md) | W3C, acessibilidade, responsividade, formulários, mídia, EcoBot e deploy |
| [Orçamento de hospedagem](orcamento-hospedagem.md) | Comparativo de hospedagem verde e domínio |
| [Deploy no Railway](deploy-railway.md) | Passo a passo da publicação e cuidados com segredos |
| [Regras da IA](../.cursor/rules/) | Padrões de HTML, CSS, acessibilidade e commits que os agentes seguem |

---

## Uso de inteligência artificial

Conforme o escopo, a equipe usou ChatGPT, Claude e Gemini como apoio ao longo do projeto. A partir da Aula 06, o trabalho no repositório foi feito com um agente de IA (Claude Code, no VS Code), guiado pelo plano de contexto e pelas regras em `.cursor/rules/`, que o Cursor também reconhece. Desde a Aula 06, as mudanças entram na `main` por pull request, com o diff revisado pela equipe. Os commits feitos com IA têm a linha `Co-Authored-By` do agente, e os prompts e decisões estão registrados no [diário de bordo](diario-de-bordo.md).

No site, a IA aparece no EcoBot (respostas marcadas como “gerada por IA”) e na produção do vídeo e do podcast da página Mídia, feitos a partir de roteiros da equipe e identificados na própria página.

---

## Pendências

- Testes manuais registrados em [docs/evidencias-testes.md](evidencias-testes.md) (W3C, WAVE, Lighthouse, teclado, celular, formulários e mídia).
