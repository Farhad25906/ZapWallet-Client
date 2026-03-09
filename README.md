# 💰 ZapWallet Client - Digital Payment System Frontend

A modern, responsive React application for ZapWallet digital payment system. Built with React 19, TypeScript, Tailwind CSS, and Redux Toolkit.

## 🌐 Live URL

- **Frontend:** [https://zap-wallet-client.vercel.app](https://zapwallet-client.vercel.app)
- **Backend API:** [https://zapwallet-server.vercel.app](https://zapwallet-server.vercel.app)

---

## 🎯 Overview

ZapWallet Client is a feature-rich, production-ready frontend application that provides a seamless digital wallet experience with role-based dashboards, real-time transactions, and comprehensive financial management tools.

### Key Highlights

- ✅ **Modern UI/UX** - Built with Tailwind CSS 4 and shadcn/ui
- ✅ **Role-Based Dashboards** - Separate interfaces for Users, Agents, and Admins
- ✅ **Real-Time Updates** - Redux Toolkit for state management
- ✅ **Form Validation** - React Hook Form + Zod schemas
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Smooth Animations** - Framer Motion for delightful UX
- ✅ **Demo Login** - Quick testing with pre-filled credentials
- ✅ **Type Safety** - Full TypeScript coverage

---

## 🚀 Features

### 🔐 Authentication

- **Login/Register** - Secure authentication with JWT
- **OTP Verification** - Phone number verification
- **PIN Security** - 6-digit PIN for transactions
- **Demo Login** - One-click login for User/Agent/Admin roles
- **Session Management** - Automatic token refresh
- **Logout** - Secure session termination

### 👤 User Features

- **Send Money** - Transfer funds to other users (৳100 - ৳1,000,000)
- **Cash Out** - Withdraw cash through agents
- **Transaction History** - View all past transactions with filters
- **Balance Tracking** - Real-time wallet balance display
- **Profile Management** - Update personal information
- **Security Settings** - Change PIN, manage security

### 💼 Agent Features

- **Cash In** - Deposit money to user accounts
- **Withdraw Money** - Transfer earnings to bank account
- **Commission Tracking** - View earned commissions (1.5% rate)
- **Transaction History** - Agent-specific transaction logs
- **Profile Management** - Update agent information

### 👨‍💼 Admin Features

- **User Management** - View and manage all users
- **Agent Management** - Approve/reject agent applications
- **Agent Funding** - Add funds to agent wallets
- **Revenue Dashboard** - System-wide financial overview
- **Transaction Monitoring** - View all system transactions
- **Commission Reports** - Track all commission payments

### 🎨 Shared Features

- **Home Page** - Landing page with features showcase
- **About Page** - Company information
- **Features Page** - Detailed feature descriptions
- **FAQ Page** - Frequently asked questions
- **Contact Page** - Support contact information
- **Responsive Design** - Works on all devices
- **Toast Notifications** - Real-time feedback (Sonner)
- **Loading States** - Smooth loading indicators

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI framework | v19.1.x |
| **TypeScript** | Type safety | v5.9.x |
| **Vite** | Build tool | v7.1.x |
| **Tailwind CSS** | Styling | v4.1.x |
| **Redux Toolkit** | State management | v2.9.x |
| **React Router** | Routing | v7.9.x |
| **React Hook Form** | Form handling | v7.66.x |
| **Zod** | Schema validation | v4.1.x |
| **Axios** | HTTP client | v1.13.x |
| **Framer Motion** | Animations | Latest |
| **Radix UI** | Accessible components | Latest |
| **shadcn/ui** | UI component library | Latest |
| **Sonner** | Toast notifications | v2.0.x |
| **Lucide React** | Icons | v0.552.x |

---

## 📁 Project Structure

```
ZapWallet-Client/
├── src/
│   ├── Pages/                # Page components
│   │   ├── AdminPages/       # Admin dashboard pages
│   │   │   ├── AllUser.tsx
│   │   │   ├── AllAgents.tsx
│   │   │   ├── AllAgentRequest.tsx
│   │   │   ├── FundAgent.tsx
│   │   │   ├── Revenue.tsx
│   │   │   ├── AllTransactionHistory.tsx
│   │   │   └── Profile.tsx
│   │   ├── AgentPages/       # Agent dashboard pages
│   │   │   ├── CashIn.tsx
│   │   │   ├── WithdrawMoney.tsx
│   │   │   ├── Commission.tsx
│   │   │   └── TransactionHistory.tsx
│   │   ├── UserPages/        # User dashboard pages
│   │   │   ├── SendMoney.tsx
│   │   │   ├── CashOut.tsx
│   │   │   └── TransactionHistory.tsx
│   │   ├── AuthPages/        # Authentication pages
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── Verify.tsx
│   │   └── SharedPages/      # Public pages
│   │       ├── HomePage.tsx
│   │       ├── AboutPage.tsx
│   │       ├── FeaturesPage.tsx
│   │       ├── FAQPage.tsx
│   │       ├── ContactPage.tsx
│   │       ├── Balance.tsx
│   │       ├── Profile.tsx
│   │       └── SecuritySettings.tsx
│   ├── components/           # Reusable components
│   │   ├── modules/          # Feature-specific components
│   │   │   ├── Authentication/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   └── RoleSelectionDialog.tsx
│   │   │   └── TransactionSuccessModal.tsx
│   │   ├── ui/               # shadcn/ui components
│   │   └── kibo-ui/          # Custom UI components
│   ├── redux/                # Redux store
│   │   ├── features/         # Feature slices
│   │   │   ├── auth/
│   │   │   ├── user/
│   │   │   └── wallet/
│   │   ├── store.ts
│   │   └── axiosBaseQuery.ts
│   ├── router/               # Route configuration
│   ├── layout/               # Layout components
│   ├── constants/            # Constants and configs
│   │   └── demoUsers.ts      # Demo login credentials
│   ├── types/                # TypeScript types
│   ├── utils/                # Utility functions
│   ├── hooks/                # Custom React hooks
│   ├── config/               # App configuration
│   ├── App.tsx
│   └── main.tsx
├── public/                   # Static assets
├── .env                      # Environment variables
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## 🎨 UI Components

### shadcn/ui Components Used

- **Button** - Primary, secondary, outline variants
- **Card** - Content containers
- **Form** - Form components with validation
- **Input** - Text inputs
- **Label** - Form labels
- **Dialog** - Modal dialogs
- **Dropdown Menu** - Contextual menus
- **Avatar** - User avatars
- **Separator** - Visual dividers
- **Tooltip** - Helpful tooltips
- **Select** - Dropdown selects
- **Alert** - Notification alerts

### Custom Components

- **LoginForm** - Animated login with demo buttons
- **RegisterForm** - Multi-step registration
- **TransactionSuccessModal** - Transaction receipts
- **RoleSelectionDialog** - Role picker for registration
- **ZapWalletLoader** - Custom loading spinner

---

## 🚦 Routes

### Public Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | HomePage | Landing page |
| `/about` | AboutPage | About ZapWallet |
| `/features` | FeaturesPage | Feature showcase |
| `/faq` | FAQPage | FAQ section |
| `/contact` | ContactPage | Contact form |
| `/login` | Login | User login |
| `/register` | Register | User registration |
| `/verify` | Verify | OTP verification |

### Protected Routes (User)

| Path | Component | Description |
|------|-----------|-------------|
| `/send-money` | SendMoney | Transfer funds |
| `/cash-out` | CashOut | Withdraw cash |
| `/transactions` | TransactionHistory | View transactions |
| `/balance` | Balance | Wallet balance |
| `/profile` | Profile | User profile |
| `/security` | SecuritySettings | Security settings |

### Protected Routes (Agent)

| Path | Component | Description |
|------|-----------|-------------|
| `/cash-in` | CashIn | Deposit to users |
| `/withdraw` | WithdrawMoney | Bank withdrawal |
| `/commission` | Commission | Commission reports |
| `/transactions` | TransactionHistory | Transaction logs |

### Protected Routes (Admin)

| Path | Component | Description |
|------|-----------|-------------|
| `/all-users` | AllUser | User management |
| `/all-agents` | AllAgents | Agent list |
| `/agent-requests` | AllAgentRequest | Pending approvals |
| `/fund-agent` | FundAgent | Fund agents |
| `/revenue` | Revenue | Revenue dashboard |
| `/all-transactions` | AllTransactionHistory | All transactions |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_BASE_URL=http://localhost:5000/api/v1

# Optional: Analytics, Debugging
# VITE_APP_NAME=ZapWallet
# VITE_APP_VERSION=1.0.0
# VITE_DEBUG=true
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ZapWallet.git
   cd ZapWallet/ZapWallet-Client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API URL
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm run preview
   ```

The app will start on `http://localhost:5173`

---

## 🎮 Demo Login

For quick testing, use the demo login buttons on the login page:

| Role | Phone | PIN |
|------|-------|-----|
| **User** | +8801829313336 | 123456 |
| **Agent** | +8801760744906 | 123456 |
| **Admin** | +8801812345678 | 123456 |

> **Note:** Demo credentials are for testing only. Create actual accounts for production use.

---

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--primary: #009689;        /* Teal green */
--primary-light: #00b8a9;
--primary-dark: #007a6e;

/* Secondary Colors */
--secondary: #ffd8af;      /* Peach */
--secondary-light: #ffe4c4;
--secondary-dark: #f4c89a;

/* Semantic Colors */
--success: #22c55e;
--error: #ef4444;
--warning: #f59e0b;
--info: #3b82f6;
```

### Typography

- **Headings** - Font weight: 700-900 (Bold/Black)
- **Body** - Font weight: 400 (Normal)
- **Labels** - Font weight: 500-600 (Medium/Semibold)

### Spacing

- Uses Tailwind's spacing scale (0.25rem increments)
- Consistent padding: `p-4 sm:p-6 md:p-8`
- Consistent gaps: `gap-4 sm:gap-6`

---

## 🧪 Form Validation

All forms use React Hook Form + Zod for validation:

```typescript
// Example: Send Money Validation
const sendMoneySchema = z.object({
  toWalletNumber: z.string()
    .regex(/^\+88\d{11}$/, "Phone must start with +88"),
  amount: z.number()
    .min(100, "Minimum ৳100")
    .max(1000000, "Maximum ৳1,000,000"),
});
```

---

## 📱 Responsive Design

- **Mobile First** - Designed for mobile, enhanced for desktop
- **Breakpoints:**
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
  - `2xl`: 1536px

---

## 🎭 Animations

Powered by Framer Motion:

- **Page Transitions** - Smooth route changes
- **Button Interactions** - Hover and tap animations
- **Form Elements** - Fade in animations
- **Demo Buttons** - Scale animations (1.05x hover, 0.95x tap)

---

## 📝 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🔧 Configuration Files

- **vite.config.ts** - Vite configuration
- **tailwind.config.js** - Tailwind CSS configuration
- **tsconfig.json** - TypeScript configuration
- **components.json** - shadcn/ui configuration

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@Farhad25906](https://github.com/Farhad25906)
- Email:farhadhossen2590@gmail.com

---

## 🙏 Acknowledgments

- React team for the amazing framework
- shadcn for the beautiful UI components
- Tailwind CSS team for the utility-first CSS framework
- All contributors who helped improve this project

---

## 📞 Support

For support, email farhadhossen2590@gmail.com or join our Slack channel.
