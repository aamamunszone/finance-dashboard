# Finance Dashboard 💰

A clean, interactive, and responsive finance dashboard built as a frontend screening assignment for **Zorvyn FinTech**. The goal was simple - design something that helps users track and understand their financial activity without any backend dependency.

**Live Demo →** [fin-dash-view.vercel.app](https://fin-dash-view.vercel.app)  
**GitHub →** [github.com/aamamunszone/finance-dashboard](https://github.com/aamamunszone/finance-dashboard)

---

## What's Inside

The app has three main sections - a **Dashboard** for the big picture, a **Transactions** page for digging into the details, and an **Insights** page that tries to surface useful observations from the data.

There's also a role switcher (Viewer / Admin) in the header that changes what you can do in the app, and a dark mode toggle that remembers your preference across sessions.

---

## Features

### Dashboard

- Summary cards showing Total Balance, Monthly Income, and Monthly Expenses - each with a percentage change compared to last month
- A line chart tracking income, expenses, and balance over the last 6 months
- A pie chart breaking down spending by category
- A recent transactions preview at the bottom

### Transactions

- Full transaction list with date, description, category, type, and amount
- Search by description, filter by category and type, sort by date or amount
- Summary strip showing filtered result count, total income, and total expenses
- **Admin only:** Add new transactions via a modal form with validation
- **Admin only:** Export filtered transactions as a CSV file
- **Admin only:** Reset all data back to the demo dataset (with a confirmation prompt)
- Responsive - table view on desktop, card view on mobile

### Insights

- Four key observation cards: highest spending category, monthly expense change, biggest single expense, and savings rate
- A bar chart comparing income vs expenses month by month
- A category breakdown table with progress bars showing spending distribution

### Role-Based UI

- Two roles - **Viewer** and **Admin** - switchable from the header
- Viewer sees everything but cannot add, export, or reset data
- Admin gets the full feature set
- No backend or authentication - purely frontend simulation for demonstration

### UX Details

- Dark mode with system preference detection on first visit, persists via localStorage
- Transactions persist across page refreshes via localStorage
- Dynamic browser tab titles per page
- Empty states handled gracefully throughout
- Animated progress bars in the insights section

---

## Tech Stack

| Layer     | Choice                      | Why                                         |
| --------- | --------------------------- | ------------------------------------------- |
| Framework | React 19 (Vite)             | Fast dev experience, familiar ecosystem     |
| Routing   | React Router v7 (Data Mode) | Clean nested routing, future-proof API      |
| Styling   | Tailwind CSS v4             | Utility-first, no config file needed        |
| Charts    | Recharts                    | React-native, composable, easy to customize |
| Icons     | Lucide React                | Clean and consistent icon set               |
| State     | React Context API           | Sufficient for this scope, no overhead      |
| Deploy    | Vercel                      | Zero-config, instant previews               |

---

## Project Structure

```
src/
├── components/
│   ├── dashboard/        # SummaryCard, BalanceTrendChart, SpendingChart
│   ├── insights/         # InsightsPanel, MonthlyComparisonChart, CategoryBreakdownTable
│   ├── transactions/     # TransactionTable, FilterBar, AddTransactionModal
│   ├── layout/           # Layout, Sidebar, Header
│   └── ui/               # Badge, EmptyState, RoleSwitcher, PageTitle
├── contexts/             # AppContext (createContext)
├── providers/            # AppProvider (state + localStorage logic)
├── hooks/                # useApp
├── pages/                # Dashboard, Transactions, Insights, NotFound
├── routes/               # Routes.jsx (createBrowserRouter)
├── data/                 # mockData.js (transactions, monthly trend, category colors)
└── utils/                # helpers.js (formatCurrency, formatDate, exportToCSV)
```

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/aamamunszone/finance-dashboard.git

# Move into the project folder
cd finance-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## How to Use

1. **Open the app** - you land on the Dashboard with an overview of your finances
2. **Switch roles** - use the Viewer / Admin toggle in the top-right header
3. **Explore transactions** - head to the Transactions page, try filtering and sorting
4. **Add a transaction** - switch to Admin role, click "Add Transaction", fill in the form
5. **Export data** - as Admin, use the "Export CSV" button to download filtered transactions
6. **Check insights** - the Insights page shows spending patterns and monthly comparisons
7. **Toggle dark mode** - click the moon/sun icon in the header; your preference is saved

---

## Key Technical Decisions

**Context API over Redux** - The app state is straightforward: a list of transactions, a role, some filters, and a dark mode flag. Redux would have been over-engineering for this scope. Context with a single provider keeps things readable and easy to follow.

**Tailwind v4** - The new version removes the need for a separate `tailwind.config.js`. Dark mode is handled via a custom `@custom-variant` in CSS, which plays nicely with the class-based toggle approach.

**React Router v7 Data Mode** - Used `createBrowserRouter` with the `Component` property (Data Mode) for cleaner route definitions and better alignment with where React Router is heading.

**localStorage for persistence** - Transactions and dark mode preference are both persisted to localStorage. On first load, the app also checks `prefers-color-scheme` to pick the right default theme - no flash of wrong theme thanks to an inline script in `index.html`.

**Mock data approach** - All data is static JSON. The monthly trend chart uses a separate hardcoded dataset to keep the chart stable regardless of what transactions the user adds or removes.

---

## Assumptions Made

- Currency is BDT (Bangladeshi Taka) - formatted as ৳ with Indian number grouping
- "This month" and "last month" comparisons are based on the client's local date
- The monthly trend chart always shows the same 6-month window (from mock data) - it is intentionally separate from the transaction list so the chart remains meaningful even after edits
- Income transactions are automatically assigned the "Income" category in the add form
- The savings rate insight uses this month's data only

---

## Known Limitations

- No real backend or authentication - roles are simulated on the frontend only
- The monthly trend chart does not update dynamically when new transactions are added (uses static mock data by design)
- No pagination on the transactions table - works fine for the current dataset size
- CSV export uses basic formatting - no BOM character for Excel compatibility on all systems

---

## Author

**Abdullah Al Mamun**  
GitHub: [@aamamunszone](https://github.com/aamamunszone)

Built with care for the Zorvyn FinTech Frontend Developer Intern screening assignment.

---

_This project was built for evaluation purposes. All data is mock and does not represent real financial information._
