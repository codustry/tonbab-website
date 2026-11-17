---
title: "Delivery Notes (DN): Issue Stock and Ship to Customers"
description: "Create delivery notes, pack, issue stock and ship, create backorders for short shipments, and confirm delivery with proof."
section: operation
order: 7
updated: 2026-11-17
---

A delivery note (DN) ships goods to a customer and takes them out of stock. If you ship less than ordered, Tonbab creates a backorder automatically. Delivery notes also drive the [pack station](/en/docs/commerce/pack-station).

## Create a delivery note

1. Go to **Jobs & production** › **Delivery Notes** and click **New Delivery Note**.
2. Pick the customer and enter their PO number if you have one.
3. Add lines and choose **Ship from** for each.
4. For consignment or a dealer warehouse, choose the destination warehouse.
5. Click **Create DN (Draft)**.

## Packing (optional)

If your warehouse packs before shipping:

1. Click **Start packing**. Stock is reserved.
2. Pack the goods (on a computer or at the pack station).
3. Click **Mark packed**, then **Close pack**.

To cancel packing, click **Void pack**.

## Issue and ship

1. Click **Issue & Ship**.
2. Pick the warehouse for each line, and the serials or lot for tracked products (Tonbab suggests the lot nearest expiry first).
3. Confirm. Stock is taken out immediately.

If you ship less than ordered, Tonbab shows **Backorder created:** with the backorder number for the next shipment.

## Confirm delivery

When the customer receives the goods, click **Mark Delivered** and attach **Proof of delivery**, such as a photo of the signed slip. Your company can require proof every time or make it optional.

## Print

Click **Print / PDF** to print or save a PDF.

## Statuses

| Status | Meaning |
|---|---|
| Draft | Stock not issued yet |
| Packing / Packed | Being packed or packed |
| Issued / Partially Issued | Stock issued in full or in part |
| Delivered | Customer confirmed receipt |
| Closed / Cancelled | Finished or cancelled |

## Reverse a stock issue

If stock was issued by mistake, click **Revert issue** to return it to the warehouse. Users without that permission send a request to the **Approvals** page instead.

## Cost to a job

A delivery note linked to a job control adds the cost of the shipped goods to the job's actual cost. See [Job control costing](/en/docs/operation/job-control-costing).
