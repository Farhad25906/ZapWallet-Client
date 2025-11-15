import  { useState, useEffect } from "react";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-[#009689]">Wallet Balance</h1>
            <p className="text-slate-600 mt-1">Manage and monitor your funds</p>
          </div>
          
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Balance Card */}
          <Card className="lg:col-span-2 border-2 border-[#009689]/20 bg-gradient-to-br from-[#009689] to-[#00c4b4] text-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                  <Wallet className="w-6 h-6" />
                  Total Balance
                </CardTitle>
                <button
                  onClick={toggleBalance}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  {showBalance ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Balance Display */}
                <div className="text-center py-8">
                  {showBalance ? (
                    <>
                      <p className="text-6xl font-black mb-2">
                        ৳{walletData?.balance?.toLocaleString()}
                      </p>
                      <p className="text-xl font-semibold text-white/80">
                        {walletData?.currency}
                      </p>
                    </>
                  ) : (
                    <p className="text-6xl font-black">
                      ••••••••
                    </p>
                  )}
                </div>

                {/* Wallet Status */}
                <div className="flex items-center justify-center gap-3">
                  <Badge
                    className={`${
                      walletData?.walletStatus === "ACTIVE"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white font-bold px-4 py-2 text-base`}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {walletData?.walletStatus}
                  </Badge>
                </div>

               
              </div>
            </CardContent>
          </Card>

          {/* User Info Card */}
          <Card className="border-2 border-[#ffd8af]/50">
            <CardHeader className="bg-gradient-to-r from-[#ffd8af]/10 to-[#009689]/5">
              <CardTitle className="text-lg font-black text-[#009689] flex items-center gap-2">
                <User className="w-5 h-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Account Holder</p>
                <p className="text-base font-bold text-slate-900">{walletData?.user?.name}</p>
              </div>

              <Separator className="bg-[#ffd8af]/30" />

              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Email</p>
                <p className="text-sm font-medium text-slate-900 break-all">
                  {walletData?.user?.email}
                </p>
              </div>

              <Separator className="bg-[#ffd8af]/30" />

              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Phone</p>
                <p className="text-sm font-medium text-slate-900">{walletData?.user?.phone}</p>
              </div>

              <Separator className="bg-[#ffd8af]/30" />

              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Role</p>
                <Badge className="bg-[#009689] hover:bg-[#007a6e] text-white font-bold capitalize">
                  {walletData?.user?.role?.replace(/_/g, " ")}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-2 border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 mb-1">Available Balance</p>
                  {showBalance ? (
                    <p className="text-2xl font-black text-green-600">
                      ৳{walletData?.balance?.toLocaleString()}
                    </p>
                  ) : (
                    <p className="text-2xl font-black text-slate-400">••••••</p>
                  )}
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#009689]/20 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 mb-1">Currency</p>
                  <p className="text-2xl font-black text-[#009689]">{walletData?.currency}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#009689]/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[#009689]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#ffd8af]/50 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 mb-1">National ID (NID)</p>
                  <p className="text-sm font-mono text-slate-900 truncate">
                    {walletData?.user?.nid}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#ffd8af]/30 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-[#009689]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

       

        {/* Info Banner */}
        <Card className="border-2 border-[#ffd8af]/50 bg-gradient-to-r from-[#ffd8af]/10 to-white">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#009689] flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Important Information</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#009689] flex-shrink-0 mt-0.5" />
                    <span>Your balance is protected with bank-level encryption</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#009689] flex-shrink-0 mt-0.5" />
                    <span>Balance auto-hides after 10 seconds for security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#009689] flex-shrink-0 mt-0.5" />
                    <span>All transactions are monitored in real-time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#009689] flex-shrink-0 mt-0.5" />
                    <span>Licensed and regulated by Bangladesh Bank</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Balance;