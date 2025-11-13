// Profile.tsx
import React, { useState, useEffect } from "react";
import {
  useMyInfoQuery,
  useMyInfoUpdateMutation,
} from "@/redux/features/user/user.api";
import { useMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  User,
  Mail,
  Phone,
  CreditCard,
  MapPin,
  Edit,
  Camera,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { toast } from "sonner";
import ZapWalletLoader from "@/utils/ZapWalletLoader";
import { IsActiveValues, type IUser } from "@/types/user.type";
import { WalletStatusValues, type WalletResponse } from "@/types/wallet.types";

// Form data interface
interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  picture: string;
}

const Profile: React.FC = () => {
  const { data, isLoading } = useMyInfoQuery(undefined);
  const { data: walletData } = useMyWalletQuery(undefined);

  const [updateProfile, { isLoading: isUpdating }] = useMyInfoUpdateMutation();

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [showBalance, setShowBalance] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    picture: "",
  });

  React.useEffect(() => {
    if (data?.data) {
      const userData = data.data as IUser;
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (): Promise<void> => {
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

  const userData = data?.data as IUser | undefined;
  const wallet = (walletData as WalletResponse)?.data?.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-[#009689]">My Profile</h1>
            <p className="text-slate-600 mt-1">
              Manage your account information
            </p>
          </div>
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#009689] hover:bg-[#007a6e] text-white font-bold">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black text-[#009689]">
                  Edit Profile
                </DialogTitle>
                <DialogDescription>
                  Update your profile information below
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+8801234567890"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="picture">Profile Picture URL</Label>
                    <Input
                      id="picture"
                      name="picture"
                      value={formData.picture}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSubmit}
                    disabled={isUpdating}
                    className="flex-1 bg-[#009689] hover:bg-[#007a6e] text-white font-bold"
                  >
                    {isUpdating ? "Updating..." : "Save Changes"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Picture & Quick Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Picture Card */}
            <Card className="border-2 border-[#009689]/20">
              <CardContent className="p-6">
                <div className="relative group">
                  <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#009689] to-[#00c4b4] flex items-center justify-center">
                    {userData?.picture ? (
                      <img
                        src={userData.picture}
                        alt={userData.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-white text-6xl font-black">
                        {userData?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-4 right-4 w-10 h-10 rounded-full"
                  >
                    <Camera className="w-5 h-5 text-[#009689]" />
                  </Button>
                </div>

                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-black text-slate-900">
                    {userData?.name}
                  </h2>
                  <Badge className="mt-2 bg-[#009689] hover:bg-[#007a6e] text-white font-bold capitalize">
                    {userData?.role?.toLowerCase()}
                  </Badge>
                </div>

                <Separator className="my-4" />

                {/* Wallet Balance Section */}
                <div className="bg-gradient-to-br from-[#ffd8af]/20 to-[#009689]/10 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-[#009689]" />
                      <span className="text-sm font-bold text-slate-700">
                        Wallet Balance
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleBalance}
                      className="h-8 w-8"
                    >
                      {showBalance ? (
                        <EyeOff className="w-4 h-4 text-[#009689]" />
                      ) : (
                        <Eye className="w-4 h-4 text-[#009689]" />
                      )}
                    </Button>
                  </div>
                  <div className="text-center">
                    {showBalance ? (
                      <div className="space-y-1">
                        <p className="text-3xl font-black text-[#009689]">
                          ৳{wallet?.balance || 0}
                        </p>
                        <p className="text-xs text-slate-600 font-semibold">
                          {wallet?.currency || "BDT"}
                        </p>
                      </div>
                    ) : (
                      <p className="text-3xl font-black text-slate-400">
                        ••••••
                      </p>
                    )}
                  </div>
                  <Badge
                    className={`mt-3 w-full justify-center ${
                      wallet?.walletStatus === WalletStatusValues.ACTIVE
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white font-semibold`}
                  >
                    {wallet?.walletStatus}
                  </Badge>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 font-semibold">Status</span>
                    <Badge
                      className={`${
                        userData?.isActive === IsActiveValues.ACTIVE
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                      } text-white font-semibold capitalize`}
                    >
                      {userData?.isActive}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 font-semibold">
                      Verified
                    </span>
                    {userData?.isVerified ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 font-semibold">
                      Transactions
                    </span>
                    <Badge className="bg-[#ffd8af] text-[#009689] hover:bg-[#ffd8af] font-bold">
                      {Array.isArray(wallet?.transactions)
                        ? wallet.transactions.length
                        : 0}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="border-2 border-[#009689]/20">
              <CardHeader className="bg-gradient-to-r from-[#009689]/5 to-[#ffd8af]/5">
                <CardTitle className="text-xl font-black text-[#009689] flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-600">
                      Full Name
                    </Label>
                    <div className="flex items-center gap-2 text-base font-semibold text-slate-900">
                      <User className="w-4 h-4 text-[#009689]" />
                      {userData?.name || "Not provided"}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-600">
                      Email Address
                    </Label>
                    <div className="flex items-center gap-2 text-base font-medium text-slate-900">
                      <Mail className="w-4 h-4 text-[#009689]" />
                      {userData?.email || "Not provided"}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-600">
                      Phone Number
                    </Label>
                    <div className="flex items-center gap-2 text-base font-medium text-slate-900">
                      <Phone className="w-4 h-4 text-[#009689]" />
                      {userData?.phone || "Not provided"}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-600">
                      National ID (NID)
                    </Label>
                    <div className="flex items-center gap-2 text-base font-bold text-slate-900">
                      <CreditCard className="w-4 h-4 text-[#009689]" />
                      {userData?.nid || "Not provided"}
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-sm font-bold text-slate-600">
                      Address
                    </Label>
                    <div className="flex items-start gap-2 text-base font-medium text-slate-900">
                      <MapPin className="w-4 h-4 text-[#009689] mt-1" />
                      {userData?.address || "Not provided"}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-600">
                      Account Created
                    </Label>
                    <p className="text-base font-semibold text-slate-900">
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
                    <Label className="text-sm font-bold text-slate-600">
                      Last Updated
                    </Label>
                    <p className="text-base font-semibold text-slate-900">
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

            {/* Agent Information (if applicable) */}
            {userData?.role === "AGENT" && userData?.agentInfo && (
              <Card className="border-2 border-[#009689]/20">
                <CardHeader className="bg-gradient-to-r from-[#009689]/5 to-[#ffd8af]/5">
                  <CardTitle className="text-xl font-black text-[#009689]">
                    Agent Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-600">
                        TIN ID
                      </Label>
                      <p className="text-base font-bold text-slate-900">
                        {userData.agentInfo.tinId}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-600">
                        Approval Status
                      </Label>
                      <Badge
                        className={`${
                          userData.agentInfo.approvalStatus === "pending"
                            ? "bg-yellow-500"
                            : userData.agentInfo.approvalStatus === "approved"
                            ? "bg-green-500"
                            : "bg-red-500"
                        } text-white font-bold capitalize`}
                      >
                        {userData.agentInfo.approvalStatus}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-600">
                        Commission Rate
                      </Label>
                      <p className="text-base font-bold text-[#009689]">
                        {userData.agentInfo.commissionRate}%
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-600">
                        Total Commission
                      </Label>
                      <p className="text-base font-bold text-[#009689]">
                        ৳{userData.agentInfo.totalCommission}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Transactions */}
            <Card className="border-2 border-[#009689]/20">
              <CardHeader className="bg-gradient-to-r from-[#009689]/5 to-[#ffd8af]/5">
                <CardTitle className="text-xl font-black text-[#009689] flex items-center gap-2">
                  <ArrowUpRight className="w-5 h-5" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {Array.isArray(wallet?.transactions) &&
                wallet.transactions.length > 0 ? (
                  <div className="space-y-3">
                    {wallet.transactions
                      .slice(0, 5)
                      .map((transaction, index) => {
                        const tx = transaction as any;
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-[#009689]/5 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  tx.type === "credit"
                                    ? "bg-green-100"
                                    : "bg-red-100"
                                }`}
                              >
                                {tx.type === "credit" ? (
                                  <ArrowDownLeft className="w-5 h-5 text-green-600" />
                                ) : (
                                  <ArrowUpRight className="w-5 h-5 text-red-600" />
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-slate-900">
                                  {tx.description || tx.type}
                                </p>
                                <p className="text-xs text-slate-600">
                                  {tx.createdAt
                                    ? new Date(tx.createdAt).toLocaleDateString(
                                        "en-US",
                                        {
                                          month: "short",
                                          day: "numeric",
                                          year: "numeric",
                                        }
                                      )
                                    : "Date not available"}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p
                                className={`font-black text-lg ${
                                  tx.type === "credit"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {tx.type === "credit" ? "+" : "-"}৳{tx.amount}
                              </p>
                              <Badge variant="outline" className="text-xs mt-1">
                                {tx.status || "Completed"}
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ArrowUpRight className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-600 font-semibold">
                      No transactions yet
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
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
