# Publicação no Railway – EcoVerde

Guia para colocar o site e o EcoBot no ar. O EcoBot responde por FAQ local, então **nenhuma chave de API é necessária**.

## 1. Antes: merge dos pull requests (nesta ordem)

| Ordem | Branch | Conteúdo |
|---|---|---|
| 1 | `docs/plano-contexto` | `docs/plano-contexto.md` |
| 2 | `chore/regras-ia` | `.cursor/rules/*.mdc` e `AGENTS.md` |
| 3 | `chore/mcp-config` | `.cursor/mcp.json`, `.gitignore`, `.env.example` |
| 4 | `feat/servidor-ecobot` | site em `public/`, `server.js`, EcoBot, testes |
| 5 | `docs/diario-aula-06` | diário de bordo, este guia, evidências |

> O PR 4 foi criado a partir do 3; depois que o 3 entrar na `main`, o PR 4 passa a mostrar só as próprias mudanças.

## 2. Testar localmente

```bash
npm install
npm test      # 12 testes do EcoBot devem passar
npm start     # abrir http://localhost:3000
```

Conferir: as 10 páginas abrem, o botão **EcoBot** aparece no canto e responde "O que é a Usina de Itaipu?".

## 3. Publicar

1. **Conta:** entrar em [railway.com](https://railway.com) com a conta do GitHub.
2. **Novo projeto:** *New Project → Deploy from GitHub repo* → escolher `U-UNICID-CC-FRONTEND-2260022-N7-2-2026-NT-ECOVERDE`.
   O Railway detecta o `package.json` e roda `npm start` sozinho.
3. **Variables:** nenhuma é obrigatória. A porta (`PORT`) é definida pelo próprio Railway.
4. **Domínio:** *Settings → Networking → Generate Domain*. Copiar a URL gerada.
5. **Logs:** aba *Deployments* → acompanhar o build. A linha `EcoVerde no ar em ...` indica sucesso.
6. **Health check (opcional):** *Settings → Deploy → Healthcheck Path* = `/api/saude`.

A partir daí, **cada merge na `main` gera um deploy automático**.

## 4. Depois de publicar

- Colocar a URL na primeira linha do `README.md` e do `docs/README.md` ("Link do EcoVerde na hospedagem").
- Testar a URL pública no celular e no computador.
- Registrar em `docs/evidencias-testes.md` (seção EcoBot e deploy).

## 5. MCP do Railway no Cursor (opcional)

```bash
npm install -g @railway/cli
railway login
railway link     # dentro da pasta do projeto
```

Depois, no Cursor, ativar o servidor `railway` em *Settings → MCP*. Exemplo de prompt:
"Pelo MCP do Railway, mostre os serviços do projeto EcoVerde e o status do último deploy. Não faça redeploy sem me perguntar."

## 6. Segurança

- `.env` nunca vai para o Git (já está no `.gitignore`).
- Tokens do MCP (`GITHUB_PAT`, `FIGMA_API_KEY`) ficam nas variáveis de ambiente do computador de quem usa o Cursor, com permissões mínimas.
- Se uma chave for publicada por engano: revogar e gerar outra imediatamente.
