import { baseApi } from "@/redux/baseApi";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myWallet: builder.query({
      query: () => ({
        url: "/wallet/my-wallet",
        method: "GET",
      }),
      providesTags: ["WALLET","TRANSACTION"],
    }),
    agentAddMoney: builder.mutation({
      query: (fundData) => ({
        url: "/wallet/add-money",
        method: "POST",
        data: fundData,
      }),
      invalidatesTags: ["WALLET","TRANSACTION"],
    }),
    cashIn: builder.mutation({
      query: (cashInData) => ({
        url: "/wallet/cash-in",
        method: "POST",
        data: cashInData,
      }),
      invalidatesTags: ["WALLET","TRANSACTION"],
    }),
    sendMoney: builder.mutation({
      query: (sendMoneyData) => ({
        url: "/wallet/send-money",
        method: "POST",
        data: sendMoneyData,
      }),
      invalidatesTags: ["WALLET","TRANSACTION"],
    }),
    cashOut: builder.mutation({
      query: (cashOutData) => ({
        url: "/wallet/cash-out",
        method: "POST",
        data: cashOutData,
      }),
      invalidatesTags: ["WALLET","TRANSACTION"],
    }),
    WithdrawMoney: builder.mutation({
      query: (cashOutData) => ({
        url: "/wallet/withdraw",
        method: "POST",
        data: cashOutData,
      }),
      invalidatesTags: ["WALLET","TRANSACTION"],
    }),

    
  }),
});

export const { useMyWalletQuery, useAgentAddMoneyMutation,useCashInMutation,useSendMoneyMutation,useCashOutMutation,useWithdrawMoneyMutation } = walletApi;
