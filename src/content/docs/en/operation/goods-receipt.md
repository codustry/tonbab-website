---
title: "Goods Receipts (GR): Receive Purchase Orders into Stock"
description: "Receive purchase orders into stock, take partial deliveries, record lots and serials, quarantine rejects and reverse a receipt."
section: operation
order: 4
updated: 2026-11-18
---

A goods receipt (GR) records what actually arrived against a purchase order. When you click **Post to Inventory**, the goods enter stock at cost and the PO updates to partially or fully received.

## Receive against a purchase order

1. Open the PO and click **Receive into stock**, or go to **Operation** › **Purchasing** › **Goods Receipts** › **New Goods Receipt** and pick the PO.
2. For each line, enter:
   - **Qty Received**: what was delivered
   - **Qty Accepted**: what passed inspection
   - **Free**: pieces given free (they enter stock at zero cost)
   - the warehouse to receive into
3. Click **Create GR (Draft)**.
4. Check it, then click **Post to Inventory**.

## Partial deliveries

The table shows Ordered, Prev. Received and Remaining. Receive what actually arrived, and create another GR when the next delivery comes. Receiving more than ordered is allowed, but it's flagged as an over-receipt.

## Lots and serials

If a product is tracked, **Post to Inventory** asks for:

- **Serial numbers**, one per line, or
- a **Lot** number with manufacture and expiry dates. Leave the lot number blank and Tonbab generates one.

Lot and serial tracking is in every plan, Free included. See [Inventory and warehouses](/en/docs/operation/inventory-and-warehouses).

## Receiving service lines

Service lines don't go into stock, but posting the GR marks them received. That lets a service PO reach **Fully Received**, and the cost lands on the linked job.

## Only your own warehouses

A GR can only receive into warehouses of type **Owned (our warehouse)**. Subcontractor and customer consignment warehouses are used with transfers, not for receiving from vendors.

## After posting

- **Quarantine rejected qty** sets rejected goods aside. Later choose **Accept into stock** or **Scrap**.
- **Return to vendor** records the physical return. (Vendor credit notes are handled separately in accounting.)
- **Reverse GR** undoes the whole receipt. It's blocked if the stock has already been used, moved or shipped.

## Subcontract orders

Subcontracted production is received through the work order, not a GR. See [Work orders and BOM](/en/docs/operation/work-orders-and-bom).
