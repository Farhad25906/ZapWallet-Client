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
import { useCashOutMutation } from "@/redux/features/wallet/wallet.api";
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

interface CashOutRequest {
  agentWalletNumber: string;
  amount: string | number;
}

interface CashOutErrors {
  agentWalletNumber?: string;
  amount?: string;
}

const validationRules = {
  agentWalletNumber: {
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

const CashOut = () => {
  const [cashOut, { isLoading }] = useCashOutMutation();
  const { data } = useMyInfoQuery(undefined);

  const [formData, setFormData] = useState<CashOutRequest>({
    agentWalletNumber: "+88",
    amount: "",
  });

  const [errors, setErrors] = useState<CashOutErrors>({});
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [receipt, setReceipt] = useState<TransactionReceipt | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "agentWalletNumber") {
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

    if (errors[name as keyof CashOutErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: CashOutErrors = {};

    // Validate phone number
    const { pattern, message } = validationRules.agentWalletNumber;
    if (!pattern.test(formData.agentWalletNumber)) {
      newErrors.agentWalletNumber = message;
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
      const payload: CashOutRequest = {
        agentWalletNumber: formData.agentWalletNumber,
        amount: formData.amount,
      };

      const response = await cashOut(payload).unwrap();
      console.log(response);

      const transactionReceipt: TransactionReceipt = {
        transactionId: response?.data?.transaction?._id,
        amount: response?.data?.transaction?.amount,
        fromNumber: data?.data?.phone,
        toNumber: formData.agentWalletNumber,
        timestamp: new Date().toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        status: response?.data?.transaction?.status,
        fee: response?.data?.commission?.totalCommission,
      };

      setReceipt(transactionReceipt);
      setShowConfirmation(false);
      setShowReceipt(true);

      // Reset form
      setFormData({
        agentWalletNumber: "+88",
        amount: "",
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "Cash Out failed");
      console.error(error);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-3 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#009689] flex items-center justify-center">
              <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#009689]">
                Cash Out
              </h1>
              <p className="text-slate-600 mt-1 text-sm sm:text-base">
                Cash Out to Agent Wallet
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1 bg-[#009689] text-white font-semibold px-3 py-1 rounded-full text-xs sm:text-sm shadow-sm hover:shadow-md transition-all w-full sm:w-auto justify-center">
            <span className="text-lg sm:text-xl">💸</span>
            User → Agent Transfer
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Form Card */}
          <Card className="border-2 border-[#009689]/20">
            <CardHeader className="bg-gradient-to-r from-[#009689]/5 to-[#ffd8af]/5">
              <CardTitle className="text-lg sm:text-xl font-black text-[#009689] flex items-center gap-2 justify-center sm:justify-start">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
                Transfer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="agentWalletNumber"
                    className="text-sm font-bold text-slate-700"
                  >
                    Agent Wallet Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#009689]" />
                    <Input
                      id="agentWalletNumber"
                      name="agentWalletNumber"
                      type="tel"
                      placeholder="+88012345678901"
                      value={formData.agentWalletNumber}
                      onChange={handleChange}
                      className="pl-10 sm:pl-12 border-2 focus:border-[#009689] text-sm sm:text-base font-semibold"
                    />
                  </div>
                  {errors.agentWalletNumber && (
                    <Alert variant="destructive" className="py-2">
                      <AlertCircle className="w-4 h-4" />
                      <AlertDescription className="text-xs sm:text-sm">
                        {errors.agentWalletNumber}
                      </AlertDescription>
                    </Alert>
                  )}
                  <p className="text-xs text-slate-600">
                    Enter the agent's registered phone number
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
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#009689]" />
                    <Input
                      id="amount"
                      name="amount"
                      type="text"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={handleChange}
                      className="pl-10 sm:pl-12 border-2 focus:border-[#009689] text-xl sm:text-2xl font-bold text-[#009689]"
                    />
                  </div>
                  {errors.amount && (
                    <Alert variant="destructive" className="py-2">
                      <AlertCircle className="w-4 h-4" />
                      <AlertDescription className="text-xs sm:text-sm">
                        {errors.amount}
                      </AlertDescription>
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
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[1000, 5000, 10000, 50000].map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant="outline"
                        onClick={() => handleQuickAmount(amount)}
                        className="border-2 border-[#009689]/30 hover:bg-[#009689] hover:text-white font-bold text-xs sm:text-sm py-2 h-auto"
                      >
                        {amount >= 1000 ? `${amount / 1000}K` : amount}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Preview Button */}
                <Button
                  onClick={handlePreview}
                  disabled={!formData.agentWalletNumber || !formData.amount}
                  className="w-full bg-[#009689] hover:bg-[#007a6e] text-white font-bold py-4 sm:py-6 text-base sm:text-lg"
                >
                  Preview Transaction
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
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
              <CardTitle className="text-lg sm:text-xl font-black text-[#009689] flex items-center gap-2 justify-center sm:justify-start">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                {showConfirmation
                  ? "Confirm Transaction"
                  : "Transaction Preview"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {showConfirmation ? (
                <div className="space-y-4 sm:space-y-6">
                  {/* Transaction Summary */}
                  <div className="bg-white rounded-xl p-4 sm:p-6 border-2 border-[#009689]/20 space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between pb-3 sm:pb-4 border-b-2 border-[#ffd8af]/30">
                      <span className="text-xs sm:text-sm font-semibold text-slate-600">
                        From
                      </span>
                      <div className="text-right">
                        <p className="font-bold text-slate-900 text-sm sm:text-base">
                          User Account
                        </p>
                        <p className="text-xs text-slate-600 font-mono mt-1 break-all">
                          {data?.data?.phone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pb-3 sm:pb-4 border-b-2 border-[#ffd8af]/30">
                      <span className="text-xs sm:text-sm font-semibold text-slate-600">
                        To
                      </span>
                      <div className="text-right">
                        <p className="font-bold text-slate-900 text-sm sm:text-base">
                          Agent Account
                        </p>
                        <p className="text-xs text-slate-600 font-mono mt-1 break-all">
                          {formData.agentWalletNumber}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pb-3 sm:pb-4">
                      <span className="text-xs sm:text-sm font-semibold text-slate-600">
                        Amount
                      </span>
                      <p className="text-2xl sm:text-3xl font-black text-[#009689]">
                        ৳{amountValue.toLocaleString()}
                      </p>
                    </div>

                    <Alert className="bg-[#ffd8af]/10 border-[#ffd8af]/30">
                      <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#009689]" />
                      <AlertDescription className="text-xs sm:text-sm">
                        <p className="font-bold text-slate-900 mb-1">
                          Important
                        </p>
                        <p className="text-slate-700">
                          Once confirmed, the amount will be transferred to the
                          agent's wallet immediately. This action is
                          irreversible.
                        </p>
                      </AlertDescription>
                    </Alert>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="flex-1 bg-[#009689] hover:bg-[#007a6e] text-white font-bold py-4 sm:py-6 text-base sm:text-lg"
                    >
                      {isLoading ? (
                        "Processing..."
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          Confirm & Send
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleCancel}
                      disabled={isLoading}
                      variant="outline"
                      className="border-2 border-slate-300 font-bold py-4 sm:py-6 text-base sm:text-lg"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-200 flex items-center justify-center mb-4">
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
                  </div>
                  <p className="text-slate-600 font-semibold mb-2 text-sm sm:text-base">
                    Fill in the details
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 px-4">
                    Enter agent wallet number and amount to preview the
                    transaction
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="mt-4 sm:mt-6 border-2 border-[#009689]/20">
          <CardContent className="p-4 sm:p-6">
            <h3 className="font-bold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2 justify-center sm:justify-start text-sm sm:text-base">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#009689]" />
              Transaction Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="text-center sm:text-left">
                <p className="text-slate-600 mb-1">⚡ Processing Time</p>
                <p className="font-bold text-slate-900">Instant</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-slate-600 mb-1">💰 Transaction Fee</p>
                <p className="font-bold text-slate-900">1.5% Cash Out Fee</p>
              </div>
              <div className="text-center sm:text-left">
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
        title="Cash Out Successful!"
        description="Money has been transferred to agent wallet successfully"
      />
    </div>
  );
};

export default CashOut;