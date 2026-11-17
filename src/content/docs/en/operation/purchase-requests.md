---
title: "Purchase Requests (PR) and Approvals in Tonbab"
description: "Create a purchase request, have procurement source vendors, approve it and generate POs, plus re-approval when an approved PR changes."
section: operation
order: 1
updated: 2026-11-17
---

A purchase request (PR) is where purchasing starts in Tonbab. The requester creates and submits it, procurement finds vendors and prices, an approver approves it, and Tonbab generates one purchase order (PO) per vendor.

## Create a purchase request

1. Go to **Operation** › **Purchasing** › **Purchase Requests** and click **New Purchase Request**.
2. Pick the **Account Assignment**:
   - **Job / Project**: the cost goes to a [job control](/en/docs/operation/job-control-costing).
   - **Stock Replenishment**: buying into stock.
   - **Expense**: general purchases.
3. Add lines with **Add Line** or **Add multiple**. For labour or contracted work, tick **Service / labor**. If an item has a bill of materials, click **Expand BOM** to replace it with its components.
4. Click **Create PR (Draft)**, then **Submit** when it's ready.

The list page also has **Review shortages** (materials a work order ran short of) and **Consolidate demand** to combine demand from several sources into one PR.

## Steps and statuses

| Status | Who does what | Button |
|---|---|---|
| Draft | Requester edits and submits | **Submit** |
| Submitted | Procurement picks it up | **Start Review** |
| Under Procurement Review | Procurement sets a vendor and price on every line | **Complete Sourcing** |
| Pending Approval | Approver decides | **Approve** / **Reject** |
| Approved | Procurement creates POs | **Generate POs** |
| Rejected | Sent back for changes | **Reopen for Resourcing** / **Revert to Draft** |

Once POs are created, the status becomes **Partially Converted** or **Fully Converted**. **Generate POs** creates one draft PO per vendor. If other approved PRs have lines for the same vendor, a **Consolidate with {n} other PR(s)** button lets you combine them into one PO.

## The Approvals page

Approvers see everything waiting for them under **Approvals** in the sidebar. It brings together PRs that are **Pending Approval**, PR / PO revert requests, delivery note reversal requests, and leave, overtime and expense claims.

## Auto-approve (optional)

A company can let PRs below a set ceiling approve themselves. It's off by default. In strict mode, every line must also have a preferred vendor with a valid agreed price in THB.

## Changes after approval and re-approval

You can still edit an approved PR that has no PO yet, but Tonbab sends it back to **Pending Approval** when:

- lines are added, removed or substituted, or
- the total rises above the tolerance (10% by default, set per company).

The PR shows **This request was revised and needs re-approval**, and the requester is notified. To swap an item for a substitute, use the **This line replaces (substitution)** field in the edit form. The line then shows **Replaces #{n} {item}** so the approver can see the change clearly.

## Document chain lock

Once a PO is made from a PR, the PR is locked. To change it, delete the PO (and any goods receipts on it) first. People who can't revert directly see **Request Revert** instead, which sends a request to the Approvals page.

## Next steps

- Compare quotes from several vendors on the **Price Comparison** tab: [RFQ price comparison](/en/docs/operation/rfq-price-comparison)
- Issue and print the order: [Purchase orders](/en/docs/operation/purchase-orders)
