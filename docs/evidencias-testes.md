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
| index.html | | | | ⏳ | |
| sobre.html | | | | ⏳ | |
| itaipu.html | | | | ⏳ | |
| doacao.html | | | | ⏳ | |
| acessibilidade.html | | | | ⏳ | |
| galeria.html | | | | ⏳ | |
| midia.html | | | | ⏳ | |
| noticias.html | | | | ⏳ | |
| contato.html | | | | ⏳ | |
| orcamento_hospedagem.html | | | | ⏳ | |
| css/style.css (W3C CSS Validator) | | | | ⏳ | |

## 2. Testes de acessibilidade

### 2.1 WAVE (https://wave.webaim.org/ ou extensão do navegador)

| Página | Erros | Alertas de contraste | Alertas | Status | Evidência |
|---|---|---|---|---|---|
| index.html | | | | ⏳ | |
| sobre.html | | | | ⏳ | |
| itaipu.html | | | | ⏳ | |
| doacao.html | | | | ⏳ | |
| acessibilidade.html | | | | ⏳ | |
| galeria.html | | | | ⏳ | |
| midia.html | | | | ⏳ | |
| noticias.html | | | | ⏳ | |
| contato.html | | | | ⏳ | |
| orcamento_hospedagem.html | | | | ⏳ | |

### 2.2 Checklist manual

| Item | Como testar | Status | Observações |
|---|---|---|---|
| Navegação somente por teclado | Percorrer cada página só com `Tab`, `Shift+Tab`, `Enter`, `Espaço`, setas | ⏳ | |
| Foco visível | Conferir o contorno amarelo em todos os elementos | ⏳ | |
| Ordem lógica de tabulação | A ordem do foco segue a ordem visual | ⏳ | |
| Teclas de atalho 1–4 | Testar no Chrome/Edge (`Alt`), Firefox (`Alt+Shift`), macOS (`Ctrl+Option`) | ⏳ | |
| Leitor de tela (NVDA/VoiceOver) | Ler títulos, regiões, imagens, formulários e carrossel | ⏳ | |
| Textos alternativos | Conferir se cada `alt` descreve a imagem | ⏳ | |
| Labels dos formulários | Cada campo anuncia seu rótulo e instruções | ⏳ | |
| Mensagens de erro | Erros anunciados e explicam como corrigir | ⏳ | |
| Headings | Lista de títulos do leitor de tela faz sentido | ⏳ | |
| Links e botões | Textos de link compreensíveis fora de contexto | ⏳ | |
| ARIA | `aria-current`, `aria-expanded`, `aria-pressed` atualizam corretamente | ⏳ | |
| Contraste | Conferir com WAVE ou Colour Contrast Analyser | ⏳ | |
| Alto contraste e tamanho de texto | Ativar os controles da barra superior | ⏳ | |
| `lang="pt-BR"` | Leitor de tela pronuncia em português | ⏳ | |
| Movimento reduzido | Ativar “reduzir movimento” no sistema e conferir que não há animações | ⏳ | |

## 3. Testes de responsividade

| Dispositivo / largura | Navegador | Menu | Layout | Imagens | Tabelas | Status |
|---|---|---|---|---|---|---|
| Smartphone (360–414 px) | | | | | | ⏳ |
| Tablet (768–1024 px) | | | | | | ⏳ |
| Desktop (1280 px ou mais) | | | | | | ⏳ |
| Zoom do navegador em 200% | | | | | | ⏳ |

## 4. Testes dos formulários

| Formulário | Cenário | Esperado | Status |
|---|---|---|---|
| Doação | Enviar vazio | Bloqueia e mostra erros | ⏳ |
| Doação | E-mail sem “@” | Erro de e-mail | ⏳ |
| Doação | “Outro valor” sem valor | Erro no campo de valor | ⏳ |
| Doação | Tudo válido | Mensagem de confirmação | ⏳ |
| Contato | Enviar vazio | Bloqueia e mostra erros | ⏳ |
| Contato | Telefone sem DDD | Erro de formato | ⏳ |
| Contato | Mensagem com menos de 10 caracteres | Erro de tamanho | ⏳ |
| Contato | Tudo válido | Mensagem de confirmação | ⏳ |
| Ambos | Botão “Limpar formulário” | Campos e erros limpos | ⏳ |

## 5. Testes multimídia

| Recurso | Cenário | Esperado | Status |
|---|---|---|---|
| Vídeo | Reproduzir/pausar pelo teclado | Controles funcionam | ⏳ |
| Vídeo | Pôster exibido antes do play | Imagem WebP aparece | ⏳ |
| Vídeo | Legendas (servidor local) | Legendas em português sincronizadas | ⏳ |
| Vídeo | Transcrição | Abre e fecha pelo teclado | ⏳ |
| Áudio | Reproduzir/pausar pelo teclado | Controles funcionam | ⏳ |
| Áudio | Transcrição | Abre e fecha pelo teclado | ⏳ |
| iframe | Mapa carrega | Mapa do OpenStreetMap exibido | ⏳ |
| iframe | Leitor de tela | Anuncia o `title` do iframe | ⏳ |
| Geral | Sem reprodução automática | Nada toca sozinho | ⏳ |
