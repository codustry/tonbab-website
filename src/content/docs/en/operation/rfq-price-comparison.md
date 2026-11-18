---
title: "RFQ Price Comparison and Landed Import Cost"
description: "Record quotes from several vendors on a PR, compare domestic and international offers by landed cost (freight, duty, FX) and award."
section: operation
order: 2
updated: 2026-11-18
---

RFQ price comparison lives on the **Price Comparison** tab of a purchase request. Procurement records quotes from several vendors, compares them side by side and awards the winner. The awarded price is written onto the PR automatically. This feature is in every plan, Free included.

## Record a quote

1. Open a purchase request that is being sourced and go to the **Price Comparison** tab.
2. Click **Add quote**, pick the vendor and enter a price for each line.
3. Under **VAT entered as**, say whether the prices are **Ex-VAT (net)** or **VAT-inclusive**.
4. Add a **Disc %** per line or a **Whole-quote discount %** if any.
5. For an overseas vendor, add the **Incoterm**, **Freight options** (for example sea or air; tick the one to compare on) and the **Payment method**, such as T/T, L/C or card, with any **Bank / payment fee**.

## Domestic or international

Tonbab works this out from the quote's currency. There's no mode to choose.

- **Domestic vendor (THB):** compared on the normal net price, with no FX or duty.
- **Overseas vendor:** the quote shows an **International** badge and is compared on **Landed total (THB)**.

One PR can mix both kinds. A vendor that quotes in THB is treated as plain THB.

## Landed cost

An international quote has an **Import Cost Card** that adds up everything before the goods reach your warehouse:

- bank fee
- **Freight (main leg)**
- **Forwarder / handling**
- **Import duty**
- **Customs clearance**
- insurance, packing and other costs

Click **Auto FX** to fetch the exchange rate, and **Recalculate** after changing numbers. The cost card and foreign-currency prices are visible only to Admin, Manager and International Procurement.

## Reading the comparison

The table highlights:

- **Cheapest for this item**
- **Lowest total**
- **Lowest landed cost**

## Award the winner

- Click **Award** on a whole quote or on a single line.
- Or click **Award all cheapest** to pick the lowest price for every line.

A foreign-currency quote needs an FX rate before it can be awarded. Awarding writes the vendor and the net THB price (after discounts, without VAT) onto the PR lines and marks them **Sourced**.

## Next steps

When every line is awarded, click **Complete Sourcing** to send the PR for approval, then **Generate POs** as usual. See [Purchase requests](/en/docs/operation/purchase-requests). For import orders, you can record actual import costs against the estimate on the [purchase order](/en/docs/operation/purchase-orders).
