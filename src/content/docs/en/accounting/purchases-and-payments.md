---
title: "Expenses, Vendor Bills and Payments (Early Access)"
description: "Record vendor bills, pay many vendors at once with withholding tax, and manage supplier advances and vendor credit notes in Tonbab."
section: accounting
order: 3
updated: 2026-11-17
---

The **Purchases** group in Accounting records vendor bills and expenses, then pays them one at a time or many at once. Tonbab withholds tax and issues the 50 tawi certificate when you pay.

> **Early access:** Accounting is available to invited companies only. See [Accounting overview](/en/docs/accounting/accounting-overview).

## Record a bill or expense

1. Go to **Purchases** › **Expenses and bills** and create a new one.
2. Pick the vendor and enter the vendor's invoice number, lines and VAT.
3. Choose **Claim in month** to set which month the input VAT is claimed.
4. Issue it.

On an issued bill, click **Pay** to pay now, or **Vendor credit note** if the vendor gives you credit.

## Prepare payments (pay many bills at once)

1. Go to **Prepare payments**. Unpaid bills are grouped by vendor.
2. Filter by **All unpaid**, **Due or overdue** or **Due within 7 days**.
3. Tick the bills to pay, or **Select all shown**.
4. Click **Pay {n} vendors and post**. Tonbab posts one payment voucher per vendor.

Withholding tax on a bill is deducted when that bill is paid in full here.

## Pay one at a time

On the **Payments** screen:

1. Choose **Paid from**.
2. Enter any **Bank fee on top**.
3. If you withhold tax, fill in **Tax withheld from the vendor**. See [Withholding tax](/en/docs/accounting/withholding-tax-50-tawi).
4. For services from abroad, enter the PP36 base.
5. Click **Pay and post**, then **Print voucher**.

## Supplier advances

For deposits or payments made before you receive the bill:

1. Go to **Supplier advances**, click **Pay advance**, optionally link a purchase order, then **Record advance payment**.
2. When the bill arrives, open the advance and click **Apply advance** against it.
3. If applied by mistake, click **Undo**.

The **Not yet used** tab shows advances not yet applied to any bill. Only an unused advance can be voided. Set the advance account under **Posting accounts** first.

## Vendor credit notes

Create one from an issued bill to reduce what you owe after a return or discount. The physical return is recorded separately on the goods receipt with **Return to vendor**. See [Goods receipt](/en/docs/operation/goods-receipt).

## What you owe

**Receivables / payables ageing** under Reports shows outstanding payables by age.

## Staff expense claims

Expenses paid by staff go through **My expenses** in People and are approved under **Expenses** in Operation.

Input VAT from these bills flows into the [PP30](/en/docs/accounting/vat-pp30) reports.
