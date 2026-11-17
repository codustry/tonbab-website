---
title: "Connect Shopee and Lazada: Automatic Order Sync"
description: "Connect Shopee and Lazada shops to Tonbab, sync orders automatically, reserve stock and notify the marketplace when you ship."
section: commerce
order: 3
updated: 2026-11-17
---

Tonbab pulls orders from Shopee and Lazada in automatically, next to your shop orders. Paid orders reserve stock in the warehouse you choose, and when you ship in Tonbab, it tells the marketplace too.

## Channel status

| Channel | Status |
|---|---|
| Shopee order sync and ship notification | Live |
| Lazada order sync and ship notification | Live |
| Stock push-back to Shopee / Lazada | In development |
| TikTok Shop | Coming soon |
| LINE Shopping | Coming soon |
| LINE OA, Messenger and Instagram chat | Live, see [Chat inbox](/en/docs/commerce/chat-inbox) |
| Shopee / Lazada chat | Not available |

Until stock push-back is available, keep updating stock quantities in your Shopee and Lazada seller centres as you do today.

## Which plan includes channels

All sales channels are included in Enterprise. On Business, you can add them for ฿3,600 a year (covering every channel). See [Plans and billing](/en/docs/getting-started/plans-and-billing).

## Connect a Shopee or Lazada shop

1. Go to **Commerce** › **Commerce Settings** › **Channels** and choose **Marketplace**.
2. Click **Add a shop**.
3. Pick the platform, name the shop and choose **Fulfil from warehouse** (where stock is reserved and issued).
4. Tick **Enable this shop** and click **Save shop**.
5. Authorize the shop on the Shopee or Lazada page (sign in with your seller account). When done, the status changes to **Connected**.

Leave **Advanced — use my own developer app** closed unless you have your own developer app.

## Order sync

Tonbab pulls new orders on a schedule automatically. To pull right away, click **Sync now**.

Marketplace statuses map to Tonbab like this:

| Marketplace status | Tonbab status |
|---|---|
| Unpaid / pending | Pending |
| Ready to ship / shipped / delivered / completed | Paid (enters fulfilment and reserves stock) |
| Cancelled / returned / refunded | Cancelled |

## Ship and notify

Ship marketplace orders on the [Orders](/en/docs/commerce/orders-and-customers) page like any other order. When you click **Mark shipped**:

- Tonbab issues the stock from the linked warehouse.
- It tells Shopee or Lazada the order has shipped (Lazada assigns the tracking number).
- On success you see **The marketplace was notified**. If it fails, a message asks you to check the connection.

## Other channels

- **LINE OA and Meta (Facebook, Instagram)** connect for customer chat. See [Chat inbox](/en/docs/commerce/chat-inbox).
- **In-store** sales go through [POS](/en/docs/commerce/pos).
