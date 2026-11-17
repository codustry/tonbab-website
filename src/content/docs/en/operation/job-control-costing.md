---
title: "Job Control: Track Project Budgets and Costs"
description: "Track the budget, committed and actual cost of a project or production job with job controls, and see profit per job in Tonbab."
section: operation
order: 8
updated: 2026-11-17
---

A job control is the file for one piece of work, such as a customer project, an internal build or a stock build. Every document linked to the job (purchase requests, purchase orders, goods receipts, work orders, delivery notes and expenses) rolls its cost up here, so you can see straight away how much of the approved budget is used.

## Create a job

1. Go to **Jobs & production** › **Job Controls** and click **New Job Control**.
2. Pick the **Job Type**: Customer Project, Internal Build, Stock Build or Maintenance.
3. Enter the **Approved Budget**.
4. Click **Create Job**.

You can also create a job from a CRM deal with **Create Job Control**.

## Job statuses

Draft › **Activate** › Active › (**Hold** / **Resume**) › **Complete** › **Close**

Closing a job needs the job-close permission. A job can also be cancelled.

## Where costs come from

| Bucket | Source |
|---|---|
| **Committed** | Issued POs not yet received |
| **Actual** materials | Goods received on job-type PRs (landed cost) and stock issued through work orders or delivery notes (average cost) |
| **Actual** services | Received service lines on POs |
| **Actual** expenses | Expense claims linked to the job |
| **Actual** service jobs | Labour and travel from service jobs |

Estimates on purchase requests are for information only and don't count against the budget. Tonbab nets out overlaps, so the same cost is never counted twice.

Costing from stock issues needs cost tracking switched on in **Settings** › **Inventory & Costing**.

## Reading the job page

The top shows a budget bar of spent plus committed against the approved budget. If the job is over budget, it shows by how much. The rest of the page is in tabs, starting with Overview.

## Job profitability

The **Job Profitability** section compares budget and cost:

Variance = Budget − (Committed + Actual)

## Hire a subcontractor

Under **Outsourced work**, click **Hire a subcontractor** to create a draft service PR linked to this job, then follow [Purchase requests](/en/docs/operation/purchase-requests).

## Tips

- Link every PR bought for a job from the start, using the **Job / Project** account assignment.
- For labour or installation on a PO, use a **Service / labor** line and link the job, or the cost won't reach it.
- For planned vs actual material cost in production, see [Work orders](/en/docs/operation/work-orders-and-bom).
