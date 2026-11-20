---
title: "Tonbab API and MCP AI Connector Quickstart"
description: "Connect Tonbab to Claude, ChatGPT or Gemini CLI via MCP (93 tools, several companies in one connection), or your systems via REST API: keys, permissions, webhooks and limits."
section: api
order: 1
updated: 2026-11-20
---

Tonbab connects in two ways. The **AI connector (MCP)** lets assistants like Claude or ChatGPT read your company's data and prepare drafts and requests for a person to approve. The **REST API** is for your own systems and scripts. Every plan can use them; the Free plan is read-only.

The full API reference is at [api.tonbab.com/docs](https://api.tonbab.com/docs).

## The settings page

Go to **Settings** › **API & connectors**. It has **Overview**, **API keys**, **Connected apps**, **Webhooks** and **Logs** tabs. Only admins can change API settings.

Under **Company switches** are **Allow API access** and **Allow AI connectors (MCP)**. Turning one off stops every key or connector for the company immediately.

## Connect from the Claude Connectors Directory

Tonbab is being listed in Claude's connector directory, so in Claude you can search for **Tonbab** instead of pasting a URL. Until the listing appears, add it as a custom connector (next section); it works the same way.

1. In Claude, go to **Settings** › **Connectors** and search for **Tonbab** (or choose **Add custom connector** with the URL `https://api.tonbab.com/mcp`).
2. Click **Connect**.
3. Sign in to Tonbab.
4. Pick your default company, tick any other companies Claude may use, choose what it may read and whether it may create drafts, then allow.
5. Done: ask Claude a question, such as "Which customers are more than 30 days overdue?"

On Claude Team or Enterprise, an organization owner adds Tonbab for the organization first; then each member clicks **Connect** and signs in with their own Tonbab account.

Claude acts as you, with your Tonbab role and permissions, only in the companies you ticked. Anything it creates is a draft or a request that a person confirms or approves in Tonbab. Disconnect any time on the **Connected apps** tab. Setup steps and example questions per module: [Connect Tonbab to Claude](/en/connect/claude).

## Connect Claude or ChatGPT via MCP

The connector URL is `https://api.tonbab.com/mcp`.

1. In Claude, go to Settings › Connectors › Add custom connector. In ChatGPT, turn on developer mode (Settings › Apps & Connectors › Advanced), then create a connector with OAuth.
2. Paste the URL and connect.
3. Sign in to Tonbab and pick the **Company** (your default). Under **Also allow these companies**, tick any other companies it may use, or leave them all unticked for one company. Choose permissions and allow access.

Each connection acts as the person who connected it, within their role's permissions. See and disconnect connections on the **Connected apps** tab.

### What the assistant can reach

93 tools: 66 that read, 11 that create drafts, requests or CRM updates, and 16 that bring your history over from your previous system. An area only shows up if the module is on and your role can open it.

- **Accounting**: sales summary, receivables and payables aging, profit and loss, trial balance, invoices, bills, quotations, receipts and payments, chart of accounts, bank accounts (last 4 digits only), fixed assets, VAT codes and the usual withholding-tax rates
- **Products and stock**: products, units of measure, stock levels, warehouses, movements, lots, serials, stock valuation (only if you can see costs)
- **Purchasing**: purchase requests, purchase orders, goods receipts
- **Sales**: sales orders, delivery notes
- **Customers, vendors and CRM**: companies, contacts, leads, deals, pipelines and stages, activities, and the pipeline report: open value, forecast, win rate and lost reasons (deals and leads follow your reporting line, as in the app)
- **People**: employee directory (contact details only), my leave balance, leave requests, expense claims
- **Manufacturing and service**: work orders, job controls with budget and cost (cost only if you can see costs), BOMs, service jobs, the service schedule
- **Docs**: search pages, read a page, database rows
- **Approvals inbox**: what's waiting for your approval (purchase requests, expense claims, leave, overtime and more), how long the oldest has waited, and a link to decide it in Tonbab
- **Lookups**: company members (so the assistant can name people), CRM pipelines and stages, units of measure, VAT and withholding-tax rates
- **Moving from your previous system**: contacts, products, opening balances, the ledger, documents, payments, withholding tax, fixed assets and purchase history, inside a migration job a person opens, with dry runs and a reconciliation before anyone signs off
- **What it can create**: draft purchase requests, stock counts and expense claims; leave requests for yourself, which your approver decides; customer and vendor records, CRM leads, deals, activities and work updates; and moving a deal you're responsible for to another stage, or closing it as won or lost

**Safe retries.** Every tool that writes accepts a `client_request_id`. If a connection drops and the assistant sends the same request again within 24 hours, Tonbab returns the first result instead of creating a second record.

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

## Writes are drafts and requests

Anything created through the API or AI is a **draft**, a **request** waiting for its usual approval, or an update to your own CRM work (a lead, a work update, a deal's stage). A person still submits, approves, posts and pays in Tonbab, so an AI or outside system can never approve, post or pay on someone's behalf.

Retries are safe: REST calls take an `Idempotency-Key` header and AI connector writes take a `client_request_id`, so the same request sent twice is saved once.

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
