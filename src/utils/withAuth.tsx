
import { useMyInfoQuery } from "@/redux/features/user/user.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";
import ZapWalletLoader from "./ZapWalletLoader";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useMyInfoQuery(undefined);

    if (!isLoading && !data?.data?.email) {
      return <ZapWalletLoader/>;
    }

    if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};