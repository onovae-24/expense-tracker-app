# Personal Expense Tracker

A modern, responsive web application for tracking personal expenses with data visualization and budget management features.

## ✨ Features

- **Dashboard Overview**: Real-time spending insights and budget progress
- **Expense Management**: Add, edit, and delete expenses with categorization
- **Budget Tracking**: Set monthly budgets with progress monitoring and alerts
- **Data Visualization**: Interactive charts showing spending patterns by category and time
- **Offline Support**: Local storage for data persistence without internet connection
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling and design system
- **Vite** - Build tool and development server
- **Recharts** - Data visualization
- **Radix UI** - Accessible UI components
- **Local Storage** - Data persistence

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📱 Usage

1. **Set Your Budget**: Click "Manage Budget" to set your monthly spending limit
2. **Add Expenses**: Use the "Add Expense" button to record your spending
3. **Track Progress**: Monitor your budget progress and spending patterns on the dashboard
4. **Analyze Spending**: View charts to understand your spending habits by category
5. **Manage Data**: Edit or delete expenses as needed

## 🎨 Features Overview

### Dashboard
- Monthly spending summary
- Budget progress indicator
- Average expense calculation
- Quick access to recent transactions

### Expense Categories
- Food & Dining
- Transportation
- Shopping
- Entertainment
- Bills & Utilities
- Healthcare
- Other

### Visualizations
- Pie chart for spending by category
- Bar chart for daily expense trends
- Budget progress bars

### Alerts
- Budget exceeded notifications
- Visual indicators for spending status

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── Dashboard.tsx # Main dashboard
│   ├── ExpenseChart.tsx
│   ├── ExpenseList.tsx
│   └── ...
├── hooks/
│   └── useExpenseStore.ts # State management
├── pages/
│   └── Index.tsx
└── ...
```

## 📊 Data Storage

The app uses browser's local storage to persist data, ensuring your expense data remains private and accessible offline. Data includes:

- Expenses with amounts, categories, descriptions, and dates
- Budget settings
- Category preferences

## 🚀 Deployment

This app can be deployed to any static hosting service:

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider

### Deploy with Lovable

Click the "Publish" button in the Lovable editor to deploy instantly.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Links

- [Live Demo](https://lovable.dev/projects/47b94d9f-0025-4e5f-a584-e9d820cba011)
- [Lovable Platform](https://lovable.dev)

---

Built with ❤️ using Lovable