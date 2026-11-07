# Plano de contexto — EcoVerde

> Briefing permanente do projeto para a equipe e para a IA.
> Cite este arquivo no chat com `@docs/plano-contexto.md`. Atualize e faça commit sempre que o escopo mudar.
> Disciplina Desenvolvimento Front-End para Web · UNICID · 2026.2 · Prof. Paulo Sérgio Fratta.
> Equipe **Promptdão**: Alexandre Almeida de Jesus Nogueira, Khevyn Lopes dos Santos, Luis Plinio Cornélio Mota, Marcos Paulo Cornélio Mota e Yuri Navas Moreira.

## 1. Nome do projeto

**EcoVerde** — Sustentabilidade, energia limpa e inclusão.

## 2. Visão geral

Portal web educativo e acessível que une três pilares: **sustentabilidade** (reciclagem, uso racional da água e da energia), **energia limpa** (estudo de caso da Usina Binacional de Itaipu) e **inclusão social** (causa Setembro Verde e acessibilidade digital). Inclui o **EcoBot**, assistente que responde dúvidas frequentes sobre os temas do site.

## 3. Problema que resolve

O descarte inadequado de resíduos e a dependência de fontes poluentes agravam a crise climática, e pouca gente sabe como agir no dia a dia. Ao mesmo tempo, Pessoas com Deficiência (PCD) enfrentam barreiras de acesso à informação na web. O EcoVerde reúne educação ambiental e inclusão em um portal que é, ele próprio, leve e acessível.

## 4. Público-alvo

- Estudantes, educadores, ativistas ambientais e cidadãos interessados em reciclagem e energias limpas, com foco em jovens e adultos no Brasil.
- **Prioridade:** pessoas com deficiência visual, motora, auditiva e cognitiva — o site precisa funcionar com teclado, leitor de tela, alto contraste e texto ampliado.

## 5. Objetivos

- Informar sobre reciclagem, uso racional de recursos e energia renovável.
- Engajar visitantes na causa do Setembro Verde (formulário de doação demonstrativo).
- Apresentar a Usina de Itaipu como estudo de caso de energia limpa e seus impactos socioambientais.
- Ser referência de acessibilidade digital (WCAG AA) entre os projetos da turma.
- Publicar o site completo e online até **09/11/2026**.

ODS relacionados: **ODS 7** (energia limpa), **ODS 10** (redução das desigualdades), **ODS 12** (consumo e produção responsáveis) e **ODS 13** (ação climática).

## 6. Funcionalidades principais

- **10 páginas** interligadas, com o mesmo cabeçalho, menu, barra de acessibilidade e rodapé:
  `index`, `sobre`, `itaipu`, `doacao`, `acessibilidade`, `galeria`, `midia`, `noticias`, `contato`, `orcamento_hospedagem`.
- **Formulários validados** com HTML5 nativo (doação e contato), com erro exibido junto ao campo.
- **Galeria** com `figure`, `figcaption`, fonte e texto alternativo.
- **Central de mídia**: `<video>` com legendas WebVTT, `<audio>` com transcrição e mapa em `<iframe>`.
- **Recursos de acessibilidade**: skip link, atalhos eMAG (1 a 4), alto contraste e ajuste de fonte.
- **EcoBot**: widget de perguntas e respostas baseado em **FAQ local**, servido pela rota `POST /api/assistente`. Funciona **sem chave de API**.

## 7. Stack técnica

- **Front-end:** HTML5 semântico, CSS3 puro (um arquivo `public/css/style.css`, mobile-first, variáveis CSS) e JavaScript nativo. Sem frameworks.
- **Servidor:** Node.js + Express, que serve a pasta `public/` e a rota do EcoBot.
- **Versionamento:** Git + GitHub (issues, branches por tarefa, pull requests).
- **Deploy:** Railway, com deploy automático a cada push na `main`.
- **IA no desenvolvimento:** agentes (Claude Code / Cursor) guiados por este plano e pelas regras em `.cursor/rules/`.

## 8. Requisitos não funcionais

- **Acessibilidade:** WCAG 2.1 nível AA — contraste mínimo 4.5:1, foco visível, rótulos, `alt`, ARIA correto, navegação 100% por teclado.
- **Responsividade:** mobile-first, ajustes em 600px, 900px e 1100px.
- **Desempenho e sustentabilidade digital:** ilustrações em SVG, imagens em WebP, sem fontes ou bibliotecas externas.
- **Movimento reduzido:** respeitar `prefers-reduced-motion`; carrossel sem rotação automática.
- **Segurança e LGPD:** nenhuma chave ou token no código (somente `.env` e variáveis do Railway); nenhum dado pessoal real coletado — os formulários não enviam dados.
- **Honestidade de conteúdo:** nenhum dado factual inventado; pendências marcadas como "A complementar".

## 9. Estrutura do projeto

```
ecoverde/
├── .cursor/rules/*.mdc      # regras da IA
├── .cursor/mcp.json         # servidores MCP (GitHub, Railway, Figma)
├── AGENTS.md                # resumo das regras para qualquer agente
├── docs/                    # plano de contexto, diário de bordo, evidências, orçamento
├── public/                  # o site (as 10 páginas)
│   ├── *.html
│   ├── css/style.css
│   ├── js/script.js
│   ├── js/ecobot.js
│   └── assets/ (images, icons, media)
├── lib/faq.js               # base de perguntas do EcoBot
├── server.js                # Express: site estático + /api/assistente
├── package.json
├── .env.example
└── .gitignore               # ignora .env e node_modules
```

## 10. Desejáveis (nice to have)

- EcoBot com resposta por API de IA quando houver chave configurada (fallback para o FAQ).
- Mapa de pontos de coleta seletiva.
- Modo escuro além do alto contraste.
- Conteúdos oficiais (Itaipu, notícias, podcast) no lugar dos demonstrativos.

## 11. Métricas e critérios de sucesso

- **0 erros** no validador W3C em todas as páginas.
- **Lighthouse Acessibilidade ≥ 90** em todas as páginas.
- Todas as páginas navegáveis apenas com teclado.
- EcoBot respondendo na URL pública do Railway.
- Histórico no GitHub com issues, PRs revisados e commits claros.
- Diário de bordo com os prompts usados e as decisões da equipe.
