import React, { useState } from "react";
import { useResetPasswordMutation } from "@/redux/features/auth/auth.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  CheckCircle,
  AlertCircle,
  Key,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";

interface FormData {
  oldPin: string;
  newPin: string;
  confirmNewPin: string;
}

interface Errors {
  oldPin?: string;
  newPin?: string;
  confirmNewPin?: string;
}

interface ShowPins {
  oldPin: boolean;
  newPin: boolean;
  confirmNewPin: boolean;
}

const SecuritySettings = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [formData, setFormData] = useState<FormData>({
    oldPin: "",
    newPin: "",
    confirmNewPin: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [showPins, setShowPins] = useState<ShowPins>({
    oldPin: false,
    newPin: false,
    confirmNewPin: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Only allow numbers
    if (value && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const toggleShowPin = (field: keyof ShowPins) => {
    setShowPins((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.oldPin) {
      newErrors.oldPin = "Current PIN is required";
    } else if (formData.oldPin.length < 4) {
      newErrors.oldPin = "PIN must be at least 4 digits";
    }

    if (!formData.newPin) {
      newErrors.newPin = "New PIN is required";
    } else if (formData.newPin.length < 4) {
      newErrors.newPin = "PIN must be at least 4 digits";
    } else if (formData.newPin === formData.oldPin) {
      newErrors.newPin = "New PIN must be different from current PIN";
    }

    if (!formData.confirmNewPin) {
      newErrors.confirmNewPin = "Please confirm your new PIN";
    } else if (formData.confirmNewPin !== formData.newPin) {
      newErrors.confirmNewPin = "PINs do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const payload = {
        oldPin: formData.oldPin,
        newPin: formData.newPin,
      };

      await resetPassword(payload).unwrap();
      toast.success("PIN changed successfully!");

      // Reset form
      setFormData({
        oldPin: "",
        newPin: "",
        confirmNewPin: "",
      });
      setErrors({});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to change PIN");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setFormData({
      oldPin: "",
      newPin: "",
      confirmNewPin: "",
    });
    setErrors({});
  };

  // Check if form has any values and all required fields are filled
  const isFormEmpty = !formData.oldPin && !formData.newPin && !formData.confirmNewPin;
  
  // Check if form has validation errors
  const hasErrors = Object.keys(errors).length > 0;

  // Button should be disabled when:
  // 1. Loading, OR
  // 2. Form is empty, OR
  // 3. There are validation errors
  const isSubmitDisabled = isLoading || isFormEmpty || hasErrors;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-[#009689] flex items-center justify-center mx-auto sm:mx-0">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#009689]">
              Security Settings
            </h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">
              Manage your account security and PIN
            </p>
          </div>
        </div>

        {/* Security Status */}
        <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-2">
                  Account Secured
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 mb-3">
                  Your account is protected with a secure PIN. Change it
                  regularly to keep your account safe.
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    PIN Protected
                  </Badge>
                  <Badge className="bg-blue-500 hover:bg-blue-600 text-white text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Email Verified
                  </Badge>
                  <Badge className="bg-[#009689] hover:bg-[#007a6e] text-white text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Active Account
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Change PIN Form */}
        <Card className="border-2 border-[#009689]/20">
          <CardHeader className="bg-gradient-to-r from-[#009689]/5 to-[#ffd8af]/5 p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl font-black text-[#009689] flex items-center gap-2 justify-center sm:justify-start">
              <Key className="w-5 h-5 sm:w-6 sm:h-6" />
              Change PIN
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-6">
              {/* Current PIN */}
              <div className="space-y-2">
                <Label
                  htmlFor="oldPin"
                  className="text-xs sm:text-sm font-bold text-slate-700"
                >
                  Current PIN
                </Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#009689]" />
                  <Input
                    id="oldPin"
                    name="oldPin"
                    type={showPins.oldPin ? "text" : "password"}
                    placeholder="Enter current PIN"
                    value={formData.oldPin}
                    onChange={handleChange}
                    className="pl-10 sm:pl-12 pr-10 sm:pr-12 border-2 focus:border-[#009689] text-base sm:text-lg font-bold h-11 sm:h-12"
                    maxLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowPin("oldPin")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#009689]"
                  >
                    {showPins.oldPin ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
                {errors.oldPin && (
                  <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    {errors.oldPin}
                  </p>
                )}
              </div>

              {/* New PIN */}
              <div className="space-y-2">
                <Label
                  htmlFor="newPin"
                  className="text-xs sm:text-sm font-bold text-slate-700"
                >
                  New PIN
                </Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#009689]" />
                  <Input
                    id="newPin"
                    name="newPin"
                    type={showPins.newPin ? "text" : "password"}
                    placeholder="Enter new PIN"
                    value={formData.newPin}
                    onChange={handleChange}
                    className="pl-10 sm:pl-12 pr-10 sm:pr-12 border-2 focus:border-[#009689] text-base sm:text-lg font-bold h-11 sm:h-12"
                    maxLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowPin("newPin")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#009689]"
                  >
                    {showPins.newPin ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
                {errors.newPin && (
                  <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    {errors.newPin}
                  </p>
                )}
              </div>

              {/* Confirm New PIN */}
              <div className="space-y-2">
                <Label
                  htmlFor="confirmNewPin"
                  className="text-xs sm:text-sm font-bold text-slate-700"
                >
                  Confirm New PIN
                </Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#009689]" />
                  <Input
                    id="confirmNewPin"
                    name="confirmNewPin"
                    type={showPins.confirmNewPin ? "text" : "password"}
                    placeholder="Re-enter new PIN"
                    value={formData.confirmNewPin}
                    onChange={handleChange}
                    className="pl-10 sm:pl-12 pr-10 sm:pr-12 border-2 focus:border-[#009689] text-base sm:text-lg font-bold h-11 sm:h-12"
                    maxLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowPin("confirmNewPin")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#009689]"
                  >
                    {showPins.confirmNewPin ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmNewPin && (
                  <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    {errors.confirmNewPin}
                  </p>
                )}
              </div>

              {/* PIN Requirements */}
              <div className="bg-[#ffd8af]/10 border-2 border-[#ffd8af]/30 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm font-bold text-slate-900 mb-2">
                  PIN Requirements:
                </p>
                <ul className="space-y-1 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[#009689]" />
                    Minimum 4 digits
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[#009689]" />
                    Only numeric characters (0-9)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[#009689]" />
                    Different from current PIN
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[#009689]" />
                    Avoid easily guessable PINs (1234, 0000, etc.)
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitDisabled}
                  className="flex-1 bg-[#009689] hover:bg-[#007a6e] text-white font-bold py-4 sm:py-6 text-base sm:text-lg shadow-xl disabled:bg-slate-400 disabled:cursor-not-allowed order-2 sm:order-1"
                >
                  {isLoading ? (
                    "Changing PIN..."
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Change PIN
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleCancel}
                  disabled={isLoading}
                  variant="outline"
                  className="border-2 border-slate-300 font-bold py-4 sm:py-6 px-4 sm:px-8 disabled:border-slate-200 disabled:text-slate-400 order-1 sm:order-2"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Tips */}
        <Card className="border-2 border-[#009689]/20">
          <CardHeader className="bg-gradient-to-r from-[#009689]/5 to-[#ffd8af]/5 p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl font-black text-[#009689] flex items-center gap-2 justify-center sm:justify-start">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              Security Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#009689]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[#009689]" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm sm:text-base mb-1">
                    Change PIN Regularly
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Update your PIN every 3-6 months for better security
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#009689]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[#009689]" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm sm:text-base mb-1">
                    Never Share Your PIN
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600">
                    ZapWallet will never ask for your PIN via email or phone
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#009689]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[#009689]" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm sm:text-base mb-1">
                    Use Strong PINs
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Avoid sequential or repeated numbers
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#009689]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[#009689]" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm sm:text-base mb-1">
                    Enable Notifications
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Get alerts for all account activities
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecuritySettings;