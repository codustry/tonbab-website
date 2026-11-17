---
title: "Purchase Orders (PO) for Goods and Services in Tonbab"
description: "Create purchase orders from a PR or as a spot buy, add goods and service lines, issue and print them, and record actual import costs."
section: operation
order: 3
updated: 2026-11-17
---

A purchase order (PO) is the document you send to a vendor. Tonbab recommends creating POs from approved purchase requests, so the price, vendor and approval stay linked, but you can also create a spot-buy PO. One PO can hold both goods lines and service lines.

## Create a purchase order

**Recommended:** on an approved purchase request, click **Generate POs**. Tonbab creates one draft PO per vendor.

**Spot buy:**

1. Go to **Operation** › **Purchasing** › **Purchase Orders** and create a new one (or choose **Source from a Purchase Request (recommended)**).
2. Pick the vendor and set **VAT Type** to **VAT 7%** or **Non-VAT**.
3. Add lines, then click **Create PO (Draft)**.

## Goods lines and service lines

- **Goods** have a product code and go into stock when received.
- **Service / labor** lines, such as installation, transport or contracted work, have no product code and don't go into stock. Their cost is recorded when the goods receipt is posted.

If a service line isn't linked to a job control, Tonbab warns that its cost won't be attributed to any job. See [Job control costing](/en/docs/operation/job-control-costing).

## Issue and print the order

1. Check the draft. Change it with **Edit**.
2. Click **Issue PO**. The status becomes **Issued**.
3. Click **Print / PDF** to print it or save a PDF to send to the vendor.

## PO statuses

| Status | Meaning |
|---|---|
| Draft | Still editable |
| Issued | Sent to the vendor, waiting for goods |
| Partially Received | Some goods have arrived |
| Fully Received | Every line received |
| Closed / Cancelled | Finished or cancelled |

Cancel a PO with **Cancel** and undo that with **Revert Cancel**. To change an issued PO, use **Revert to Draft**, or **Request Revert** if you can't do it yourself.

## Receive goods into stock

Click **Receive into stock** on the PO to open a goods receipt with the lines filled in. See [Goods receipt](/en/docs/operation/goods-receipt).

## Import purchase orders

A PO from an overseas vendor has an **Actual Import Costs** section for the freight, duty and clearance you actually pay.

1. Click **Add actual charge** for each invoice as it arrives.
2. When all charges are in, click **Finalize cost card**.
3. To change it later, click **Re-open cost card**.

Tonbab uses these figures for the landed cost of the goods received. The estimate made during sourcing is on [RFQ price comparison](/en/docs/operation/rfq-price-comparison).

## Document chain lock

A later document locks the one before it. Once goods are received on a PO, the PO can't be edited until those receipts are reversed or cancelled. Undo in this order: goods receipt › purchase order › purchase request.

## Subcontract service POs

A work order set to **Subcontract** creates a **Subcontract service PO** automatically. You can't edit it directly, and it is received through the work order. See [Work orders and BOM](/en/docs/operation/work-orders-and-bom).
