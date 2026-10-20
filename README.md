
Link do EcoVerde na hospedagem:
# U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE

# EcoVerde & Itaipu Sustentável

# Plano de contexto e escopo — EcoVerde

Briefing permanente do projeto para a equipe e para a IA.
Disciplina Front-End para Web · UNICID – Universidade Cidade de São Paulo · 2026 · Prof. Paulo Sérgio Fratta.
Equipe **Promptdão**: Alexandre Almeida de Jesus Nogueira, Khevyn Lopes dos Santos, Luis Plinio Cornélio Mota, Marcos Paulo Cornélio Mota e Yuri Navas Moreira.
Projeto acadêmico. Nenhum dado factual foi inventado: o que ainda falta está marcado no site como “A complementar” ou “[a preencher]”.

## 1. Nome do projeto

EcoVerde

## 2. Visão geral

Portal web educativo que une três pilares: **sustentabilidade** (reciclagem e uso racional da água e da energia), **energia limpa** (com estudo de caso da Usina Binacional de Itaipu) e **inclusão social** (causa Setembro Verde e acessibilidade digital). A mensagem central é que o desenvolvimento sustentável é indissociável da responsabilidade social e da inclusão plena.

As 10 páginas, a folha `css/style.css`, o `js/script.js`, os formulários validados e a pasta `/docs` já existem. Falta preencher os conteúdos oficiais marcados como pendentes e publicar o site.

## 3. Problema que o produto resolve

A crise climática e o impacto ambiental do descarte inadequado de resíduos exigem conscientização e a transição para fontes de energia limpa e renovável. Ao mesmo tempo, Pessoas com Deficiência (PCD) enfrentam barreiras de acessibilidade digital e exclusão social. O EcoVerde reúne educação ambiental e inclusão em um portal que é, ele próprio, leve e acessível.

## 4. Público-alvo

- Estudantes, educadores, ativistas ambientais e cidadãos interessados em reciclagem, sustentabilidade e energias limpas.
- Livre para todas as idades, com foco em jovens e adultos no Brasil.
- **Público prioritário:** pessoas com deficiência visual, motora, auditiva e cognitiva. O site precisa funcionar com teclado, leitores de tela, alto contraste e texto ampliado.

## 5. Objetivos

- Desenvolver 10 páginas HTML5 interligadas e navegáveis, sem erros no W3C Validator.
- Garantir acessibilidade prioritária (WCAG/ARIA): teclado, leitores de tela e contraste adequado.
- Oferecer um formulário de doação para o Setembro Verde, com validação HTML5 nativa.
- Apresentar um estudo de caso educativo sobre a Usina de Itaipu e seu impacto socioambiental e energético.
- Comparar 3 fornecedores de hospedagem verde e 3 opções de registro de domínio.

## 6. Funcionalidades principais

Dez páginas, todas com o mesmo cabeçalho, menu, barra de acessibilidade e rodapé:

| Página | Arquivo | Função |
| --- | --- | --- |
| Início | `index.html` | Hero, três pilares, carrossel acessível, dicas e chamada para o Setembro Verde |
| Sobre | `sobre.html` | História, cronograma, missão, visão, valores e público-alvo |
| Itaipu | `itaipu.html` | Artigo educativo: geração renovável, energia limpa, ecossistemas e impactos |
| Setembro Verde | `doacao.html` | Apresentação da causa e formulário de doação validado |
| Acessibilidade | `acessibilidade.html` | Compromisso, teclas de atalho e navegação por teclado |
| Galeria | `galeria.html` | Imagens com `figure`, `figcaption`, fonte e texto alternativo |
| Mídia | `midia.html` | `<video>` com legendas, `<audio>` com transcrição e mapa em `<iframe>` |
| Notícias | `noticias.html` | Cards por categoria (conteúdo demonstrativo) |
| Contato | `contato.html` | Formulário validado e cards da equipe |
| Orçamento | `orcamento_hospedagem.html` | Tabelas comparativas de hospedagem verde e domínio |

Recursos globais:

- **Skip link** “Pular para o conteúdo principal”.
- **Teclas de atalho** no padrão eMAG: 1 conteúdo, 2 menu, 3 rodapé, 4 acessibilidade.
- **Alto contraste** e **ajuste do tamanho do texto**, salvos no navegador.
- **Menu responsivo** com `aria-expanded` e página atual marcada com `aria-current="page"`.

Os formulários validam os dados mas **não enviam nada**: sem backend, o envio é interrompido e uma confirmação é exibida. Nenhum pagamento é processado.

## 7. Requisitos técnicos

- HTML5 e CSS3 puros, sem framework de CSS ou de interface.
- JavaScript nativo apenas onde necessário: menu mobile, carrossel, controles de acessibilidade e mensagens de erro dos formulários.
- Um único arquivo de estilo: `css/style.css`, mobile-first, com variáveis CSS (design tokens).
- Site estático: roda abrindo o `index.html` ou com um servidor local (recomendado, para as legendas do vídeo):

```bash
python -m http.server 8000
# ou
npx serve .
```

- Versionamento no Git / GitHub.

## 8. Requisitos não funcionais

- WCAG nível AA: contraste, foco visível, rótulos e textos alternativos.
- Navegação completa por teclado, com skip link.
- Responsivo: ajustes a partir de 600px, 900px e 1100px.
- `prefers-reduced-motion: reduce` respeitado; carrossel sem rotação automática por padrão.
- Sustentabilidade digital: ilustrações em SVG, pôster em WebP, sem fontes externas e sem bibliotecas.
- `lang="pt-BR"`, `<title>` exclusivo e `meta description` em todas as páginas.
- Fontes indicadas sempre que houver dados reais (Itaipu Binacional, IBGE, Unsplash, Pexels).

Paleta obrigatória:

| Cor | Hex | Uso |
| --- | --- | --- |
| Verde Folha | `#2E7D32` | Sustentabilidade e reciclagem |
| Azul Hidro | `#0288D1` | Itaipu e recursos hídricos (decorativo; textos usam `#01579B`) |
| Setembro Verde | `#7CB342` | Inclusão e acessibilidade (sempre com texto escuro) |
| Fundo Claro | `#F5F5F5` | Fundo das páginas |
| Texto Escuro | `#212121` | Texto principal |

## 9. Estrutura de pastas

```
EcoVerde/
├── index.html                 # as 10 páginas HTML na raiz
├── sobre.html
├── itaipu.html
├── doacao.html
├── acessibilidade.html
├── galeria.html
├── midia.html
├── noticias.html
├── contato.html
├── orcamento_hospedagem.html
├── README.md                  # este plano de contexto
├── css/style.css
├── js/script.js
├── assets/
│   ├── images/                # ilustrações SVG e pôster WebP
│   ├── icons/                 # logo e ícones SVG
│   └── media/                 # vídeo MP4, legendas VTT e áudio MP3
└── docs/
    ├── README.md
    ├── diario-de-bordo.md
    ├── orcamento-hospedagem.md
    └── evidencias-testes.md
```

Responsabilidades:

- **Interface:** HTML semântico e CSS em `style.css`. Sem estilo inline.
- **Comportamento:** JavaScript em `js/script.js`, progressivo (a página funciona sem ele).
- **Integração:** formulários prontos para receber o atributo `action` quando houver backend.

## 10. Pendências

- Dados oficiais da Usina de Itaipu e URLs das fontes.
- Histórico oficial do Setembro Verde e destino das doações.
- Notícias reais, com data e fonte.
- Fornecedores e preços de hospedagem e domínio.
- Vídeo e episódios oficiais do podcast (os atuais são demonstrativos).
- Canais oficiais de contato da equipe.
- Link do site publicado.

## 11. Critérios de sucesso

- As 10 páginas interligadas, com o mesmo cabeçalho, menu e rodapé.
- Zero erros no validador de HTML do W3C.
- Formulários com validação HTML5 nativa (`required`, `email`, `tel` etc.) e erro mostrado junto ao campo.
- Vídeo, áudio e iframe funcionando.
- Atributos `alt`, contraste adequado e `lang="pt-BR"` em todas as páginas.
- Pasta `/docs` com README, Diário de Bordo, Orçamento de Hospedagem e Evidências de Teste.
