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

### DD/MM/AAAA – _[próximo registro]_
**Responsável:**
**O que foi feito:**
**Decisões tomadas:**
**Dificuldades e soluções:**
**Próximos passos:**
