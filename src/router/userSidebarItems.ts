
import CashOut from "@/Pages/UserPages/CashOut";
import SecuritySettings from "@/Pages/SharedPages/SecuritySettings";
import SendMoney from "@/Pages/UserPages/SendMoney";
import TransactionHistory from "@/Pages/UserPages/TransactionHistory";
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
import Profile from "@/Pages/SharedPages/Profile";
import Balance from "@/Pages/SharedPages/Balance";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        icon: React.createElement(User),
        url: "/user/profile",
        component: Profile,
      },
    ],
  },
  {
    title: "Wallet",
    items: [
      {
        title: "My Wallet",
        icon: React.createElement(Wallet),
        url: "/user/wallet",
        component: Balance,
      },
    ],
  },
  {
    title: "Transactions",
    items: [
      {
        title: "Transaction History",
        icon: React.createElement(History),
        url: "/user/history",
        component: TransactionHistory,
      },
      {
        title: "Send Money",
        icon: React.createElement(ArrowLeftRight),
        url: "/user/send-money",
        component: SendMoney,
      },
      {
        title: "Cash Out",
        icon: React.createElement(CreditCard),
        url: "/user/cash-out",
        component: CashOut,
      },
    ],
  },
  {
    title: "Security",
    items: [
      {
        title: "Security Settings",
        icon: React.createElement(Shield),
        url: "/user/security",
        component: SecuritySettings,
      },
    ],
  },
];
