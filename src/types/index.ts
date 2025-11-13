import type { ComponentType, ReactNode } from "react";

export type { ISendOtp, IVerifyOtp, ILogin } from "./auth.type";
export type { Agent, AgentInfo, PendingAgentsResponse } from "./agent.types";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    icon?: ReactNode;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "AGENT";

export type IsActive = "active" | "inactive" | "suspended" | "blocked";
export const IsActiveValues = {
  ACTIVE: "active" as IsActive,
  INACTIVE: "inactive" as IsActive,
  SUSPENDED: "suspended" as IsActive,
  BLOCKED: "blocked" as IsActive,
};
export type WALLET_STATUS = "active" | "inactive" | "suspended";