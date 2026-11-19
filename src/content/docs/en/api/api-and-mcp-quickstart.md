---
title: "Tonbab API and MCP AI Connector Quickstart"
description: "Connect Tonbab to Claude, ChatGPT or Gemini CLI via MCP (59 tools, several companies in one connection), or your systems via REST API: keys, permissions, webhooks and limits."
section: api
order: 1
updated: 2026-11-19
---

Tonbab connects in two ways. The **AI connector (MCP)** lets assistants like Claude or ChatGPT read your company's data and create draft documents. The **REST API** is for your own systems and scripts. Every plan can use them; the Free plan is read-only.

The full API reference is at [api.tonbab.com/docs](https://api.tonbab.com/docs).

## The settings page

Go to **Settings** › **API & connectors**. It has **Overview**, **API keys**, **Connected apps**, **Webhooks** and **Logs** tabs. Only admins can change API settings.

Under **Company switches** are **Allow API access** and **Allow AI connectors (MCP)**. Turning one off stops every key or connector for the company immediately.

## Connect Claude or ChatGPT via MCP

The connector URL is `https://api.tonbab.com/mcp`.

1. In Claude, go to Settings › Connectors › Add custom connector. In ChatGPT, turn on developer mode (Settings › Apps & Connectors › Advanced), then create a connector with OAuth.
2. Paste the URL and connect.
3. Sign in to Tonbab and pick the **Company** (your default). Under **Also allow these companies**, tick any other companies it may use, or leave them all unticked for one company. Choose permissions and allow access.

Each connection acts as the person who connected it, within their role's permissions. See and disconnect connections on the **Connected apps** tab.

### What the assistant can reach

59 tools: 54 that read and 5 that create drafts. An area only shows up if the module is on and your role can open it.

- **Accounting**: sales summary, receivables and payables aging, profit and loss, trial balance, invoices, bills, quotations, receipts and payments, chart of accounts, bank accounts (last 4 digits only), fixed assets
- **Products and stock**: products, stock levels, warehouses, movements, lots, serials, stock valuation (only if you can see costs)
- **Purchasing**: purchase requests, purchase orders, goods receipts
- **Sales**: sales orders, delivery notes
- **Customers, vendors and CRM**: companies, contacts, deals and activities (deals follow your reporting line, as in the app)
- **People**: employee directory (contact details only), my leave balance, leave requests, expense claims
- **Manufacturing and service**: work orders, job controls, BOMs, service jobs, the service schedule
- **Docs**: search pages, read a page, database rows
- **Drafts**: purchase request, stock count, customer/vendor, CRM deal, CRM activity

Salary, payroll, ID numbers and commission are never available.

### Several companies

If you belong to more than one company, one connection can cover the companies you tick at sign-in, and no others.

- In each company, the assistant sees only what **your role in that company** allows. Being an admin in one company gives nothing in another.
- Every call is checked again in that company.
- Ask "which companies can you see?" and the assistant calls `list_my_companies`.
- Summaries (sales, receivables, payables, profit and loss, stock value) can cover all your companies at once. The answer comes back one company at a time and is never added together.

API keys always belong to one company.

Connecting an assistant doesn't use your AI credits: the assistant runs on your own Claude, ChatGPT or Gemini account, and each data call counts toward the API limits below.

### Notes per assistant

- **Claude** (claude.ai, desktop and mobile): on Claude Team or Enterprise, an organization owner adds the custom connector first, then members click **Connect**. Claude's free plan allows one custom connector.
- **ChatGPT**: custom MCP connectors need developer mode, which a workspace admin turns on. OpenAI currently offers this on Business, Enterprise and Edu workspaces. ChatGPT signs in with OAuth only; API keys don't work there.
- **Gemini CLI**: add Tonbab to `~/.gemini/settings.json`, then run `/mcp auth tonbab` inside `gemini` to sign in:

  ```json
  { "mcpServers": { "tonbab": { "httpUrl": "https://api.tonbab.com/mcp" } } }
  ```

- **Claude Code**: run `claude mcp add --transport http tonbab https://api.tonbab.com/mcp`, then `/mcp` to sign in.

Other apps that let you add a remote MCP server by URL with OAuth sign-in connect the same way. For an unattended script, send a company API key as an `Authorization: Bearer` header instead.

## Create a REST API key

1. On the **API keys** tab, click **New API key**.
2. Give it a **Name**, such as "Shopify sync".
3. Choose the **Mode**:
   - **Live**
   - **Test**: reads real data, but writes are only checked, never saved. Safe for building an integration.
4. Choose **Read** and/or **Create drafts**. You can only give a key permissions you have yourself. The key acts as you: if your permissions change later, the key's do too, and it stops working if you leave the company.
5. Set **Expires** and optional **Allowed IPs** (up to 20).
6. Click **Create key** and copy it right away. It won't be shown again.

Call the API at `https://api.tonbab.com/v1`, sending the key as a Bearer token:

```
Authorization: Bearer <your key>
```

## Writes are drafts only

Anything created through the API or AI is a **draft only**. A person still submits, approves and posts in Tonbab, so an AI or outside system can never approve or post on someone's behalf.

## Webhooks

1. On the **Webhooks** tab, click **Add webhook**.
2. Enter the **Endpoint URL (https)**. It must be a public URL.
3. Choose events, or **All events**.
4. Click **Send test** to check it's received.

Each delivery is signed with the `Tonbab-Signature` header (HMAC-SHA256); verify it with that webhook's signing secret. Failed deliveries retry for about 3 days. See **Recent deliveries** and click **Redeliver** if needed.

## Limits per plan

| Plan | Keys | Webhooks | Per minute (per key/app) | Per day (whole company) | Create drafts |
|---|---|---|---|---|---|
| Free | 1 | 1 | 10 | 300 | No |
| Starter | 2 | 1 | 30 | 3,000 | Yes |
| Standard | 3 | 2 | 60 | 10,000 | Yes |
| Business | 5 | 3 | 60 | 20,000 | Yes |
| Enterprise | Unlimited | 20 | 600 | 500,000 | Yes |

API keys and AI connectors share the daily allowance. It resets at 07:00 Bangkok time (00:00 UTC).

## Check usage

The **Logs** tab shows the last 200 API and connector calls with status, time and request ID, useful for debugging an integration.

## Security

- **Revoke** keys you no longer use. Anything using that key stops working immediately.
- Restrict IPs for keys used from servers.
- Use **Test** mode keys while developing.
