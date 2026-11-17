---
title: "Work Orders and Bills of Materials (BOM) in Tonbab"
description: "Create bills of materials, run work orders, issue materials, record output and scrap, hold for QC and use the shop-floor tablet app."
section: operation
order: 6
updated: 2026-11-17
---

Manufacturing in Tonbab uses bills of materials (BOMs), which say what materials one unit needs, and work orders (WOs), which issue those materials and receive finished goods into stock. Manufacturing is in the Business plan and up.

## Create a bill of materials

1. Go to **Master Data** › **BOM** and click **New BOM**.
2. Pick the product to produce and enter a BOM code and version.
3. Add components with their **Qty Per Unit**.
4. Click **Create BOM**.

The BOM page shows material cost per unit (from average cost, or vendor price as an estimate) and can be activated or deactivated.

## Open a work order

1. Go to **Jobs & production** › **Work Orders** and click **New Work Order**.
2. Pick the product and quantity. Materials fill in from the BOM and scale with quantity (click **Reload from BOM** if you change it).
3. Choose the **Execution**:
   - **Internal**
   - **Subcontract**: pick a supplier and add service lines. Tonbab creates a service PO automatically.
4. Click **Create WO (Draft)**.

## Work order steps

1. **Release**: Tonbab warns if materials are short (a warning, not a block).
2. **Start Production**.
3. **Issue Materials**: allowed once released and during production.
4. **Complete**, and record the output.
5. **Close** when the job is done.

You can cancel from draft through in progress, and **Revert to draft** if no stock has moved yet.

## Record output and QC

When completing, enter:

- **Good Quantity** going into stock
- **Rework** and **Scrap**
- serials or lot, if the product is tracked

To inspect first, tick **Hold for QC**. The work order shows **On QC hold** until you accept the goods into stock or scrap them.

## Optional extras

- **Routing**: split the job into steps and start/finish each one.
- **Genealogy**: see which material lots went into a finished lot.
- **Planned vs actual**: compare planned and actual materials and cost.

## Shortages and purchasing

If a work order finishes short of materials, the shortages appear under **Review shortages** on the purchase request page, ready to be pooled into PRs by vendor. See [Purchase requests](/en/docs/operation/purchase-requests).

## The shop-floor tablet app

The **Manufacture** app issues materials on the shop floor (install it as in [Install the app](/en/docs/getting-started/install-app)).

1. The home screen shows **Ready to scan** with active work orders and job controls.
2. Pick a work order, scan components, then tap **Confirm issue** (use **Undo one** after a wrong scan).
3. Print a **withdrawal slip**, product label or traveler slip if needed.
4. Tap **Complete WO**, enter **Quantity produced**, choose where to **Receive into warehouse**, enter a lot (for lot-tracked products), add at least one **Build photo**, then tap **Confirm completion**.

The Job Controls tab in this app issues materials to a job without a work order, unless your company requires a work order every time.
