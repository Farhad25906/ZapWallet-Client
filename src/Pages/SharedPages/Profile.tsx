// Profile.tsx
import React, { useState, useEffect } from "react";
import {
  useMyDataUpdateMutation,
  useMyInfoQuery,
} from "@/redux/features/user/user.api";
import { useMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  User,
  Mail,
  Phone,
  CreditCard,
  MapPin,
  Edit,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Receipt,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import ZapWalletLoader from "@/utils/ZapWalletLoader";
import { IsActiveValues, type IUser } from "@/types/user.type";
import { WalletStatusValues, type WalletResponse } from "@/types/wallet.types";
import type { TransactionType } from "@/types/transaction.types";
import { useMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import EditProfileModal from "@/components/modules/ProfilePages/EditProfileModal";

// Type guard for IUser
const isIUser = (data: unknown): data is IUser => {
  return typeof data === 'object' && data !== null && 'name' in data;
};

// Type guard for WalletResponse
const isWalletResponse = (data: unknown): data is WalletResponse => {
  return typeof data === 'object' && data !== null && 'data' in data;
};

// Transaction icon helper function
const getTransactionIcon = (type: TransactionType): { icon: React.ComponentType<{ className?: string }>; color: string; bg: string } => {
  switch (type) {
    case "CASH_OUT":
      return { icon: ArrowUpRight, color: "text-red-600", bg: "bg-red-100" };
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
      return { icon: ArrowUpRight, color: "text-blue-600", bg: "bg-blue-100" };
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

const Profile: React.FC = () => {
  const { data, isLoading } = useMyInfoQuery(undefined);
  const { data: walletData } = useMyWalletQuery(undefined);
  const { data: transactionData } = useMyTransactionsQuery({ 
    page: 1, 
    limit: 3 
  });
  
  const [updateProfile, { isLoading: isUpdating }] = useMyDataUpdateMutation();

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [showBalance, setShowBalance] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    picture: "",
  });

  React.useEffect(() => {
    if (data?.data && isIUser(data.data)) {
      const userData = data.data;
      setFormData({
        name: userData.name || "",
        address: userData.address || "",
        picture: userData.picture || "",
      });
    }
  }, [data]);

  // Auto-hide balance after 10 seconds
  useEffect(() => {
    if (showBalance) {
      const timer = setTimeout(() => {
        setShowBalance(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showBalance]);

  const toggleBalance = (): void => {
    setShowBalance(!showBalance);
  };

  const handleSubmit = async (formData: { name: string; address: string; picture: string }): Promise<void> => {
    try {
      await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully!");
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    }
  };

  if (isLoading) return <ZapWalletLoader />;

  const userData = data?.data && isIUser(data.data) ? data.data : undefined;
  const wallet = (walletData && isWalletResponse(walletData)) 
    ? walletData.data?.data 
    : undefined;

  const latestTransactions = transactionData?.transactions?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#009689]">My Profile</h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">
              Manage your account information
            </p>
          </div>
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#009689] hover:bg-[#007a6e] text-white font-bold w-full sm:w-auto">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </DialogTrigger>
            <EditProfileModal
              formData={formData}
              setFormData={setFormData}
              isUpdating={isUpdating}
              onSubmit={handleSubmit}
              onCancel={() => setIsEditModalOpen(false)}
            />
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Profile Picture & Quick Info */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Profile Picture Card */}
            <Card className="border-2 border-[#009689]/20">
              <CardContent className="p-4 sm:p-6">
                <div className="relative group">
                  <div className="w-32 h-32 sm:w-full sm:aspect-square mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-[#009689] to-[#00c4b4] flex items-center justify-center">
                    {userData?.picture ? (
                      <img
                        src={userData.picture}
                        alt={userData.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-white text-3xl sm:text-6xl font-black">
                        {userData?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 text-center">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 line-clamp-2">
                    {userData?.name || "Unknown User"}
                  </h2>
                  <Badge className="mt-2 bg-[#009689] hover:bg-[#007a6e] text-white font-bold capitalize text-xs sm:text-sm">
                    {userData?.role?.toLowerCase() || "user"}
                  </Badge>
                </div>

                <Separator className="my-4" />

                {/* Wallet Balance Section */}
                <div className="bg-gradient-to-br from-[#ffd8af]/20 to-[#009689]/10 rounded-xl p-3 sm:p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-[#009689]" />
                      <span className="text-xs sm:text-sm font-bold text-slate-700">
                        Wallet Balance
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleBalance}
                      className="h-6 w-6 sm:h-8 sm:w-8"
                    >
                      {showBalance ? (
                        <EyeOff className="w-3 h-3 sm:w-4 sm:h-4 text-[#009689]" />
                      ) : (
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-[#009689]" />
                      )}
                    </Button>
                  </div>
                  <div className="text-center">
                    {showBalance ? (
                      <div className="space-y-1">
                        <p className="text-2xl sm:text-3xl font-black text-[#009689]">
                          ৳{wallet?.balance?.toLocaleString() || 0}
                        </p>
                        <p className="text-xs text-slate-600 font-semibold">
                          {wallet?.currency || "BDT"}
                        </p>
                      </div>
                    ) : (
                      <p className="text-2xl sm:text-3xl font-black text-slate-400">
                        ••••••
                      </p>
                    )}
                  </div>
                  <Badge
                    className={`mt-3 w-full justify-center text-xs ${
                      wallet?.walletStatus === WalletStatusValues.ACTIVE
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white font-semibold`}
                  >
                    {wallet?.walletStatus || "UNKNOWN"}
                  </Badge>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-600 font-semibold">Status</span>
                    <Badge
                      className={`text-xs ${
                        userData?.isActive === IsActiveValues.ACTIVE
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                      } text-white font-semibold capitalize`}
                    >
                      {userData?.isActive || "UNKNOWN"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-600 font-semibold">
                      Verified
                    </span>
                    {userData?.isVerified ? (
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                    )}
                  </div>
                  
                  {userData?.agentInfo && (
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-600 font-semibold">
                        Total Commission
                      </span>
                      <p className="text-sm sm:text-base font-bold text-[#009689]">
                        ৳{userData.agentInfo.totalCommission || 0}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-600 font-semibold">
                      Total Transactions
                    </span>
                    <Badge className="bg-[#ffd8af] text-[#009689] hover:bg-[#ffd8af] font-bold text-xs">
                      {transactionData?.total || 0}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Profile Information */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Personal Information */}
            <Card className="border-2 border-[#009689]/20">
              <CardHeader className="bg-gradient-to-r from-[#009689]/5 to-[#ffd8af]/5 p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl font-black text-[#009689] flex items-center gap-2">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-600">
                      Full Name
                    </span>
                    <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-900">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 text-[#009689]" />
                      {userData?.name || "Not provided"}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-600">
                      Email Address
                    </span>
                    <div className="flex items-center gap-2 text-sm sm:text-base font-medium text-slate-900">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-[#009689]" />
                      {userData?.email || "Not provided"}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-600">
                      Phone Number
                    </span>
                    <div className="flex items-center gap-2 text-sm sm:text-base font-medium text-slate-900">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-[#009689]" />
                      {userData?.phone || "Not provided"}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-600">
                      National ID (NID)
                    </span>
                    <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900">
                      <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-[#009689]" />
                      {userData?.nid || "Not provided"}
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-600">
                      Address
                    </span>
                    <div className="flex items-start gap-2 text-sm sm:text-base font-medium text-slate-900">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#009689] mt-1 flex-shrink-0" />
                      <span className="break-words">{userData?.address || "Not provided"}</span>
                    </div>
                  </div>

                  {userData?.agentInfo && (
                    <>
                      <div className="space-y-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-600">
                          TIN ID
                        </span>
                        <p className="text-sm sm:text-base font-bold text-slate-900">
                          {userData.agentInfo.tinId || "Not provided"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-600">
                          Approval Status
                        </span>
                        <Badge
                          className={`text-xs ${
                            userData.agentInfo.approvalStatus === "pending"
                              ? "bg-yellow-500"
                              : userData.agentInfo.approvalStatus === "approved"
                              ? "bg-green-500"
                              : "bg-red-500"
                          } text-white font-bold capitalize`}
                        >
                          {userData.agentInfo.approvalStatus || "unknown"}
                        </Badge>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-600">
                      Account Created
                    </span>
                    <p className="text-sm sm:text-base font-semibold text-slate-900">
                      {userData?.createdAt
                        ? new Date(userData.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "Not available"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-600">
                      Last Updated
                    </span>
                    <p className="text-sm sm:text-base font-semibold text-slate-900">
                      {userData?.updatedAt
                        ? new Date(userData.updatedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "Not available"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Latest Transactions */}
            <Card className="border-2 border-[#009689]/20">
              <CardHeader className="bg-gradient-to-r from-[#009689]/5 to-[#ffd8af]/5 p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl font-black text-[#009689] flex items-center gap-2">
                  <Receipt className="w-4 h-4 sm:w-5 sm:h-5" />
                  Latest Transactions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-4">
                {latestTransactions.length > 0 ? (
                  <div className="">
                    {latestTransactions.map((transaction) => {
                      const {
                        icon: Icon,
                        color,
                        bg,
                      } = getTransactionIcon(transaction.type);

                      return (
                        <div
                          key={transaction._id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:px-4 sm:py-3 bg-slate-50 rounded-lg hover:bg-[#009689]/5 transition-colors"
                        >
                          {/* Left Side - Icon & Details */}
                          <div className="flex items-start sm:items-center gap-3 flex-1 mb-3 sm:mb-0">
                            <div
                              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}
                            >
                              <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${color}`} />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                                <h3 className="font-black text-slate-900 text-sm sm:text-base">
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
                                    className={`text-xs ${
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
                              </div>

                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-slate-600">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {formatDate(transaction.createdAt)}
                                </span>
                                <span className="hidden sm:block">•</span>
                                <span className="text-xs">
                                  ID: {transaction._id.slice(-8)}
                                </span>
                              </div>

                              {/* User Information */}
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-slate-500 mt-1">
                                {transaction.from && (
                                  <span>From: {transaction.from.name}</span>
                                )}
                                {transaction.to && (
                                  <span>To: {transaction.to?.name || 'System'}</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Right Side - Amount */}
                          <div className="text-left sm:text-right">
                            <p
                              className={`text-lg sm:text-xl font-black ${
                                transaction.type === "CASH_IN" || transaction.type === "ADD_MONEY"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {(transaction.type === "CASH_IN" || transaction.type === "ADD_MONEY") ? "+" : "-"}৳
                              {transaction.amount.toLocaleString()}
                            </p>

                            {/* Commission Information */}
                            {(transaction.commission.systemFee > 0 ||
                              transaction.commission.agentCommission > 0 ||
                              transaction.commission.superAdminCommission > 0) && (
                              <div className="mt-2 space-y-1 flex flex-wrap gap-1">
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
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Receipt className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-600 font-semibold text-sm sm:text-base">
                      No transactions yet
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Your transaction history will appear here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;