# Mayer Doa Store Ledger App

A modern **mobile-first React Ledger Application** for managing customers, transactions, balances, and financial summaries.

Built using **React + TailwindCSS + LocalStorage**.

---

# Features

### Customer Management
- Add new customers
- Edit customer information
- Delete customers
- Customer search
- Sort customers by balance
- Filter due customers

### Transaction System
- Add transactions (Sell / Buy)
- Edit transactions
- Delete transactions
- Transaction history per customer
- Running balance calculation

### Ledger Balance Engine
Balances are calculated dynamically from transactions.

Formula:

balance = totalSell - totalBuy


### Favorite Customers
Long press a customer to mark as **Favorite**.

Favorites appear on **Home Dashboard**.

### Dashboard
Home page shows:

- Favorite customers
- Financial overview
- Income / Expense gauges
- Summary cards
- Quick customer search

### Financial Overview Widget
Shows:

- Income gauge
- Expense gauge
- Net profit

### Customer Report
Each customer page includes:

- Current balance
- Transaction entry form
- Transaction history
- Image attachment support

### Image Support
Transactions can store images (e.g., receipt proof).

### Share Report
Customer ledger report can be shared.

---

# Tech Stack

- React
- React Router
- Tailwind CSS
- LocalStorage
- React Icons

---

# Folder Structure
