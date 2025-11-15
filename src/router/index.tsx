import App from "@/App";
import DashboardLayout from "@/layout/Dashboardlayout";
import Login from "@/Pages/AuthPages/Login";
import Register from "@/Pages/AuthPages/Register";
import Verify from "@/Pages/AuthPages/Verify";
import AboutPage from "@/Pages/SharedPages/AboutPage";
import ContactPage from "@/Pages/SharedPages/ContactPage";
import FAQPage from "@/Pages/SharedPages/FAQPage";
import FeaturesPage from "@/Pages/SharedPages/FeaturesPage";
import HomePage from "@/Pages/SharedPages/HomePage";
import { generateRoutes } from "@/utils/generateRoutes";

import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { agentSidebarItems } from "./agentSidebarItems";
import ErrorPage from "@/Pages/SharedPages/ErrorPage";
import { withAuth } from "@/utils/withAuth";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        Component: HomePage,
        index: true,
      },
      {
        Component: AboutPage,
        path: "/about",
      },
      {
        Component: FeaturesPage,
        path: "/features",
      },
      {
        Component: FAQPage,
        path: "/faq",
      },
      {
        Component: ContactPage,
        path: "/contact",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout),
    path: "/admin",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/admin/balance" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout),
    path: "/user",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/user/profile" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout),
    path: "/agent",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/agent/profile" /> },
      ...generateRoutes(agentSidebarItems),
    ],
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Verify,
    path: "/verify",
  },
]);
