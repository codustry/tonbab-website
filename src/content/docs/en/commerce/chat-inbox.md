---
title: "Unified Chat Inbox: LINE OA, Messenger and Instagram"
description: "Connect LINE OA, Facebook Messenger and Instagram to one Tonbab inbox, assign chats, link them to customers and see delivery status."
section: commerce
order: 4
updated: 2026-11-17
---

The **Chat** menu in Commerce brings messages from LINE OA, Facebook Messenger and Instagram into one inbox. Your team can reply from Tonbab, assign chats to each other, and link conversations to customer records to see purchase history.

## Supported channels

| Channel | Status |
|---|---|
| LINE Official Account | Live |
| Facebook Messenger | Live |
| Instagram Direct | Live |
| Shopee / Lazada chat | Not available |

Sales channels and chat are included in Enterprise, or available as an add-on on Business. See [Plans and billing](/en/docs/getting-started/plans-and-billing).

## Connect LINE OA

1. Go to **Commerce Settings** › **Channels** and choose **LINE Official Account**.
2. Click **Add account**.
3. Enter a label, pick a brand, and add details from the LINE Developers Console:
   - **Channel secret** from the Basic settings tab
   - **Channel access token** from the Messaging API tab
   - **Bot user ID** (needed if you have more than one LINE OA)
4. Tick **Enable this account** and click **Save account**.
5. Copy the **Webhook URL** Tonbab shows into the LINE Developers Console.

## Connect Facebook and Instagram

1. Under **Channels**, choose **Meta (Facebook & Instagram)** and click **Add a page**.
2. Enter the **Facebook Page ID**, **Instagram account ID** (optional), **Page access token** and **App secret**.
3. Choose your own **Webhook verify token**, then click **Save connection**.
4. In your Meta app, enter the **Webhook Callback URL** Tonbab shows and the same verify token.

## Chats always start with the customer

A conversation appears when a customer messages you first. Staff can't start a new chat, because each platform forbids it. For example, Meta only allows replies within 24 hours of the customer's last message, and LINE needs prior contact.

## Working the inbox

- Filters: **All**, **Assigned to me**, and by brand.
- Conversation status: Open, Pending, Snoozed and Closed.
- **Link to customer** connects the chat to a customer record.
- **Answered in LINE app** marks a chat you answered directly in the LINE OA app, because messages typed there don't sync back.

## Delivery status

Every reply shows its status:

- **Delivered**: the platform accepted the message.
- **Not delivered**: for example, outside Meta's reply window.
- For a channel that doesn't support replies, Tonbab doesn't send and tells you so.

## Customer details from chat

Once a chat is linked, the customer's insights and order history are on the [Customers](/en/docs/commerce/orders-and-customers) page.
