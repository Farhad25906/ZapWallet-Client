import AllAgentRequest from "@/Pages/AdminPages/AllAgentRequest";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";
import React from "react";
import {

  Users,
  UserCheck,
  Settings,
  ArrowLeftRight,
  FileText,
  CreditCard,
  PlusCircle,
} from "lucide-react";
import AllAgents from "@/Pages/AdminPages/AllAgents";
import AllUser from "@/Pages/AdminPages/AllUser";
import FundAgentComponent from "@/Pages/AdminPages/FundAgent";
import AllTransactionHistory from "@/Pages/AdminPages/AllTransactionHistory";
import Revenue from "@/Pages/AdminPages/Revenue";
import SecuritySettings from "@/Pages/SharedPages/SecuritySettings";

const Balance = lazy(() => import("@/Pages/SharedPages/Balance"));

export const adminSidebarItems: ISidebarItem[] = [
  
  {
    title: "Agent Management",
    items: [
      {
        title: "All Agents",
        icon: React.createElement(Users, { className: "w-4 h-4" }),
        url: "/admin/all-agent",
        component: AllAgents,
      },
      {
        title: "Agent Requests",
        icon: React.createElement(UserCheck, { className: "w-4 h-4" }),
        url: "/admin/agent-requests",
        component: AllAgentRequest,
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "All Users",
        icon: React.createElement(Users, { className: "w-4 h-4" }),
        url: "/admin/all-users",
        component: AllUser,
      },
    ],
  },
  {
    title: "Transactions",
    items: [
      {
        title: "All Transactions",
        icon: React.createElement(ArrowLeftRight, { className: "w-4 h-4" }),
        url: "/admin/transactions",
        component: AllTransactionHistory,
      },
      {
        title: "Fund Agent",
        icon: React.createElement(PlusCircle, { className: "w-4 h-4" }),
        url: "/admin/fund-agent",
        component: FundAgentComponent,
      },
    ],
  },
  {
    title: "Financial",
    items: [
      {
        title: "Revenue",
        icon: React.createElement(CreditCard, { className: "w-4 h-4" }),
        url: "/admin/revenue",
        component: Revenue,
      },
      {
        title: "Balance",
        icon: React.createElement(FileText, { className: "w-4 h-4" }),
        url: "/admin/balance",
        component: Balance,
      },
    ],
  },
  {
    title: "System",
    items: [
  
      {
        title: "Settings",
        icon: React.createElement(Settings, { className: "w-4 h-4" }),
        url: "/admin/settings",
        component: SecuritySettings,
      },
    ],
  },
];
