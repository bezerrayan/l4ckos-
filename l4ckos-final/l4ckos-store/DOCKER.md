# Docker

## Arquivos

- `server/Dockerfile`: builda e publica o backend Node.js em modo produção.
- `client/Dockerfile`: builda o frontend com Vite e serve com nginx.
- `client/nginx.conf`: serve a SPA e faz proxy de `/api`, `/uploads` e `/webhook` para o backend.
- `docker-compose.yml`: sobe backend e frontend com rede compartilhada, `env_file` e volumes persistentes.
- `.env.backend`: variáveis privadas do backend e conexão com MySQL do Railway.
- `.env.frontend`: variáveis públicas usadas no build do frontend.
- `.dockerignore`: reduz o contexto de build e evita enviar artefatos e segredos desnecessários.

## Subir com Docker Compose

1. Revise `DATABASE_URL`, `JWT_SECRET` e demais segredos em `.env.backend`.
2. Revise `FRONTEND_URL`, `APP_URL`, `APP_BASE_URL`, `CORS_ORIGINS` e `GOOGLE_REDIRECT_URI` em `.env.backend`.
3. Rode:

```bash
docker compose up --build -d
```

4. Acesse:

```text
Frontend: http://localhost:8080
Backend:  http://localhost:3010
Health:   http://localhost:3010/health
```

## Comandos úteis

```bash
# desenvolvimento local sem Docker
pnpm install
pnpm dev

# checagem de tipos
pnpm check

# build local de produção
pnpm build

# subir containers em foreground
docker compose up --build

# derrubar containers
docker compose down

# ver logs
docker compose logs -f
```

## Observações

- O MySQL do Railway continua externo. O backend só precisa de `DATABASE_URL` válida.
- O frontend usa `VITE_API_URL=/`, então o navegador conversa com o nginx e o nginx repassa para `backend:3010`.
- Os diretórios `/app/uploads` e `/app/backups` ficam persistidos em volumes nomeados do Compose.
- O `docker-compose.yml` foi mantido focado em preview/produção local. Para desenvolvimento do dia a dia, o fluxo recomendado continua sendo `pnpm dev`.
