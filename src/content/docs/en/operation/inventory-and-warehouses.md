---
title: "Inventory, Warehouses, Transfers, Lots and Units"
description: "View stock and movements, transfer between warehouses, adjust stock, track lots and serials, and set units of measure in Tonbab."
section: operation
order: 5
updated: 2026-11-18
---

The **Warehouse Controls** menu in the Operation app holds everything about stock: balances, movements, transfers, adjustments and serial numbers. Products and warehouses themselves are under **Master Data**.

## Stock balance

The **Stock Balance** page shows quantity and value per warehouse. Cards at the top show **Total SKUs**, **Total Value**, **Low Stock** and **Out of Stock**. Each item has a status: OK, Low, Critical or Out of Stock. Download it with **Export CSV**.

## Movements

**Movements** is the ledger of every stock in and out: GR receipts, work order issues, finished goods from work orders, delivery note issues, job issues, adjustments in and out, and scrap. Rows without a cost are tagged **uncosted**.

## Transfer between warehouses

1. Go to **Transfers** and click **New Stock Transfer**.
2. Pick the **From Warehouse** and **To Warehouse**, and add lines.
3. Click **Create Transfer**, then **Post Transfer** to move the stock.

## Adjust stock

1. Go to **Adjustments** and click **New Stock Adjustment**.
2. Choose **Increase**, **Decrease** or **Scrap**.
3. For an increase, enter a **Unit Cost**, or leave it blank to use the item's current average cost.
4. Click **Create Adjustment**, then **Post Adjustment**.

## Lots and serials

Turn tracking on in the product form (every plan).

- **Batch / Lot Tracking** records lots at goods receipt and work order completion. When shipping, Tonbab picks the lot nearest expiry first (FEFO), or you can choose one.
- **Serial Number Tracking**. See every serial on the **Serials** page with its status: In Stock, Issued / Delivered, or Damaged / Scrapped.

Once a product has stock movements, its tracking mode can't change, except that lot tracking can still be switched on.

## Units of measure and conversions

In the product form you can set:

- **Base unit**: the unit stock is kept in
- **Purchase unit**: the unit you buy in, such as a carton
- **Production unit**: the unit used in BOMs and work orders, such as millilitres
- **Alternate units**: other units with their conversion rates

The **Unit Conversions** settings page lists **Standard units**, **Your units** and **Missing conversions** to fill in. Turn on **Strict UoM conversions** if Tonbab should refuse to save when a conversion is missing.

## Warehouse types

Set this in **Master Data** › **Warehouses** under **Type**:

| Type | Use it for |
|---|---|
| Owned (our warehouse) | Your own warehouses; can receive from vendors |
| Subcontractor (vendor holds our stock) | Materials sent to a subcontractor; needs a supplier |
| Customer (consignment held at customer) | Consignment stock at a customer; needs a customer |
| In transit | Goods on the way |

How many warehouses you can create depends on your plan (Free 2, Starter 3, Standard 5, Business 10, Enterprise unlimited).

## Stock costing

Costing settings and opening costs are under **Settings** › **Inventory & Costing**. Import opening balances from Excel in **Data Import/Export**. See [Move your data from your current software](/en/docs/migration/migrate-from-other-software).
