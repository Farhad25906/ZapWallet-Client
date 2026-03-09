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
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import SectionHeader from "@/components/modules/HomePages/SectionHeader";

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

    if (value && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

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

      setFormData({
        oldPin: "",
        newPin: "",
        confirmNewPin: "",
      });
      setErrors({});
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

  const isFormEmpty = !formData.oldPin && !formData.newPin && !formData.confirmNewPin;
  const hasErrors = Object.keys(errors).length > 0;
  const isSubmitDisabled = isLoading || isFormEmpty || hasErrors;

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
        className="max-w-4xl mx-auto space-y-10"
      >
        {/* Header */}
        <SectionHeader
          badge="Security"
          title="Account Protection"
          subtitle="Manage your secure access credentials and monitor account safety status."
          center={false}
        />

        {/* Security Status */}
        <motion.div variants={itemVariants}>
          <Card className="border-none shadow-2xl bg-gradient-to-r from-[#009689] to-[#00c4b4] text-white rounded-[3rem] overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <CardContent className="p-8 sm:p-12 relative z-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center flex-shrink-0 animate-pulse">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h3 className="font-black text-3xl mb-4">Account Fully Secured</h3>
                  <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-xl">
                    Your account is protected with bank-level security. We recommend changing your PIN every 90 days for maximum safety.
                  </p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                    <Badge className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/20 font-black px-6 py-2 rounded-xl text-xs uppercase tracking-widest backdrop-blur-md">
                      PIN Active
                    </Badge>
                    <Badge className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/20 font-black px-6 py-2 rounded-xl text-xs uppercase tracking-widest backdrop-blur-md">
                      2FA Enabled
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Change PIN Form */}
        <motion.div variants={itemVariants}>
          <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white">
            <CardHeader className="bg-gradient-to-r from-[#009689]/5 to-[#ffd8af]/5 p-10 border-b border-slate-50">
              <CardTitle className="text-2xl font-black text-slate-900 flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[#009689]">
                  <Key className="w-7 h-7" />
                </div>
                Update Access PIN
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  {/* Current PIN */}
                  <div className="space-y-3">
                    <Label htmlFor="oldPin" className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Current PIN</Label>
                    <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#009689] transition-colors" />
                      <Input
                        id="oldPin"
                        name="oldPin"
                        type={showPins.oldPin ? "text" : "password"}
                        placeholder="••••••"
                        value={formData.oldPin}
                        onChange={handleChange}
                        className="pl-14 h-16 rounded-2xl border-none bg-slate-50 focus-visible:ring-2 focus-visible:ring-[#009689] text-2xl font-black tracking-widest"
                        maxLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => toggleShowPin("oldPin")}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#009689] transition-colors"
                      >
                        {showPins.oldPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.oldPin && <p className="text-xs font-bold text-red-500 flex items-center gap-2 ml-1"><AlertCircle className="w-4 h-4" />{errors.oldPin}</p>}
                  </div>

                  {/* New PIN */}
                  <div className="space-y-3">
                    <Label htmlFor="newPin" className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">New PIN</Label>
                    <div className="relative group">
                      <Key className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#009689] transition-colors" />
                      <Input
                        id="newPin"
                        name="newPin"
                        type={showPins.newPin ? "text" : "password"}
                        placeholder="••••••"
                        value={formData.newPin}
                        onChange={handleChange}
                        className="pl-14 h-16 rounded-2xl border-none bg-slate-50 focus-visible:ring-2 focus-visible:ring-[#009689] text-2xl font-black tracking-widest"
                        maxLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => toggleShowPin("newPin")}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#009689] transition-colors"
                      >
                        {showPins.newPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.newPin && <p className="text-xs font-bold text-red-500 flex items-center gap-2 ml-1"><AlertCircle className="w-4 h-4" />{errors.newPin}</p>}
                  </div>

                  {/* Confirm New PIN */}
                  <div className="space-y-3">
                    <Label htmlFor="confirmNewPin" className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Confirm New PIN</Label>
                    <div className="relative group">
                      <CheckCircle className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#009689] transition-colors" />
                      <Input
                        id="confirmNewPin"
                        name="confirmNewPin"
                        type={showPins.confirmNewPin ? "text" : "password"}
                        placeholder="••••••"
                        value={formData.confirmNewPin}
                        onChange={handleChange}
                        className="pl-14 h-16 rounded-2xl border-none bg-slate-50 focus-visible:ring-2 focus-visible:ring-[#009689] text-2xl font-black tracking-widest"
                        maxLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => toggleShowPin("confirmNewPin")}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#009689] transition-colors"
                      >
                        {showPins.confirmNewPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmNewPin && <p className="text-xs font-bold text-red-500 flex items-center gap-2 ml-1"><AlertCircle className="w-4 h-4" />{errors.confirmNewPin}</p>}
                  </div>
                </div>

                <div className="space-y-8 flex flex-col">
                  <div className="bg-slate-50 border-2 border-slate-100 rounded-[2rem] p-8 flex-1">
                    <h4 className="font-black text-slate-900 text-lg mb-6 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-[#009689]" />
                      PIN Requirements
                    </h4>
                    <ul className="space-y-4">
                      {[
                        "Must be exactly 6 numeric digits",
                        "Cannot match your current PIN",
                        "Avoid using sequential numbers (123456)",
                        "Avoid using repeating numbers (000000)"
                      ].map((req, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-500">
                          <CheckCircle className="w-4 h-4 text-[#009689]" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitDisabled}
                      className="flex-1 bg-[#009689] hover:bg-[#007a6e] text-white font-black py-8 rounded-[2rem] text-xl shadow-2xl hover:shadow-[#009689]/40 transition-all disabled:opacity-50 group"
                    >
                      {isLoading ? "Saving..." : (
                        <>
                          Update PIN Now
                          <Shield className="ml-3 w-6 h-6 group-hover:scale-125 transition-transform" />
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleCancel}
                      disabled={isLoading}
                      variant="outline"
                      className="px-10 py-8 rounded-[2rem] border-4 border-slate-100 font-black text-slate-400 hover:text-slate-600 transition-all"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Tips */}
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "2FA Protection", desc: "Enable two-factor authentication for an extra layer of security beyond your PIN.", icon: Shield },
            { title: "Regular Updates", desc: "Change your access credentials every 90 days to minimize risk of unauthorized access.", icon: Clock }
          ].map((tip, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden group">
                <CardContent className="p-8 flex gap-6 items-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#009689]/10 flex items-center justify-center text-[#009689] group-hover:scale-110 transition-transform">
                    <tip.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-lg mb-1">{tip.title}</h4>
                    <p className="text-sm font-bold text-slate-500 leading-relaxed">{tip.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SecuritySettings;
import { Clock } from "lucide-react";