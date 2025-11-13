import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { TransactionsResponse } from "@/types/transaction.types";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myTransactions: builder.query({
      query: (params) => ({
        url: "/transactions/my-transactions",
        method: "GET",
        params: params, 
      }),
      providesTags: ["TRANSACTION","WALLET"],
      transformResponse: (response: IResponse<TransactionsResponse>) => response.data,
    }),

    allTransactions: builder.query({
      query: (params) => ({
        url: "/transactions/all",
        method: "GET",
        params: params, 
      }),
      providesTags: ["TRANSACTION","WALLET"],
      transformResponse: (response: IResponse<TransactionsResponse>) => response.data,
    }),
  }),
});

export const { useMyTransactionsQuery,useAllTransactionsQuery } = walletApi;
