import Balance from "@/Pages/AdminPages/Balance";
import CashIn from "@/Pages/AgentPages/CashIn";
import Commission from "@/Pages/AgentPages/Commission";
import Profile from "@/Pages/SharedPages/Profile";
import TransactionHistory from "@/Pages/AgentPages/TransactionHistory";
import WithdrawMoney from "@/Pages/AgentPages/WithdrawMoney";
import SecuritySettings from "@/Pages/SharedPages/SecuritySettings";
import type { ISidebarItem } from "@/types";
import {
  User,
  Wallet,
  ArrowLeftRight,
  History,
  CreditCard,
  Shield,
} from "lucide-react";
import React from "react";

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        icon: React.createElement(User),
        url: "/agent/profile",
        component: Profile,
      },
    ],
  },
  {
    title: "Financial",
    items: [
      {
        title: "My Wallet",
        icon: React.createElement(Wallet),
        url: "/agent/wallet",
        component: Balance,
      },
      {
        title: "Commission",
        icon: React.createElement(CreditCard),
        url: "/agent/commission",
        component: Commission,
      },
    ],
  },
  {
    title: "Transactions",
    items: [
      {
        title: "Cash In",
        icon: React.createElement(ArrowLeftRight),
        url: "/agent/cashIn",
        component: CashIn,
      },
      {
        title: "Withdraw Money",
        icon: React.createElement(ArrowLeftRight),
        url: "/agent/withdraw-money",
        component: WithdrawMoney,
      },
      {
        title: "Transaction History",
        icon: React.createElement(History),
        url: "/agent/history",
        component: TransactionHistory,
      },
    ],
  },

  {
    title: "Security",
    items: [
      {
        title: "Security Settings",
        icon: React.createElement(Shield),
        url: "/agent/security",
        component: SecuritySettings,
      },
    ],
  },
];
