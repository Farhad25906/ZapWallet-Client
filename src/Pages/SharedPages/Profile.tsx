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
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/modules/HomePages/SectionHeader";

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

  useEffect(() => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-transparent p-4 sm:p-6 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeader
            badge="My Account"
            title="Personal Profile"
            subtitle="Manage your personal information, security preferences, and view your latest activities."
            center={false}
          />
          <motion.div variants={itemVariants} className="mb-20">
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#009689] hover:bg-[#007a6e] text-white font-black px-8 py-7 rounded-2xl shadow-xl transition-all hover:scale-105">
                  <Edit className="w-5 h-5 mr-3" />
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
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Picture & Quick Info */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-8">
            {/* Profile Picture Card */}
            <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white">
              <CardContent className="p-8">
                <div className="relative group mx-auto mb-8">
                  <div className="absolute -inset-2 bg-gradient-to-br from-[#009689] to-[#ffd8af] rounded-[2.5rem] opacity-20 group-hover:opacity-40 transition-opacity blur"></div>
                  <div className="relative w-48 h-48 mx-auto rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#009689] to-[#00c4b4] flex items-center justify-center shadow-inner">
                    {userData?.picture ? (
                      <img
                        src={userData.picture}
                        alt={userData.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="text-white text-7xl font-black">
                        {userData?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <h2 className="text-3xl font-black text-slate-900 mb-2 truncate px-2">
                    {userData?.name || "Unknown User"}
                  </h2>
                  <Badge className="bg-[#009689] hover:bg-[#007a6e] text-white font-black px-6 py-1.5 rounded-xl uppercase tracking-tighter text-sm shadow-md">
                    {userData?.role?.toLowerCase() || "user"}
                  </Badge>
                </div>

                <Separator className="my-8 bg-slate-100" />

                {/* Wallet Balance Section */}
                <div className="bg-slate-50 border-2 border-[#009689]/10 rounded-[2rem] p-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#ffd8af]/20 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150"></div>
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#009689] text-white rounded-lg flex items-center justify-center shadow-lg">
                        <Wallet className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-black text-slate-700 uppercase tracking-tighter">
                        Balance
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleBalance}
                      className="h-10 w-10 hover:bg-[#009689]/10 rounded-full"
                    >
                      {showBalance ? (
                        <EyeOff className="w-5 h-5 text-[#009689]" />
                      ) : (
                        <Eye className="w-5 h-5 text-[#009689]" />
                      )}
                    </Button>
                  </div>
                  <div className="text-center relative z-10">
                    <AnimatePresence mode="wait">
                      {showBalance ? (
                        <motion.div
                          key="bal"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <p className="text-4xl font-black text-[#009689] tracking-tighter">
                            ৳{wallet?.balance?.toLocaleString() || 0}
                          </p>
                          <p className="text-xs text-slate-400 font-bold tracking-[0.2em] mt-1 uppercase">
                            {wallet?.currency || "BDT"}
                          </p>
                        </motion.div>
                      ) : (
                        <motion.p
                          key="hid"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-4xl font-black text-slate-200 tracking-[0.3em]"
                        >
                          ••••••
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <Badge
                    className={`mt-6 w-full justify-center py-2.5 rounded-xl border-none font-black text-xs h-9 ${wallet?.walletStatus === WalletStatusValues.ACTIVE
                        ? "bg-green-500 text-white shadow-green-200 shadow-lg"
                        : "bg-red-500 text-white shadow-red-200 shadow-lg"
                      }`}
                  >
                    {wallet?.walletStatus || "UNKNOWN"}
                  </Badge>
                </div>

                <div className="space-y-4 mt-8">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <span className="text-sm font-bold text-slate-500">Status</span>
                    <Badge
                      className={`font-black uppercase tracking-tighter ${userData?.isActive === IsActiveValues.ACTIVE
                          ? "bg-green-100 text-green-600 hover:bg-green-100"
                          : "bg-red-100 text-red-600 hover:bg-red-100"
                        } border-none`}
                    >
                      {userData?.isActive || "UNKNOWN"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <span className="text-sm font-bold text-slate-500">
                      Verified
                    </span>
                    {userData?.isVerified ? (
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg">
                        <XCircle className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Profile Information */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white">
              <CardHeader className="bg-gradient-to-r from-[#009689]/5 to-[#ffd8af]/5 p-8 border-b border-slate-50">
                <CardTitle className="text-2xl font-black text-slate-900 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[#009689]">
                    <User className="w-7 h-7" />
                  </div>
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      Full Legal Name
                    </span>
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border-2 border-transparent hover:border-[#009689]/20 transition-all group">
                      <User className="w-5 h-5 text-[#009689] transition-transform group-hover:scale-125" />
                      <span className="font-black text-slate-800 text-lg">{userData?.name || "Not provided"}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      Email Address
                    </span>
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border-2 border-transparent hover:border-[#009689]/20 transition-all group">
                      <Mail className="w-5 h-5 text-[#009689] transition-transform group-hover:scale-125" />
                      <span className="font-bold text-slate-600 text-base">{userData?.email || "Not provided"}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      Mobile Number
                    </span>
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border-2 border-transparent hover:border-[#009689]/20 transition-all group">
                      <Phone className="w-5 h-5 text-[#009689] transition-transform group-hover:scale-125" />
                      <span className="font-black text-slate-800 text-lg">{userData?.phone || "Not provided"}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      National ID (NID)
                    </span>
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border-2 border-transparent hover:border-[#009689]/20 transition-all group">
                      <CreditCard className="w-5 h-5 text-[#009689] transition-transform group-hover:scale-125" />
                      <span className="font-mono font-black text-slate-800 text-lg">{userData?.nid || "Not provided"}</span>
                    </div>
                  </div>

                  <div className="space-y-3 md:col-span-2">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      Primary Address
                    </span>
                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border-2 border-transparent hover:border-[#009689]/20 transition-all group">
                      <MapPin className="w-5 h-5 text-[#009689] mt-1 transition-transform group-hover:scale-125" />
                      <span className="font-bold text-slate-600 leading-relaxed">{userData?.address || "Not provided"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Latest Transactions */}
            <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white">
              <CardHeader className="bg-gradient-to-r from-[#009689]/5 to-[#ffd8af]/5 p-8 border-b border-slate-50">
                <CardTitle className="text-2xl font-black text-slate-900 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[#009689]">
                    <Receipt className="w-7 h-7" />
                  </div>
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-8">
                {latestTransactions.length > 0 ? (
                  <div className="space-y-4">
                    {latestTransactions.map((transaction, idx) => {
                      const {
                        icon: Icon,
                        color,
                        bg,
                      } = getTransactionIcon(transaction.type);

                      return (
                        <motion.div
                          key={transaction._id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-slate-50 hover:bg-white border-2 border-transparent hover:border-[#009689]/10 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-xl group"
                        >
                          <div className="flex items-start sm:items-center gap-6 flex-1 mb-4 sm:mb-0">
                            <div className={`w-16 h-16 rounded-2xl ${bg} flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform`}>
                              <Icon className={`w-8 h-8 ${color}`} />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h3 className="font-black text-slate-900 text-lg">
                                  {transaction.type.replace(/_/g, " ")}
                                </h3>
                                <Badge className={`uppercase tracking-tighter text-[10px] font-black py-0.5 px-3 rounded-md ${transaction.status === "COMPLETED"
                                    ? "bg-green-100 text-green-600"
                                    : transaction.status === "PENDING"
                                      ? "bg-yellow-100 text-yellow-600"
                                      : "bg-red-100 text-red-600"
                                  } border-none shadow-none`}>
                                  {transaction.status}
                                </Badge>
                              </div>

                              <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-400 mb-2">
                                <span className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg">
                                  <Calendar className="w-3.5 h-3.5 text-[#009689]" />
                                  {formatDate(transaction.createdAt)}
                                </span>
                                <span className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg">
                                  <CreditCard className="w-3.5 h-3.5 text-[#009689]" />
                                  {transaction._id.slice(-10)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                {transaction.from && (
                                  <span className="bg-white/60 px-2 py-1 rounded-md">From: {transaction.from.name}</span>
                                )}
                                {transaction.to && (
                                  <span className="bg-white/60 px-2 py-1 rounded-md">To: {transaction.to?.name || 'System'}</span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="text-left sm:text-right px-4">
                            <p className={`text-3xl font-black mb-1 tracking-tighter ${transaction.type === "CASH_IN" || transaction.type === "ADD_MONEY"
                                ? "text-green-600"
                                : "text-red-600"
                              }`}>
                              {(transaction.type === "CASH_IN" || transaction.type === "ADD_MONEY") ? "+" : "-"}৳{transaction.amount.toLocaleString()}
                            </p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              Transaction Fee: ৳{transaction.commission.systemFee + (transaction.commission.agentCommission || 0)}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                    <Receipt className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-2xl font-black text-slate-800">Clean Slate</h3>
                    <p className="text-slate-500 font-bold">Your transactions will start appearing here.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;