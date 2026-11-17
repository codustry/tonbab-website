---
title: "Cash, Bank and Bank Reconciliation (Early Access)"
description: "Add bank accounts, import statements from 12 Thai banks as Excel or CSV, match lines automatically and sign off your bank reconciliation."
section: accounting
order: 6
updated: 2026-11-17
---

**Cash and bank** manages your cash and bank accounts and reconciles them with bank statements. Import a statement file, Tonbab matches it against your books, and you confirm the matches or record what's missing.

> **Early access:** Accounting is available to invited companies only. See [Accounting overview](/en/docs/accounting/accounting-overview).

## Add a bank account

1. Go to **Finance and tax** › **Cash and bank**.
2. Click **Add account** and enter the bank and account number.
3. Choose the **Ledger account** it's linked to.

## Transfer between accounts

Click **Transfer between accounts**, choose the from and to accounts, enter the amount and click **Transfer and post**.

## Reconcile a bank account

Click **Reconcile** on the account to open **Bank reconciliation**.

### 1. Import the statement

1. Download the statement from internet banking as .xlsx or .csv.
2. Click **Import a bank statement** and choose the file.
3. Click **Check file**, then **Import {n} lines**.

Supported banks: KBank, SCB, Bangkok Bank, Krungthai, Krungsri, ttb, GSB, UOB, CIMB, KKP, LH Bank and BAAC. The file needs a date column and either withdrawal/deposit columns or a single amount column. The account number in the file must match the account. Importing the same file again adds nothing.

### 2. Match lines

- **Match** a statement line with an entry in your books, or **Match as a group** when several entries make up one amount.
- **Approve {n} sure** confirms all the matches Tonbab is confident about at once.
- **Not this** rejects a wrong suggestion.
- **Set aside** parks a line for later.

### 3. Record what's missing

For lines not yet in your books, such as bank fees or interest received, click **Record it in the books**, then **Post and match**. For transfers between your own accounts, use **Post transfer**.

### 4. Sign off

Click **Sign off to {date}** to lock matched lines up to that date. To change something later, click **Reopen** and give a reason. A wrongly imported file can be removed with **Withdraw**.

## Tips

- Reconcile every month before filing PP30 and locking the period.
- Record bank fees deducted from incoming payments in the receipt's **Bank / gateway fee deducted** field, so matches line up.
- Use **Prepare payments** to pay many vendors at once; one payment voucher per vendor is easy to match to each transfer. See [Purchases and payments](/en/docs/accounting/purchases-and-payments).
