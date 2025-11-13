// Revenue.tsx (Admin Page)
import { useState } from "react";
import {
  useAdminCommissionTotalQuery,
  useAdminCommissionTransactionQuery,
} from "@/redux/features/commission/commission.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  Send,
  Calendar,
  PieChart,
} from "lucide-react";
import ZapWalletLoader from "@/utils/ZapWalletLoader";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type {
  ICommissionSummary,
  ICommissionTransaction,
  ICommissionTransactionsData,
} from "@/types/commission.type";

const Revenue = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: commissionData,
    isLoading: loadingCommission,
    error: commissionError,
  } = useAdminCommissionTotalQuery(undefined);

  const {
    data: transactionData,
    isLoading: loadingTransactions,
    error: transactionError,
  } = useAdminCommissionTransactionQuery({
    page: currentPage,
    limit: 10,
  });


  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loadingCommission || loadingTransactions) return <ZapWalletLoader />;

  if (commissionError || transactionError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Error Loading Data
          </h2>
          <p className="text-slate-600">Please try again later</p>
        </div>
      </div>
    );
  }

  // Use actual data or provide safe defaults
  const commission: ICommissionSummary = commissionData || {
    totalCommission: 0,
    superAdminCommission: 0,
    systemFee: 0,
    transactionCount: 0,
  };

  const transactionsData: ICommissionTransactionsData = transactionData || {
    transactions: [],
    total: 0,
    page: 1,
    totalPages: 1,
  };

  const transactions: ICommissionTransaction[] = transactionsData.transactions;
  const totalPages = transactionsData.totalPages;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-[#009689]">
              Revenue Dashboard
            </h1>
            <p className="text-slate-600 mt-1">
              Track your commission earnings
            </p>
          </div>
          <Badge className="bg-[#ffd8af] text-[#009689] hover:bg-[#ffd8af] font-bold text-base px-4 py-2">
            <PieChart className="w-4 h-4 mr-2" />
            Admin Commission
          </Badge>
        </div>

        {/* Commission Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Total Commission */}
          <Card className="border-2 border-[#009689]/20 hover:shadow-2xl transition-all bg-gradient-to-br from-[#009689] to-[#00c4b4] text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-white/80">
                  Total Commission
                </p>
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-4xl font-black mb-1">
                ৳{commission.totalCommission.toLocaleString()}
              </p>
              <p className="text-sm text-white/80">All Time Earnings</p>
            </CardContent>
          </Card>

          {/* Cash Out Commission */}
          <Card className="border-2 border-green-200 hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-slate-600">
                  Cash Out Commission
                </p>
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <ArrowUpRight className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-4xl font-black text-green-600 mb-1">
                ৳{commission?.cashOutFee}
              </p>
              <p className="text-sm text-slate-600">
                From Cash Out Transactions
              </p>
            </CardContent>
          </Card>

          {/* Send Money Commission */}
          <Card className="border-2 border-blue-200 hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-slate-600">
                  Send Money Commission
                </p>
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Send className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-4xl font-black text-blue-600 mb-1">
                ৳{commission?.sendMoney}
              </p>
              <p className="text-sm text-slate-600">
                From Send Money Transactions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Commission Breakdown Chart */}
        <Card className="border-2 border-[#ffd8af]/50">
          <CardHeader className="bg-gradient-to-r from-[#ffd8af]/10 to-[#009689]/5">
            <CardTitle className="text-xl font-black text-[#009689] flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Commission Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Cash Out Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-700">
                    Cash Out
                  </span>
                  <span className="text-sm font-bold text-green-600">
                    ৳{commission?.cashOutFee}
                  </span>
                </div>
                <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
                    style={{
                      width:
                        commission.totalCommission > 0
                          ? `${
                              ((commission.cashOutFee ?? 0) /
                                commission.totalCommission) *
                              100
                            }%`
                          : "0%",
                    }}
                  ></div>
                </div>
              </div>

              {/* Send Money Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-700">
                    Send Money
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    ৳{commission?.sendMoney}
                  </span>
                </div>
                <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                    style={{
                      width:
                        commission.totalCommission > 0
                          ? `${
                              ((commission?.sendMoney ?? 0) /
                                commission.totalCommission) *
                              100
                            }%`
                          : "0%",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Commission Transactions */}
        <Card className="border-2 border-[#009689]/20">
          <CardHeader className="bg-gradient-to-r from-[#009689]/5 to-[#ffd8af]/5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-black text-[#009689] flex items-center gap-2">
                <DollarSign className="w-6 h-6" />
                Commission Transactions
              </CardTitle>
              <Badge
                variant="outline"
                className="font-bold text-[#009689] border-[#009689]"
              >
                {transactionsData.total} Total
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {transactions.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-10 h-10 text-slate-400" />
                </div>
                <p className="text-slate-600 font-semibold text-lg">
                  No commission transactions yet
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Your commission earnings will appear here
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {transactions.map((transaction: ICommissionTransaction) => (
                  <div
                    key={`${transaction._id}-${currentPage}`}
                    className="p-6 hover:bg-[#009689]/5 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      {/* Left Side - Transaction Details */}
                      <div className="flex items-start gap-4 flex-1">
                        <div
                          className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            transaction.type === "CASH_OUT"
                              ? "bg-red-100"
                              : "bg-blue-100"
                          }`}
                        >
                          {transaction.type === "CASH_OUT" ? (
                            <ArrowUpRight className="w-7 h-7 text-red-600" />
                          ) : (
                            <Send className="w-7 h-7 text-blue-600" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-black text-lg text-slate-900">
                              {transaction.type.replace(/_/g, " ")}
                            </h3>
                            <Badge
                              className={`${
                                transaction.type === "CASH_OUT"
                                  ? "bg-red-500"
                                  : "bg-blue-500"
                              } text-white font-semibold`}
                            >
                              Admin Commission
                            </Badge>
                          </div>

                          {/* From & To Users */}
                          <div className="grid md:grid-cols-2 gap-4 mb-2">
                            <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                              <p className="text-xs font-bold text-red-900 mb-1">
                                From (User)
                              </p>
                              <p className="text-sm font-bold text-slate-900">
                                {transaction.from.name}
                              </p>
                              <p className="text-xs text-slate-600">
                                {transaction.from.phone}
                              </p>
                            </div>
                            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                              <p className="text-xs font-bold text-green-900 mb-1">
                                To (Agent)
                              </p>
                              <p className="text-sm font-bold text-slate-900">
                                {transaction.to.name}
                              </p>
                              <p className="text-xs text-slate-600">
                                {transaction.to.phone}
                              </p>
                            </div>
                          </div>

                          {/* Commission Breakdown */}
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">
                              Agent: ৳{transaction.commission.agentCommission}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Super Admin: ৳
                              {transaction.commission.superAdminCommission}
                            </Badge>
                            {transaction.commission.systemFee > 0 && (
                              <Badge variant="outline" className="text-xs">
                                System Fee: ৳{transaction.commission.systemFee}
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-2 mt-2 text-sm text-slate-600">
                            <Calendar className="w-4 h-4" />
                            {formatDate(transaction.createdAt)}
                          </div>
                        </div>
                      </div>

                      {/* Right Side - Amount & Commission */}
                      <div className="text-right ml-4">
                        <p className="text-xs font-semibold text-slate-600 mb-1">
                          Transaction Amount
                        </p>
                        <p className="text-2xl font-black text-slate-900 mb-2">
                          ৳{transaction.amount.toLocaleString()}
                        </p>
                        <div className="bg-[#009689]/10 rounded-lg px-3 py-2 border-2 border-[#009689]">
                          <p className="text-xs font-semibold text-[#009689] mb-1">
                            Your Commission
                          </p>
                          <p className="text-xl font-black text-[#009689]">
                            +৳
                            {transaction.type === "CASH_OUT"
                              ? transaction.commission.superAdminCommission.toLocaleString()
                              : transaction.commission.systemFee.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination - Same as AllTransactionHistory */}
        {totalPages > 1 && (
          <div className="flex justify-end mt-4">
            <div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => {
                        if (currentPage > 1) {
                          setCurrentPage(currentPage - 1);
                        }
                      }}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={currentPage === page}
                        onClick={() => setCurrentPage(page)}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => {
                        if (currentPage < totalPages) {
                          setCurrentPage(currentPage + 1);
                        }
                      }}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Revenue;
