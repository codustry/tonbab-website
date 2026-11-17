---
title: "POS: Shop Setup, Devices, Payments and Receipts"
description: "Set up Tonbab POS: which products to sell, devices and staff PINs, PromptPay, card via Beam or cash, receipt printers, refunds and the end-of-day report."
section: commerce
order: 1
updated: 2026-11-17
---

Tonbab POS is a point-of-sale app for tablets, phones and Sunmi devices. Each sale takes stock out of the shop's warehouse straight away. You can take payment with your shop's own PromptPay QR, card and QR through Beam, or record cash.

## Set up before you sell

POS settings are under **Commerce** › **Commerce Settings** › **POS**, which has these tabs:

| Tab | What it's for |
|---|---|
| POS Catalog | Choose which products show on the till (**Show on POS** / **Hide from POS**). If you choose none, every sellable product shows. |
| Shop menus | Menu, prices, logo, PromptPay and queue prefix per shop (for several brands) |
| Restaurant & Café | Dining options, service charge, queue numbers, auto-cancel of unpaid orders |
| Item options | Size, sweetness, toppings and recipes |
| Printers | Receipt and order-ticket printers |
| Kiosk Devices | Pair tablets with a shop and warehouse |
| POS Operators | Staff PINs and refund approvers |

Pairing devices and creating PINs are covered in [Install the app and kiosk mode](/en/docs/getting-started/install-app). PIN operators don't count as users on your plan.

## Set up payments

Go to **Commerce Settings** › **Payments** and choose your **Accepted payment methods**:

- **PromptPay (shop QR)**, with no fee. Enter a **PromptPay number** (mobile, 13-digit ID or e-wallet) or **Upload QR image**. You can **Require a slip photo** and set **Who can confirm without a slip**.
- **Check slips automatically** (Starter and up). A slip is refused if it's less than the total, paid a different PromptPay, is older than 24 hours, or was used before.
- **Beam Checkout** for credit/debit cards and PromptPay through Beam. Enter the Merchant ID, Secret API key and Webhook signing secret, then add the webhook URL Tonbab shows to your Beam account.
- **Cash** and **Manual payment** for cash or a separate card terminal.

## Make a sale

1. Open the POS app and sign in with your PIN.
2. Search or tap products. They build up in the **Ticket**.
3. Add a **Line discount** or **Order discount**, and a **Dining option** if used.
4. Tap **Charge** and choose how the customer pays:
   - **PromptPay (shop QR)**: the customer scans, then **Take photo of slip** or **Upload slip**, and tap **Confirm payment received**.
   - **PromptPay** or **Card** through Beam: Tonbab waits for the payment and confirms it automatically.
   - **Manual**: choose **Cash**, enter the cash received to work out **Change**, then tap **Mark paid**.
5. The **Sale complete** screen offers **Print receipt**, **Email receipt** and **New sale**.

## Capture the customer (optional)

On the Sale complete screen, tap **Find member** then **Attach**, or **New customer** then **Save & attach**. The customer then appears in [Customers](/en/docs/commerce/orders-and-customers) with their purchase history.

## Receipt printers

- **Sunmi devices with a built-in printer:** tap the printer icon in the header › **This device's printer** › **Print on this device**, choose 58 or 80 mm paper, then **Print a test slip**. In Sunmi Browser, receipts print without a print dialog.
- **Network printers:** go to **Printers** › **Add printer**, choose the role **Customer receipt** or **Order ticket**, then connect **On this network** (enter the IP address) or **Collects from Tonbab** (paste a URL into the printer). Click **Test print**.

With no printer set up, POS uses the browser's print dialog.

## Refunds

1. Open the **Orders** tab in the POS app, open the order and tap **Refund**.
2. Choose items and quantities (or **Select everything**) and a reason.
3. Choose **Give the money back as**: original payment, cash, bank transfer or store credit.
4. Choose whether to **Put the items back in stock**.
5. A manager enters their **Manager PIN** and taps **Confirm refund**.

Unpaid orders can be cancelled with **Cancel order**.

## Close day

**Close day** shows the day's summary: **Net takings**, totals **By payment**, and refunds. Download it with **Export CSV** or open the **Full report**. This is a report; there is no step for counting the cash drawer against it.

## Plan limits

Shops and POS devices: Free 1/1, Starter 1/2, Standard 2/5, Business 5/10, Enterprise unlimited. See [Plans and billing](/en/docs/getting-started/plans-and-billing).
