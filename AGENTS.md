# AGENTS.md – EcoVerde

Instruções para qualquer agente de IA (Cursor, Claude Code, Copilot) que trabalhe neste repositório.

- **Plano do projeto:** leia `docs/plano-contexto.md` antes de tarefas grandes.
- **Regras detalhadas:** `.cursor/rules/` — `html-semantico.mdc`, `css-estilo.mdc`, `acessibilidade.mdc`, `git-commits.mdc`.
- **Stack:** HTML5 + CSS3 + JS nativo em `public/`; Node.js + Express em `server.js`. Sem frameworks.
- **Idioma:** português do Brasil no código, nos textos e nos commits.
- **Acessibilidade primeiro:** WCAG 2.1 AA, teclado, leitor de tela, contraste.
- **Git:** uma branch por tarefa, commits `tipo: descrição`, PR com revisão humana. Nunca fazer merge sozinho.
- **Segredos:** nenhuma chave ou token no código. Use `.env` (fora do Git) e as Variables do Railway.
- **Dados:** não invente dados factuais nem use dados pessoais reais. Na dúvida, pergunte.

Testar localmente:

```bash
npm install
npm start   # http://localhost:3000
```
