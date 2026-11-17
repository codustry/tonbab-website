---
title: "Payroll, Social Security, PND1, PND1K and 50 Tawi"
description: "Run payroll in Tonbab with tax and social security, payslips and bank files, plus PND1, SPS 1-10, PND1K and 50 tawi filing files."
section: people
order: 4
updated: 2026-11-17
---

Payroll in Tonbab works from pay rates, recurring earnings and deductions, overtime and leave, then produces payslips, a bank transfer file and the files for the Revenue Department and Social Security Office. Payroll is in the Standard plan and up, and only people with the salary permission can see it.

## Before your first payroll

1. Enter each employee's pay rate in their **Compensation** section. See [Employees](/en/docs/people/employees).
2. Set up **Payroll settings**, such as days per month, hours per day and the employer provident fund rate.
3. Create earning and deduction types under **Pay items**.
4. Add each person's recurring items under **Pay set-up**, such as position allowance, student loan (กยศ.), court-ordered deductions, and loans or salary advances repaid in instalments.
5. Ask staff to fill in **My tax allowances (ล.ย.01)** so withholding tax is worked out correctly.

## Run a pay run

Go to **Manage** › **Payroll**, tab **Pay runs**.

1. Click **New pay run** and choose the month and pay date.
2. Choose **Figures**:
   - **Calculate in Tonbab**
   - **Enter from another system** if you still calculate elsewhere (bring them in with **Import CSV** from the template)
3. Click **Calculate**. Every active employee is added.
4. Check the figures, then click **Approve**. The figures lock and staff see their payslip under **My payslips**.
5. Download the **Bank file**, then click **Mark paid**.
6. If you use Tonbab Accounting, click **Post to accounting** to create the payroll entry (**Reverse entry** if you need to correct it).

Statuses: Draft › Approved › Paid, or Void. Use **Back to draft** to reopen.

## Social security

- 5% from the employee and 5% from the employer
- wage floor ฿1,650
- wage cap ฿17,500 from 2026, rising to ฿20,000 in 2029 and ฿23,000 in 2032. Tonbab uses the cap for the pay run's year automatically.

## Filings

Go to **Payroll filings**. Only paid runs count, grouped by the date they were actually paid.

**Monthly**

| Form | Files | Due |
|---|---|---|
| ภ.ง.ด.1 (PND1) | **RD file (.txt)** for the Revenue Department's filing program, and CSV | By the 7th of the next month (15th if filed online) |
| สปส.1-10 (SPS 1-10) | CSV | By the 15th of the next month |

**Yearly**

- **ภ.ง.ด.1ก (PND1K)**: RD file (.txt) and CSV
- **50 ทวิ (50 tawi)**: withholding tax certificate, printable per employee

Tax IDs and national IDs in the files are hidden for users without the sensitive-data permission.

## Final pay

When someone resigns or is dismissed, go to **Final pay**.

1. Choose the reason, such as resigned, dismissed (no fault), dismissed for cause (section 119), fixed-term contract ended, retired or died.
2. Enter the last working day, unused annual leave days and notice days paid in lieu, then calculate.
3. Tonbab shows severance, unused annual leave and pay in lieu of notice.
4. Click **Add to pay run** to include it in a draft pay run, and optionally record the leaving date.

## Payroll reports

**Payroll reports** has **Register**, **By department** and **Changes**, built from approved and paid runs.

For an overview of Thai tax and labour rules across Tonbab, see [Thai tax and labour compliance](/en/docs/thai-compliance/thai-tax-and-labour-compliance).
