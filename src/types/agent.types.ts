// types/agent.types.ts
import type { TRole, IsActive,  } from "./index";
import type { ApprovalStatus } from "./user.type";

export const ApprovalStatusValues = {
  PENDING: "pending" as ApprovalStatus,
  APPROVED: "approved" as ApprovalStatus,
  REJECTED: "rejected" as ApprovalStatus,
  SUSPENDED: "suspended" as ApprovalStatus,
};

export interface AgentInfo {
  tinId: string;
  approvalStatus: ApprovalStatus;
  commissionRate: number;
  totalCommission: number;
  approvedAt?: string;
}

export interface Agent {
  _id: string;
  name: string;
  email: string;
  phone: string;
  nid: string;
  agentInfo: AgentInfo;
  createdAt: string;
  role: TRole;
  isActive: IsActive;
  isVerified: boolean;
  isDeleted: boolean;
}

export interface PendingAgentsResponse {
  data: Agent[];
  success: boolean;
  statusCode: number;
  message: string;
}