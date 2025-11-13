// commission.api.ts
import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type {
  ICommissionSummary,
  ICommissionTransactionsData,
} from "@/types/commission.type";

export const commissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminCommissionTotal: builder.query<ICommissionSummary, void>({
      query: () => ({
        url: "/commission/admin/total",
        method: "GET",
      }),
      providesTags: ["TRANSACTION", "WALLET"],
      transformResponse: (
        response: IResponse<ICommissionSummary>
      ): ICommissionSummary => response.data,
    }),

    agentCommissionTotal: builder.query<ICommissionSummary, void>({
      query: () => ({
        url: "/commission/agent/total",
        method: "GET",
      }),
      providesTags: ["TRANSACTION", "WALLET"],
      transformResponse: (
        response: IResponse<ICommissionSummary>
      ): ICommissionSummary => response.data,
    }),

    adminCommissionTransaction: builder.query({
      query: (params: { page?: number; limit?: number } = {}) => ({
        url: "/commission/admin/transactions",
        method: "GET",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
        },
      }),
      providesTags: ["TRANSACTION", "WALLET"],
      transformResponse: (
        response: IResponse<ICommissionTransactionsData>
      ): ICommissionTransactionsData => response.data,
    }),

    agentCommissionTransaction: builder.query({
      query: (params: { page?: number; limit?: number } = {}) => ({
        url: "/commission/agent/transactions",
        method: "GET",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
        },
      }),
      providesTags: ["TRANSACTION", "WALLET"],
      transformResponse: (
        response: IResponse<ICommissionTransactionsData>
      ): ICommissionTransactionsData => response.data,
    }),
  }),
});

export const {
  useAdminCommissionTotalQuery,
  useAdminCommissionTransactionQuery,
  useAgentCommissionTotalQuery,
  useAgentCommissionTransactionQuery,
} = commissionApi;
