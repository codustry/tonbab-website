---
title: "Sales Documents and Tax Invoices"
description: "Issue quotations, invoices, tax invoices, receipts, cash sales, and credit and debit notes in Tonbab Accounting, then take payment."
section: accounting
order: 2
updated: 2026-11-18
---

All sales documents are under **Sales** in Accounting. They link in a chain, from quotation to invoice or tax invoice to receipt, and Tonbab posts to the books automatically when a document is issued.

> **Plans:** Accounting is included from the Starter plan up. See [Accounting overview](/en/docs/accounting/accounting-overview).

## Document types

| Document | Use it to |
|---|---|
| Quotation | Quote a customer (issued only here, one numbering series) |
| Billing note | Collect amounts due for billing |
| Invoice / tax invoice | Bill the customer; a tax invoice for VAT-registered companies |
| Receipt | Record payment received |
| Cash sale | Sell and get paid in one document |
| Credit note / debit note | Correct an invoice already issued |

## Issue a document

1. Open the menu for that document type and click **New {type}**, for example **New cash sale**.
2. Pick the customer and enter lines, prices and VAT.
3. Click **Save and issue**, or **Issue and post** for types that post to the books.

Drafts can be removed with **Delete draft**. Issued documents have **Send**, **Print**, **PDF** and **Void** (which needs a reason and a reversal date). A document that already has follow-on documents can't be edited or voided.

## From quotation to payment

On a quotation the customer hasn't declined:

- record the outcome with **Customer accepted** or **Customer declined**
- **Create billing note**
- **Invoice / deposit** or **Create tax invoice** (VAT companies); you can bill in instalments
- **Receive payment / receipt** straight away

**Billing progress** shows how much has been billed and how much is left.

## Take payment and issue a receipt

1. On an unpaid invoice, click **Receive payment / issue receipt**.
2. Choose **Received into** and the **Method**, and enter any **Bank / gateway fee deducted**.
3. If the customer withheld tax, enter it under **Tax withheld by the customer**.
4. Click **Receive and post**, then **Print receipt**.

Payment statuses: Unpaid, Partly paid, Paid and Overdue. See everything outstanding under **Receivables / payables ageing**.

## Credit and debit notes

Credit and debit notes are created from the invoice they correct. Open the invoice and click **Credit note** or **Debit note**. A credit note can't exceed the invoice.

## Quotations from CRM and approval

Sales staff create quotations from a deal with **Create numbered quotation**. Below sales manager, the quotation waits for approval, and an approver clicks **Approve and issue**. Import past quotations with **Import** on the quotations list.

## Document language

Choose Thai or English per document, to issue English documents to foreign customers.

## Not yet supported

Electronic tax invoices (e-Tax Invoice) sent to the Revenue Department aren't supported yet.

Output VAT from these documents flows into the [PP30](/en/docs/accounting/vat-pp30) reports.
