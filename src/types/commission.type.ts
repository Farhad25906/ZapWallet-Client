// commission.type.ts
import type { TransactionType } from "./transaction.types";

// Commission Summary Types
export interface ICommissionSummary {
  totalCommission: number;
  agentCommission?: number;
  superAdminCommission?: number;
  systemFee?: number;
  cashOutFee?: number;
  sendMoney?: number;
  transactionCount?: number;
  period?: {
    startDate?: string;
    endDate?: string;
  };
}


// Commission Transaction Types
export interface ICommissionTransaction {
  _id: string;
  from: {
    _id: string;
    name: string;
    phone: string;
    role: string;
  };
  to: {
    _id: string;
    name: string;
    phone: string;
    role: string;
  };
  amount: number;
  type: TransactionType;
  commission: {
    agentCommission: number;
    superAdminCommission: number;
    systemFee: number;
  };
  createdAt: string;
}

export interface ICommissionTransactionsData {
  transactions: ICommissionTransaction[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ICommissionFilters {
  startDate?: string;
  endDate?: string;
  transactionType?: TransactionType;
  page?: number;
  limit?: number;
}