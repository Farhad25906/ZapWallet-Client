import type { TRole } from ".";


export type IsActive = "active" | "inactive" | "suspended" | "blocked";


export const IsActiveValues = {
  ACTIVE: "active" as IsActive,
  INACTIVE: "inactive" as IsActive,
  SUSPENDED: "suspended" as IsActive,
  BLOCKED: "blocked" as IsActive,
};

export type ApprovalStatus = "pending" | "approved" | "rejected" | "suspended";

export const ApprovalStatusValues = {
  PENDING: "pending" as ApprovalStatus,
  APPROVED: "approved" as ApprovalStatus,
  REJECTED: "rejected" as ApprovalStatus,
  SUSPENDED: "suspended" as ApprovalStatus,
};

export interface IAgentInfo {
  approvalStatus: ApprovalStatus;
  commissionRate: number;
  totalCommission: number;
  approvedAt?: string; 
  tinId: string;
}

export interface ISuperAdminInfo {
  totalCommission: number;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  pin: string;
  phone: string;
  nid: string;
  role: TRole;
  picture?: string;
  address?: string;
  isDeleted: boolean;
  isActive: IsActive;
  isVerified: boolean;
  agentInfo?: IAgentInfo;
  wallet?: string;
  superAdminInfo?: ISuperAdminInfo;
  createdAt: string;
  updatedAt: string;
}

export type Agent = IUser;

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PendingAgentsResponse {
  success: boolean;
  message: string;
  data: IUser[];
}

export interface ChangeActivityStatusRequest {
  userId: string;
  status: IsActive;
}





