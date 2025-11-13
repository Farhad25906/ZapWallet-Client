import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myInfo: builder.query({
      query: () => ({
        url: "/user/myInfo",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    pendingAgents: builder.query({
      query: () => ({
        url: "/user/pending-agents",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    approveAgent: builder.mutation({
      query: ({ agentId, approvalStatus }) => ({
        url: `/user/agent-approve/${agentId}`,
        method: "PATCH",
        data: { approvalStatus },
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["USER"],
    }),
    allAgents: builder.query({
      query: () => ({
        url: "/user/all-agents",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    allUsers: builder.query({
      query: () => ({
        url: "/user/all-users",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    changeActivityStatus: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `/user/change-status/${id}`,
        method: "PATCH",
        data: { isActive },
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["USER"],
    }),
    myInfoUpdate: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `/user/change-status/${id}`,
        method: "PATCH",
        data: { isActive },
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["USER"],
    }),
     myDataUpdate: builder.mutation({
      query:  (data) => ({
        url: `/user/myInfo`,
        method: "PATCH",
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useMyInfoQuery,
  usePendingAgentsQuery,
  useApproveAgentMutation,
  useAllAgentsQuery,
  useAllUsersQuery,
  useChangeActivityStatusMutation,
  useMyInfoUpdateMutation,
  useMyDataUpdateMutation
} = userApi;
