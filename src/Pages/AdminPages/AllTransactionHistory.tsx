import React, { useState } from "react";
import { useAllTransactionsQuery } from "@/redux/features/transaction/transaction.api";
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
  ChevronDown,
  ChevronUp,
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
import { Input } from "@/components/ui/input";
import type { TransactionType } from "@/types/transaction.types";

type TransactionIcon = {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
};

type FilterState = {
  type?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
};

const AllTransactionHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState<FilterState>({});
  const [expandedTransaction, setExpandedTransaction] = useState<string | null>(null);

  const { data, isLoading } = useAllTransactionsQuery({
    page: currentPage,
    limit: 10,
    ...filters,
  });

  console.log(data);

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

  const handleClearTempFilters = () => {
    setTempFilters({});
  };

  const toggleTransactionExpand = (transactionId: string) => {
    setExpandedTransaction(expandedTransaction === transactionId ? null : transactionId);
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  if (isLoading) return <ZapWalletLoader />;

  const transactions = data?.transactions || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#009689]">
              Transaction History
            </h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">
              View and manage all your transactions
            </p>
          </div>
          <div className="relative flex justify-center sm:justify-end">
            <Button
              variant="outline"
              className="border-2 border-[#009689] text-[#009689] hover:bg-[#009689] hover:text-white font-bold w-full sm:w-auto"
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
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="text-sm font-semibold text-slate-600">
              Active Filters:
            </span>
            {filters.type && (
              <Badge variant="outline" className="gap-2 text-xs">
                Type: {filters.type.replace(/_/g, " ")}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => {
                    const { type, ...rest } = filters;
                    setFilters(rest);
                    setCurrentPage(1);
                  }}
                />
              </Badge>
            )}
            {filters.status && (
              <Badge variant="outline" className="gap-2 text-xs">
                Status: {filters.status}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => {
                    const { status, ...rest } = filters;
                    setFilters(rest);
                    setCurrentPage(1);
                  }}
                />
              </Badge>
            )}
            {filters.startDate && filters.endDate && (
              <Badge variant="outline" className="gap-2 text-xs">
                Date: {filters.startDate} to {filters.endDate}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => {
                    const { startDate, endDate, ...rest } = filters;
                    setFilters(rest);
                    setCurrentPage(1);
                  }}
                />
              </Badge>
            )}
            {(filters.minAmount !== undefined ||
              filters.maxAmount !== undefined) && (
              <Badge variant="outline" className="gap-2 text-xs">
                Amount:
                {filters.minAmount !== undefined &&
                  ` Min: ৳${filters.minAmount}`}
                {filters.maxAmount !== undefined &&
                  ` Max: ৳${filters.maxAmount}`}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => {
                    const { minAmount, maxAmount, ...rest } = filters;
                    setFilters(rest);
                    setCurrentPage(1);
                  }}
                />
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-red-600 hover:text-red-700 text-xs"
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Transactions List */}
        <Card className="border-2 border-[#009689]/20">
          <CardHeader className="bg-gradient-to-r from-[#009689]/5 to-[#ffd8af]/5">
            <CardTitle className="text-xl sm:text-2xl font-black text-[#009689] flex items-center gap-2 justify-center sm:justify-start">
              <Receipt className="w-5 h-5 sm:w-6 sm:h-6" />
              All Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {transactions.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Receipt className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
                </div>
                <p className="text-slate-600 font-semibold text-base sm:text-lg">
                  No transactions found
                </p>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
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
                  const isExpanded = expandedTransaction === transaction._id;

                  return (
                    <div
                      key={`${transaction._id}-${currentPage}`}
                      className="p-4 sm:p-6 hover:bg-[#009689]/5 transition-colors cursor-pointer"
                      onClick={() => toggleTransactionExpand(transaction._id)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                        {/* Left Side - Icon & Details */}
                        <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                          <div
                            className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}
                          >
                            <Icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${color}`} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                              <h3 className="font-black text-base sm:text-lg text-slate-900 truncate">
                                {transaction.type.replace(/_/g, " ")}
                              </h3>
                              <div className="flex flex-wrap gap-1">
                                <Badge
                                  className={`${getTransactionBadgeColor(
                                    transaction.type
                                  )} text-white font-semibold text-xs`}
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
                                  } text-white text-xs`}
                                >
                                  {transaction.status}
                                </Badge>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-slate-600">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                {formatDate(transaction.createdAt)}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="w-3 h-3 sm:w-4 sm:h-4" />
                                ID: {transaction._id.slice(-8)}
                              </span>
                            </div>

                            {/* Expanded Details */}
                            {isExpanded && (
                              <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
                                {/* User Information */}
                                <div className="flex flex-col gap-1 text-xs text-slate-500">
                                  {transaction.from && (
                                    <span>From: {transaction.from.name}</span>
                                  )}
                                  {transaction.to && (
                                    <span>
                                      To: {transaction.to?.name || "System"}
                                    </span>
                                  )}
                                </div>

                                {/* Commission Details */}
                                {(transaction.commission.systemFee > 0 ||
                                  transaction.commission.agentCommission > 0 ||
                                  transaction.commission.superAdminCommission > 0) && (
                                  <div className="flex flex-wrap gap-1">
                                    {transaction.commission.systemFee > 0 && (
                                      <Badge variant="outline" className="text-xs">
                                        System Fee: ৳{transaction.commission.systemFee}
                                      </Badge>
                                    )}
                                    {(transaction.commission.agentCommission > 0 ||
                                      transaction.commission.superAdminCommission > 0) && (
                                      <Badge variant="outline" className="text-xs">
                                        Fees: ৳
                                        {transaction.commission.agentCommission +
                                          transaction.commission.superAdminCommission}
                                      </Badge>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right Side - Amount & Expand Button */}
                        <div className="flex items-center justify-between sm:justify-end gap-2 sm:ml-4">
                          <p
                            className={`text-xl sm:text-2xl font-black ${
                              transaction.type === "CASH_IN" ||
                              transaction.type === "ADD_MONEY"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.type === "CASH_IN" ||
                            transaction.type === "ADD_MONEY"
                              ? "+"
                              : "-"}
                            ৳{transaction.amount.toLocaleString()}
                          </p>
                          
                          {/* Mobile Expand Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="sm:hidden p-1 h-auto"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTransactionExpand(transaction._id);
                            }}
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Commission Details - Desktop (always visible) */}
                      <div className="hidden sm:block mt-2">
                        {(transaction.commission.systemFee > 0 ||
                          transaction.commission.agentCommission > 0 ||
                          transaction.commission.superAdminCommission > 0) && (
                          <div className="flex flex-wrap gap-1">
                            {transaction.commission.systemFee > 0 && (
                              <Badge variant="outline" className="text-xs">
                                System Fee: ৳{transaction.commission.systemFee}
                              </Badge>
                            )}
                            {(transaction.commission.agentCommission > 0 ||
                              transaction.commission.superAdminCommission > 0) && (
                              <Badge variant="outline" className="text-xs">
                                Fees: ৳
                                {transaction.commission.agentCommission +
                                  transaction.commission.superAdminCommission}
                              </Badge>
                            )}
                          </div>
                        )}
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
          <div className="flex justify-center sm:justify-end mt-4">
            <div className="w-full sm:w-auto">
              <Pagination>
                <PaginationContent className="flex-wrap">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                  {Array.from(
                    { length: Math.min(totalPages, 5) }, // Show max 5 pages on mobile
                    (_, index) => index + 1
                  ).map((page) => (
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
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
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
        <DialogContent className="sm:max-w-[500px] w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-black text-[#009689]">
              Filter Transactions
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type" className="font-semibold text-sm sm:text-base">
                  Transaction Type
                </Label>
                <Select
                  value={tempFilters.type || ""}
                  onValueChange={(value) =>
                    setTempFilters({ ...tempFilters, type: value || undefined })
                  }
                >
                  <SelectTrigger id="type" className="text-sm sm:text-base">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CASH_IN">Cash In</SelectItem>
                    <SelectItem value="CASH_OUT">Cash Out</SelectItem>
                    <SelectItem value="WITHDRAW">Withdraw</SelectItem>
                    <SelectItem value="ADD_MONEY">Add Money</SelectItem>
                    <SelectItem value="SEND_MONEY">Send Money</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="font-semibold text-sm sm:text-base">
                  Status
                </Label>
                <Select
                  value={tempFilters.status || ""}
                  onValueChange={(value) =>
                    setTempFilters({
                      ...tempFilters,
                      status: value || undefined,
                    })
                  }
                >
                  <SelectTrigger id="status" className="text-sm sm:text-base">
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
            {/* Date Range Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="font-semibold text-sm sm:text-base">
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={tempFilters.startDate || ""}
                  onChange={(e) =>
                    setTempFilters({
                      ...tempFilters,
                      startDate: e.target.value || undefined,
                    })
                  }
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="font-semibold text-sm sm:text-base">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={tempFilters.endDate || ""}
                  onChange={(e) =>
                    setTempFilters({
                      ...tempFilters,
                      endDate: e.target.value || undefined,
                    })
                  }
                  className="text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Amount Range Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minAmount" className="font-semibold text-sm sm:text-base">
                  Min Amount (৳)
                </Label>
                <Input
                  id="minAmount"
                  type="number"
                  placeholder="0"
                  value={tempFilters.minAmount || ""}
                  onChange={(e) =>
                    setTempFilters({
                      ...tempFilters,
                      minAmount: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    })
                  }
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxAmount" className="font-semibold text-sm sm:text-base">
                  Max Amount (৳)
                </Label>
                <Input
                  id="maxAmount"
                  type="number"
                  placeholder="100000"
                  value={tempFilters.maxAmount || ""}
                  onChange={(e) =>
                    setTempFilters({
                      ...tempFilters,
                      maxAmount: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    })
                  }
                  className="text-sm sm:text-base"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2 flex-col sm:flex-row">
            <Button variant="outline" onClick={handleClearTempFilters} className="w-full sm:w-auto">
              Clear
            </Button>
            <Button
              onClick={handleApplyFilters}
              className="bg-[#009689] hover:bg-[#007d71] text-white font-bold w-full sm:w-auto"
            >
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllTransactionHistory;