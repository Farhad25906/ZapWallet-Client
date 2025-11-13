// Add these types to your index.ts or create transaction.types.ts
export type TransactionType = "CASH_OUT" | "CASH_IN" | "SEND_MONEY" | "WITHDRAW" | "ADD_MONEY";
export type TransactionStatus = "COMPLETED" | "PENDING" | "FAILED";
export type InitiatedBy = "USER" | "AGENT" | "ADMIN" | "SUPER_ADMIN";

export interface Commission {
  agentCommission: number;
  superAdminCommission: number;
  systemFee: number;
}

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Transaction {
  _id: string;
  from: UserInfo | null;
  to: UserInfo | null;
  fromWallet: string;
  toWallet: string;
  amount: number;
  type: TransactionType;
  initiatedBy: InitiatedBy;
  status: TransactionStatus;
  commission: Commission;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}