---
title: "Add Users, Roles and Permissions in Tonbab"
description: "How to add and invite users, assign roles, grant extra permissions to one person, protect sensitive and salary data, and how many users each plan includes."
section: getting-started
order: 2
updated: 2026-11-18
---

Admins add users in **User Settings** and give each person one or more **Roles**. A role is a baseline set of permissions. If someone needs more than their role allows, you can grant extra permissions to that one person under **Custom Access**.

## Users included in each plan

| Plan | Users included |
|---|---|
| Free | 1 |
| Starter | 5 |
| Standard | 10 |
| Business | 25 |
| Enterprise | Unlimited (quoted per company) |

The **Users** page shows how many of your users are in use. When you reach the limit, an **Upgrade plan** button appears. Shop and warehouse staff who sign in with a PIN on a kiosk device (POS and pack station) **don't count as users**.

## Add a user

1. Go to **User Settings** and click **Add User**.
2. Enter **Display Name**, **Email**, phone and **Department**.
3. Pick at least one role under **Roles**.
4. Click **Add User**. Tonbab emails the person an invitation to set a password and sign in.

## Built-in roles

| Role | What it's for |
|---|---|
| Admin | Full system access |
| Manager | Approve PRs, manage jobs, view budgets |
| Procurement | Source vendors, create POs, manage products |
| Engineer | Create PRs, manage BOMs, view orders |
| Production | Manage work orders, issue materials, track output |
| Warehouse | Receive goods, manage stock, ship deliveries |
| Accountant | Edit warehouse and master data; view-only on orders |
| Viewer | Read-only access to all modules |

A user can hold several roles. Their permissions are the combination of all of them.

## Edit roles or create your own

The **Roles & Permissions** page lets you edit what each role grants. System roles can't be deleted, but their permissions can be adjusted. Create a new role with **Create role**, or click **Clone** on a similar role and edit it. High-risk permissions are marked, and Tonbab asks you to confirm before granting one. **Recent changes** at the bottom shows the edit history.

## Custom Access for one person

Open a user from the list and scroll to **Custom Access**. Permissions that come from a role are locked. Any other permission can be granted to this user only. Tonbab shows the **Effective permissions if saved** so you can check before saving.

## Sensitive and salary data

Some employee data has its own permissions:

- **Sensitive data** such as national ID, tax ID, social security number and bank details is visible only to people with the sensitive-data permission.
- **Salary data** such as pay rate, salary history and all payroll pages is visible only to people with the salary permission.

See [Employees](/en/docs/people/employees) for details.

## Remove a user or reset a password

On the user's page you'll find **Reset Password** (Tonbab generates a temporary password for you to hand over) and **Remove from Organization** under **Danger Zone**. Removing a user stops them signing in to this company but keeps their profile. You can **Reactivate** them later.

## Single sign-on (SSO)

On every plan, set up SSO on the **Single Sign-On** settings page.
