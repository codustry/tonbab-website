---
title: "Time and Attendance, Overtime and HikCentral Devices"
description: "Clock in on Tonbab or connect HikCentral scanners, set start time and late grace, fix missing scans and approve overtime for payroll."
section: people
order: 3
updated: 2026-11-17
---

The **Time** menu shows staff check-ins and check-outs, lets you fix exceptions, approve overtime and review the monthly summary before payroll. Time data comes from clocking in on Tonbab or from HikCentral scanners.

## Staff clock in

Staff go to **My time & leave** and click **Clock in** and **Clock out**, or use **Add / edit day** on the **Timesheet** to record a past day.

Companies connected to HikCentral get times straight from face scans.

## Start time and lateness

In **Company Settings** › **Work hours**:

- **Check-in time (late after)**
- **Late grace (minutes)**: 0 to 120, where 0 means strict

Once past the grace period, late minutes count from the start time, not from the end of the grace period. For example, with an 08:30 start and 15 minutes' grace, arriving at 08:50 counts as 20 minutes late.

## The HR time console

Go to **Manage** › **Time**. The **Time & attendance** page has:

1. **Exceptions — needs fixing**: days missing a check-in or check-out. Click **Edit**. The original scan and the reason for the edit are always kept.
2. **Days to review**: click **Mark reviewed** day by day, or **Approve period**.
3. **Pending overtime**: choose **Pay as OT** or **Not OT**. A late check-out never becomes overtime automatically.
4. **Monthly summary** to check before payroll.

## Overtime rates

| Case | Rate |
|---|---|
| Overtime on a working day | 1.5× |
| Work on a holiday | 2× |
| Overtime on a holiday | 3× |

Employees with **Eligible for overtime** turned off don't get overtime.

## Connect HikCentral scanners

For companies using Hikvision's HikCentral (included in Enterprise, or ฿3,600 a year as a Business add-on):

1. Go to **Time** › **HikCentral**, tab **Connection**, and click **Create connection**.
2. Enter the values shown into HikCentral under System › Third-Party Integration › Data Interchange. The password is shown only once, so copy it.
3. On the **Employees** tab, click **Link** to match Tonbab employees to HikCentral people, or link all suggested matches.

Only linked employees get attendance from scans.

## Overtime requests and comp time

Staff request overtime from their own time page. If your company allows comp time, rest-day work can be taken as a day off instead of pay. See [Leave and holidays](/en/docs/people/leave-and-holidays).

## On to payroll

Approved overtime hours and unpaid leave flow into that month's [payroll](/en/docs/people/payroll).
