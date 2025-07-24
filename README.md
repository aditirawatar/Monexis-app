# 💰 Monexis — Your Personal Finance Tracker

**Monexis** is a sleek, secure, and modern finance management web app that empowers users to manage income, track expenses, visualize financial data, and connect to their bank accounts using PLAID.

---

## 🌟 Features

- 🔐 **Secure Bank Connection** with **Plaid API**
- 💸 **Real-time Expense & Income Tracking**
- 📊 **Interactive Financial Dashboard**  
  – Includes **line, bar, and doughnut charts** for insights  
- 🔁 **Month-over-Month Spending Comparison**
- 🗂️ **Detailed Transactions Page** with filter/search options
- 🎯 **Savings Tracking & Goals Overview**
- 🎨 **Responsive UI**
- 🖱️ **Interactive Cards & Buttons**  
  – 3D glow on hover and touch, animated transitions

---

## ⚙️ Tech Stack

| Layer        | Tech Used                 |
| ------------ | ------------------------- |
| **Frontend** | React.js, Tailwind CSS    |
| **Backend**  | Node.js, Express.js       |
| **Auth + Bank Sync** | Plaid API          |
| **Charts**   | Chart.js (`react-chartjs-2`) |
| **Deployment** | Vercel (frontend), Render (backend) |

---

## 📦 Installation & Setup

### ✅ Prerequisites

- Node.js (v16+ recommended)
- npm (comes with Node.js)
- Plaid Developer Account

### 🔧 Local Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/aditirawatar/Monexis-app.git
   cd monexis


### Folder Structure
![Structure of the directory](image.png)

### Security & Environment
Uses Plaid Link for secure OAuth bank connections
User data is not stored unless explicitly handled
.env files are ignored via .gitignore


### Deployment
Frontend- Vercel
Backend- Render

### Chart Types
Doughnut Chart — Shows proportional income/expenses/savings
Bar & Line Charts — Visualize trends over time
Tooltips — Styled tooltips for insights on hover

### Future Enhancement
PDF/Excel export for transaction data
Documentation section for user to add there documents (Aadhar Card, PAN card)
Budget alerts and financial reminders
Mobile app version (React Native)

### Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## AUTHOR
Made with ❤️ by Aditi Rawat