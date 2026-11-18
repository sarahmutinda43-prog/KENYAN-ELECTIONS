# Kenya Elections Demo

This project is configured for Cloudflare Workers with static asset hosting and API routes. D1 is optional; without a configured D1 binding, the prototype uses demo fallbacks and does not persist API submissions across Worker instances.

## Fictional county results demo

Open [`county-results.html`](./county-results.html) for the supplied 47-county sample summary, searchable status filters, and expandable candidate breakdowns.

**Important:** Every name, party, vote count, percentage, turnout figure, status, and verification note on that page is fictional demonstration data. It is not official IEBC information, an election result, or a prediction. Do not present or redistribute it as real results.

## Local development

Requires Node.js 22.12.0 or later.

```bash
npm install
npm run dev
```

## Cloudflare setup

1. Sign in to Cloudflare:

```bash
npx wrangler login
```

2. If you want persistent API storage, create a D1 database:

```bash
npm run db:create
```

Add the ID printed by Wrangler to `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "kenya-elections-db"
database_id = "YOUR_CREATED_DATABASE_ID"
```

3. Apply the schema to the remote database:

```bash
npm run db:migrate
```

4. Add runtime secrets if you want to replace the demo credentials:

```bash
npx wrangler secret put ADMIN_EMAIL
npx wrangler secret put ADMIN_PASSWORD
```

## Deploy

```bash
npm run deploy
```

The Worker name is `kenyan-elections`, with `workers.dev` enabled. If your Cloudflare account's `workers.dev` subdomain is `sarahmutinda43`, the deployment URL will be `https://kenyan-elections.sarahmutinda43.workers.dev`. Wrangler must be logged into that account, and the account must have its `workers.dev` subdomain enabled.

## API endpoints

- `GET /api/health` — basic health check
- `POST /api/auth` — simulate the demo login; not production authentication
- `GET /api/results` — read results from D1, or demo data fallback
- `POST /api/submissions` — receive a record; saves to D1 only when configured
- `GET /api/state` — read saved app state from D1, or the in-memory demo fallback
- `POST /api/state` — update app state; durable only when D1 is configured

## Frontend usage

Add this before the application logic:

```html
<script src="/api-client.js"></script>
```

Then call the API via `window.KEAPI`.
