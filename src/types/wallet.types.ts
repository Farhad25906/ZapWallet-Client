
import type { WALLET_STATUS } from "./index";

export const WalletStatusValues = {
  ACTIVE: "ACTIVE" as WALLET_STATUS,
  BLOCKED: "BLOCKED" as WALLET_STATUS,
};

// User type for the nested user object
export interface WalletUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  nid: string;
  role: string;
}

export interface TransactionInfo {
  _id: string;
  amount: number;
  type: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Wallet {
  _id: string;
  user: WalletUser; // Now it's the full user object, not just ID
  balance: number;
  currency: string;
  walletStatus: WALLET_STATUS;
  transactions: TransactionInfo[] | string[];
  createdAt: string;
  updatedAt: string;
}

// Response types matching your actual API structure
export interface WalletResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    data: Wallet; // Nested data structure
  };
}

export interface WalletsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    data: Wallet[]; // For multiple wallets
  };
}

export interface BalanceCheckResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    data: {
      isAvailable: boolean;
      currentBalance: number;
      requestedAmount: number;
    };
  };
}

export interface TransferRequest {
  senderWallet: string;
  receiverWallet: string;
  amount: number;
  description?: string;
}

export interface TransferResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    data: {
      transactionId: string;
      senderWallet: string;
      receiverWallet: string;
      amount: number;
      newBalance: number;
    };
  };
}