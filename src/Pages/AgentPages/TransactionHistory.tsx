import React, { useState } from "react";
import { useMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Send,
  Wallet,
  Receipt,
  Calendar,
  User,
  Filter,
  X,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { TransactionType } from "@/types/transaction.types";







type TransactionIcon = {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
};

type FilterState = {
  type?: string;
  status?: string;
};

const TransactionHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState<FilterState>({});

  const { data, isLoading } = useMyTransactionsQuery({ 
    page: currentPage,
    limit: 10,
    ...filters 
  });


  const getTransactionIcon = (type: TransactionType): TransactionIcon => {
    switch (type) {
      case "CASH_OUT":
        return { icon: Send, color: "text-blue-600", bg: "bg-blue-100" };
      case "WITHDRAW":
        return { icon: ArrowUpRight, color: "text-red-600", bg: "bg-red-100" };
      case "CASH_IN":
      case "ADD_MONEY":
        return {
          icon: ArrowDownLeft,
          color: "text-green-600",
          bg: "bg-green-100",
        };
      case "SEND_MONEY":
        return { icon: Send, color: "text-blue-600", bg: "bg-blue-100" };
      default:
        return { icon: Wallet, color: "text-slate-600", bg: "bg-slate-100" };
    }
  };

  const getTransactionBadgeColor = (type: TransactionType): string => {
    switch (type) {
      case "CASH_OUT":
      case "WITHDRAW":
        return "bg-red-500 hover:bg-red-600";
      case "CASH_IN":
      case "ADD_MONEY":
        return "bg-green-500 hover:bg-green-600";
      case "SEND_MONEY":
        return "bg-blue-500 hover:bg-blue-600";
      default:
        return "bg-slate-500 hover:bg-slate-600";
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleApplyFilters = () => {
    setFilters(tempFilters);
    setCurrentPage(1); 
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setTempFilters({});
    setFilters({});
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  if (isLoading) return <ZapWalletLoader />;

  const transactions = data?.transactions || [];
  const totalPages = data?.totalPages || 1;



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-[#009689]">
              Transaction History
            </h1>
            <p className="text-slate-600 mt-1">
              View and manage all your transactions
            </p>
          </div>
          <div className="relative">
            <Button
              variant="outline"
              className="border-2 border-[#009689] text-[#009689] hover:bg-[#009689] hover:text-white font-bold"
              onClick={() => {
                setTempFilters(filters);
                setIsFilterOpen(true);
              }}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
              {activeFilterCount > 0 && (
                <Badge className="ml-2 bg-[#009689] text-white">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Active Filters Display */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-slate-600">Active Filters:</span>
            {filters.type && (
              <Badge variant="outline" className="gap-2">
                Type: {filters.type.replace(/_/g, " ")}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => {
                    setFilters({ ...filters, type: undefined });
                    setCurrentPage(1);
                  }}
                />
              </Badge>
            )}
            {filters.status && (
              <Badge variant="outline" className="gap-2">
                Status: {filters.status}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => {
                    setFilters({ ...filters, status: undefined });
                    setCurrentPage(1);
                  }}
                />
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-red-600 hover:text-red-700"
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Transactions List */}
        <Card className="border-2 border-[#009689]/20">
          <CardHeader className="bg-gradient-to-r from-[#009689]/5 to-[#ffd8af]/5">
            <CardTitle className="text-2xl font-black text-[#009689] flex items-center gap-2">
              <Receipt className="w-6 h-6" />
              All Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {transactions.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Receipt className="w-10 h-10 text-slate-400" />
                </div>
                <p className="text-slate-600 font-semibold text-lg">
                  No transactions found
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {activeFilterCount > 0
                    ? "Try adjusting your filters"
                    : "Your transaction history will appear here"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {transactions.map((transaction) => {
                  const {
                    icon: Icon,
                    color,
                    bg,
                  } = getTransactionIcon(transaction.type);

                  return (
                    <div
                      key={`${transaction._id}-${currentPage}`}
                      className="p-6 hover:bg-[#009689]/5 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        {/* Left Side - Icon & Details */}
                        <div className="flex items-center gap-4 flex-1">
                          <div
                            className={`w-14 h-14 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}
                          >
                            <Icon className={`w-7 h-7 ${color}`} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-black text-lg text-slate-900">
                                {transaction.type.replace(/_/g, " ")}
                              </h3>
                              <Badge
                                className={`${getTransactionBadgeColor(
                                  transaction.type
                                )} text-white font-semibold`}
                              >
                                {transaction.initiatedBy}
                              </Badge>
                              <Badge 
                                className={`${
                                  transaction.status === "COMPLETED" 
                                    ? "bg-green-500" 
                                    : transaction.status === "PENDING"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                } text-white`}
                              >
                                {transaction.status}
                              </Badge>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-slate-600">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(transaction.createdAt)}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                ID: {transaction._id.slice(-8)}
                              </span>
                            </div>

                            {/* User Information */}
                            <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                              {transaction.from && (
                                <span>From: {transaction.from.name}</span>
                              )}
                              {transaction.to && (
                                <span>To: {transaction.to?.name || 'System'}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right Side - Amount & Commissions */}
                        <div className="text-right ml-4">
                          <p
                            className={`text-2xl font-black ${
                              transaction.type === "CASH_IN" || transaction.type === "ADD_MONEY"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {(transaction.type === "CASH_IN" || transaction.type === "ADD_MONEY") ? "+" : "-"}৳
                            {transaction.amount.toLocaleString()}
                          </p>

                          {(transaction.commission.systemFee > 0 ||
                            transaction.commission.agentCommission > 0 ||
                            transaction.commission.superAdminCommission > 0) && (
                            <div className="mt-2 space-y-1">
                              {transaction.commission.systemFee > 0 && (
                                <Badge variant="outline" className="text-xs">
                                  System Fee: ৳{transaction.commission.systemFee}
                                </Badge>
                              )}
                              {(transaction.commission.agentCommission > 0 ||
                                transaction.commission.superAdminCommission > 0) && (
                                <Badge variant="outline" className="text-xs ml-1">
                                  Fees: ৳
                                  {transaction.commission.agentCommission +
                                    transaction.commission.superAdminCommission}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end mt-4">
            <div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <PaginationItem
                      key={page}
                      onClick={() => setCurrentPage(page)}
                    >
                      <PaginationLink isActive={currentPage === page}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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

      {/* Filter Dialog */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-[#009689]">
              Filter Transactions
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="type" className="font-semibold">
                Transaction Type
              </Label>
              <Select
                value={tempFilters.type || ""}
                onValueChange={(value) =>
                  setTempFilters({ ...tempFilters, type: value || undefined })
                }
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CASH_IN">Cash In</SelectItem>
                  <SelectItem value="WITHDRAW">Withdraw</SelectItem>
                  <SelectItem value="ADD_MONEY">Add Money</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="font-semibold">
                Status
              </Label>
              <Select
                value={tempFilters.status || ""}
                onValueChange={(value) =>
                  setTempFilters({ ...tempFilters, status: value || undefined })
                }
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setTempFilters({});
              }}
            >
              Clear
            </Button>
            <Button
              onClick={handleApplyFilters}
              className="bg-[#009689] hover:bg-[#007d71] text-white font-bold"
            >
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionHistory;