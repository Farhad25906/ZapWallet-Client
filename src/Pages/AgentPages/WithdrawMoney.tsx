/* eslint-disable @typescript-eslint/no-explicit-any */
import TransactionSuccessModal, {
  type TransactionReceipt,
} from "@/components/modules/TransactionSuccessModal";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMyInfoQuery } from "@/redux/features/user/user.api";
import { useWithdrawMoneyMutation } from "@/redux/features/wallet/wallet.api";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Phone,
  User,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface WithdrawRequest {
  adminWalletNumber: string;
  amount: string | number;
}

interface WithdrawErrors {
  adminWalletNumber?: string;
  amount?: string;
}

const validationRules = {
  adminWalletNumber: {
    pattern: /^\+88\d{11}$/,
    minLength: 14,
    maxLength: 14,
    message: "Phone must start with +88 and be 13 digits total",
  },
  amount: {
    min: 100,
    max: 1000000,
    message: {
      required: "Please enter a valid amount",
      invalid: "Amount must be a number",
      min: "Minimum amount is ৳100",
      max: "Maximum amount is ৳1,000,000",
      positive: "Amount must be greater than 0",
    },
  },
};

const WithdrawMoney = () => {
  const [withdraw, { isLoading }] = useWithdrawMoneyMutation();
  const { data } = useMyInfoQuery(undefined);
  const [formData, setFormData] = useState<WithdrawRequest>({
    adminWalletNumber: "+88",
    amount: "",
  });

  const [errors, setErrors] = useState<WithdrawErrors>({});
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [receipt, setReceipt] = useState<TransactionReceipt | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "adminWalletNumber") {
      if (!value.startsWith("+88")) {
        setFormData((prev) => ({ ...prev, [name]: "+88" }));
        return;
      }
      if (value.length > 14) return;
    }

    if (name === "amount" && value && !/^\d*\.?\d*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof WithdrawErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: WithdrawErrors = {};

    // Validate phone number
    const { pattern, message } = validationRules.adminWalletNumber;
    if (!pattern.test(formData.adminWalletNumber)) {
      newErrors.adminWalletNumber = message;
    }

    // Validate amount
    const amount = parseFloat(formData.amount as string);
    if (!formData.amount) {
      newErrors.amount = validationRules.amount.message.required;
    } else if (isNaN(amount)) {
      newErrors.amount = validationRules.amount.message.invalid;
    } else if (amount <= 0) {
      newErrors.amount = validationRules.amount.message.positive;
    } else if (amount < validationRules.amount.min) {
      newErrors.amount = validationRules.amount.message.min;
    } else if (amount > validationRules.amount.max) {
      newErrors.amount = validationRules.amount.message.max;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePreview = () => {
    if (validateForm()) {
      setShowConfirmation(true);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const payload: WithdrawRequest = {
        adminWalletNumber: formData.adminWalletNumber,
        amount: formData.amount,
      };

      const response = await withdraw(payload).unwrap();

      // Create receipt with response data or generated data
      const transactionReceipt: TransactionReceipt = {
        transactionId: response?.data?.transaction?._id,
        amount: parseFloat(formData.amount as string),
        fromNumber: data?.data?.phone,
        toNumber: formData.adminWalletNumber,
        timestamp: new Date().toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        status: "Successful",
        fee: 0,
      };

      setReceipt(transactionReceipt);
      setShowConfirmation(false);
      setShowReceipt(true);

      // Reset form
      setFormData({
        adminWalletNumber: "+88",
        amount: "",
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "Withdrawal failed");
      // console.error(error);
    }
  };

  const handleCancel = (): void => {
    setShowConfirmation(false);
  };

  const handleCloseReceipt = (): void => {
    setShowReceipt(false);
    setReceipt(null);
  };

  const handleQuickAmount = (amount: number): void => {
    setFormData((prev) => ({
      ...prev,
      amount: amount.toString(),
    }));

    if (errors.amount) {
      setErrors((prev) => ({ ...prev, amount: undefined }));
    }
  };

  const amountValue = parseFloat(formData.amount as string) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#009689] flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-[#009689]">
                Withdraw Money
              </h1>
              <p className="text-slate-600 mt-1 text-sm md:text-base">
                Withdraw money from Agent wallet
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1 bg-[#009689] text-white font-semibold px-3 py-1 rounded-full text-sm shadow-sm hover:shadow-md transition-all">
            <span className="text-xl">💸</span>
            Agent → Admin Transfer
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Card */}
          <Card className="border-2 border-[#009689]/20">
            <CardHeader className="bg-gradient-to-r from-[#009689]/5 to-[#ffd8af]/5">
              <CardTitle className="text-xl font-black text-[#009689] flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Transfer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="adminWalletNumber"
                    className="text-sm font-bold text-slate-700"
                  >
                    Admin Wallet Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#009689]" />
                    <Input
                      id="adminWalletNumber"
                      name="adminWalletNumber"
                      type="tel"
                      placeholder="+88012345678901"
                      value={formData.adminWalletNumber}
                      onChange={handleChange}
                      className="pl-12 border-2 focus:border-[#009689] text-base font-semibold"
                    />
                  </div>
                  {errors.adminWalletNumber && (
                    <Alert variant="destructive" className="py-2">
                      <AlertCircle className="w-4 h-4" />
                      <AlertDescription>
                        {errors.adminWalletNumber}
                      </AlertDescription>
                    </Alert>
                  )}
                  <p className="text-xs text-slate-600">
                    Enter the admin's registered phone number
                  </p>
                </div>

                {/* Amount */}
                <div className="space-y-2">
                  <Label
                    htmlFor="amount"
                    className="text-sm font-bold text-slate-700"
                  >
                    Amount (৳)
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#009689]" />
                    <Input
                      id="amount"
                      name="amount"
                      type="text"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={handleChange}
                      className="pl-12 border-2 focus:border-[#009689] text-2xl font-bold text-[#009689]"
                    />
                  </div>
                  {errors.amount && (
                    <Alert variant="destructive" className="py-2">
                      <AlertCircle className="w-4 h-4" />
                      <AlertDescription>{errors.amount}</AlertDescription>
                    </Alert>
                  )}
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Min: ৳100</span>
                    <span>Max: ৳1,000,000</span>
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">
                    Quick Amount
                  </Label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1000, 5000, 10000, 50000].map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant="outline"
                        onClick={() => handleQuickAmount(amount)}
                        className="border-2 border-[#009689]/30 hover:bg-[#009689] hover:text-white font-bold"
                      >
                        {amount >= 1000 ? `${amount / 1000}K` : amount}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Preview Button */}
                <Button
                  onClick={handlePreview}
                  disabled={!formData.adminWalletNumber || !formData.amount}
                  className="w-full bg-[#009689] hover:bg-[#007a6e] text-white font-bold py-6 text-lg"
                >
                  Preview Transaction
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview/Confirmation Card */}
          <Card
            className={`border-2 transition-all duration-300 ${
              showConfirmation
                ? "border-[#ffd8af] bg-gradient-to-br from-[#ffd8af]/5 to-[#009689]/5"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <CardHeader
              className={`${
                showConfirmation
                  ? "bg-gradient-to-r from-[#ffd8af]/20 to-[#009689]/10"
                  : "bg-slate-100"
              }`}
            >
              <CardTitle className="text-xl font-black text-[#009689] flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                {showConfirmation
                  ? "Confirm Transaction"
                  : "Transaction Preview"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {showConfirmation ? (
                <div className="space-y-6">
                  {/* Transaction Summary */}
                  <div className="bg-white rounded-xl p-6 border-2 border-[#009689]/20 space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b-2 border-[#ffd8af]/30">
                      <span className="text-sm font-semibold text-slate-600">
                        From
                      </span>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">
                          Agent Account
                        </p>
                        <p className="text-sm text-slate-600 font-mono mt-1">
                          {data?.data?.phone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b-2 border-[#ffd8af]/30">
                      <span className="text-sm font-semibold text-slate-600">
                        To
                      </span>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">
                          Admin Account
                        </p>
                        <p className="text-sm text-slate-600 font-mono mt-1">
                          {formData.adminWalletNumber}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pb-4">
                      <span className="text-sm font-semibold text-slate-600">
                        Amount
                      </span>
                      <p className="text-3xl font-black text-[#009689]">
                        ৳{amountValue.toLocaleString()}
                      </p>
                    </div>

                    <Alert className="bg-[#ffd8af]/10 border-[#ffd8af]/30">
                      <AlertCircle className="w-5 h-5 text-[#009689]" />
                      <AlertDescription>
                        <p className="font-bold text-slate-900 mb-1">
                          Important
                        </p>
                        <p className="text-slate-700">
                          The digital amount will be transferred to the admin
                          instantly and cannot be undone. Please ensure you have
                          received the money from the admin.
                        </p>
                      </AlertDescription>
                    </Alert>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="flex-1 bg-[#009689] hover:bg-[#007a6e] text-white font-bold py-6 text-lg"
                    >
                      {isLoading ? (
                        "Processing..."
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Confirm & Send
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleCancel}
                      disabled={isLoading}
                      variant="outline"
                      className="border-2 border-slate-300 font-bold py-6"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center mb-4">
                    <User className="w-10 h-10 text-slate-400" />
                  </div>
                  <p className="text-slate-600 font-semibold mb-2">
                    Fill in the details
                  </p>
                  <p className="text-sm text-slate-500">
                    Enter admin wallet number and amount to preview the
                    transaction
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="mt-6 border-2 border-[#009689]/20">
          <CardContent className="p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#009689]" />
              Transaction Information
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-slate-600 mb-1">⚡ Processing Time</p>
                <p className="font-bold text-slate-900">Instant</p>
              </div>
              <div>
                <p className="text-slate-600 mb-1">💰 Transaction Fee</p>
                <p className="font-bold text-slate-900">FREE</p>
              </div>
              <div>
                <p className="text-slate-600 mb-1">🔒 Security</p>
                <p className="font-bold text-slate-900">Encrypted</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Success Modal */}
      <TransactionSuccessModal
        receipt={receipt!}
        isOpen={showReceipt}
        onClose={handleCloseReceipt}
        autoCloseDelay={10000}
        title="Withdrawal Successful!"
        description="Money has been withdrawn from your wallet successfully"
      />
    </div>
  );
};

export default WithdrawMoney;
