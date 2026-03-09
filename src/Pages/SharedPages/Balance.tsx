import { useState, useEffect } from "react";
import { useMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Wallet,
  Eye,
  EyeOff,
  TrendingUp,
  DollarSign,
  User,
  CheckCircle,
} from "lucide-react";
import ZapWalletLoader from "@/utils/ZapWalletLoader";
import { motion } from "framer-motion";
import SectionHeader from "@/components/modules/HomePages/SectionHeader";

const Balance = () => {
  const { data, isLoading } = useMyWalletQuery(undefined);
  const [showBalance, setShowBalance] = useState(false);

  // Auto-hide balance after 10 seconds
  useEffect(() => {
    if (showBalance) {
      const timer = setTimeout(() => {
        setShowBalance(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showBalance]);

  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };

  if (isLoading) return <ZapWalletLoader />;

  const walletData = data?.data?.data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
        <SectionHeader
          title="Wallet Balance"
          subtitle="Manage and monitor your digital funds with ease and security."
          badge="Financial Overview"
          center={false}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Balance Card */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="h-full border-none bg-gradient-to-br from-[#009689] to-[#00c4b4] text-white shadow-2xl rounded-[2.5rem] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full -ml-24 -mb-24"></div>

              <CardHeader className="relative z-10 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-black text-white flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <Wallet className="w-6 h-6" />
                    </div>
                    Total Balance
                  </CardTitle>
                  <button
                    onClick={toggleBalance}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  >
                    {showBalance ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 p-10">
                <div className="space-y-8">
                  {/* Balance Display */}
                  <div className="text-center py-10">
                    <AnimatePresence mode="wait">
                      {showBalance ? (
                        <motion.div
                          key="balance"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                        >
                          <p className="text-7xl font-black mb-2 tracking-tighter">
                            ৳{walletData?.balance?.toLocaleString()}
                          </p>
                          <p className="text-2xl font-bold text-white/80 uppercase tracking-widest">
                            {walletData?.currency}
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="hidden"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <p className="text-7xl font-black tracking-[0.2em] opacity-40">
                            ••••••••
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Wallet Status */}
                  <div className="flex items-center justify-center">
                    <Badge
                      className={`${walletData?.walletStatus === "ACTIVE"
                          ? "bg-white text-[#009689]"
                          : "bg-red-500 text-white"
                        } font-black px-6 py-2.5 rounded-2xl text-base shadow-lg hover:scale-105 transition-transform`}
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      {walletData?.walletStatus}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* User Info Card */}
          <motion.div variants={itemVariants}>
            <Card className="h-full border-2 border-[#ffd8af]/30 rounded-[2.5rem] shadow-xl overflow-hidden hover:shadow-2xl transition-all">
              <CardHeader className="bg-gradient-to-r from-[#ffd8af]/20 to-transparent p-8">
                <CardTitle className="text-xl font-black text-[#009689] flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#009689]/10 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  Account Identity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Account Holder</p>
                  <p className="text-xl font-black text-slate-900">{walletData?.user?.name}</p>
                </div>

                <Separator className="bg-slate-100" />

                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Contact Email</p>
                  <p className="text-base font-bold text-[#009689] break-all">
                    {walletData?.user?.email}
                  </p>
                </div>

                <Separator className="bg-slate-100" />

                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</p>
                  <p className="text-base font-bold text-slate-900">{walletData?.user?.phone}</p>
                </div>

                <Separator className="bg-slate-100" />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">User Role</p>
                    <Badge className="bg-[#009689] hover:bg-[#007a6e] text-white font-black py-1.5 px-4 rounded-xl capitalize shadow-md">
                      {walletData?.user?.role?.replace(/_/g, " ")}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { label: "Available Cash", value: `৳${walletData?.balance?.toLocaleString()}`, icon: TrendingUp, color: "text-green-600", bg: "bg-green-50", border: "border-green-100" },
            { label: "Main Currency", value: walletData?.currency, icon: DollarSign, color: "text-[#009689]", bg: "bg-[#009689]/5", border: "border-[#009689]/10" },
            { label: "Identity (NID)", value: walletData?.user?.nid, icon: Wallet, color: "text-slate-600", bg: "bg-slate-50", border: "border-slate-100" },
          ].map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className={`border-2 ${stat.border} hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-[2rem] group cursor-default`}>
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                      {showBalance || stat.label !== "Available Cash" ? (
                        <p className={`text-2xl font-black ${stat.color} tracking-tight`}>
                          {stat.value}
                        </p>
                      ) : (
                        <p className="text-2xl font-black text-slate-200 tracking-widest">••••••</p>
                      )}
                    </div>
                    <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                      <stat.icon className={`w-7 h-7 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Info Banner */}
        <motion.div variants={itemVariants}>
          <Card className="border-none bg-[#009689] text-white p-2 rounded-[3rem] shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <CardContent className="p-10 relative z-10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
                <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center flex-shrink-0 animate-pulse">
                  <DollarSign className="w-10 h-10 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-black text-3xl mb-6">Security & Transparency</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {[
                      "Bank-level AES encryption",
                      "10s Balance auto-hide",
                      "Real-time fraud monitoring",
                      "Central Bank regulation",
                    ].map((info, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl">
                        <CheckCircle className="w-5 h-5 text-[#ffd8af]" />
                        <span className="font-bold text-lg">{info}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Balance;
import { AnimatePresence } from "framer-motion";