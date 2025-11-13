import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { Dot, Mail, Shield, CheckCircle, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import Logo from "@/assets/icons/Logo";
import { Badge } from "@/components/ui/badge";

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email] = useState(location.state);
  const [confirmed, setConfirmed] = useState(false);
  const [sendOtp] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const [timer, setTimer] = useState(5);
  const [otpValue, setOtpValue] = useState("");
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    const toastId = toast.loading("Sending OTP");

    try {
      const res = await sendOtp({ email: email }).unwrap();

      if (res.success) {
        toast.success("OTP Sent", { id: toastId });
        setConfirmed(true);
        setTimer(60);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to send OTP", { id: toastId });
    }
  };

  const handleSubmit = async () => {
    if (otpValue.length < 6) {
      setError("Your one-time password must be 6 characters.");
      return;
    }

    const toastId = toast.loading("Verifying OTP");
    const userInfo = {
      email,
      otp: otpValue,
    };

    try {
      const res = await verifyOtp(userInfo).unwrap();
      if (res.success) {
        toast.success("OTP Verified", { id: toastId });
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Invalid OTP", { id: toastId });
      setError("Invalid OTP. Please try again.");
    }
  };

  useEffect(() => {
    if (!email || !confirmed) {
      return;
    }

    const timerId = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [email, confirmed]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (value: string) => {
    setOtpValue(value);
    if (error) setError("");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Logo />
          <span className="text-4xl font-black text-[#009689]">ZapWallet</span>
        </div>

        {confirmed ? (
          <Card className="border-2 border-[#009689]/20 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-[#009689]/5 to-[#ffd8af]/5 pb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#009689] flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-black text-center text-[#009689]">
                Verify Your Email
              </CardTitle>
              <CardDescription className="text-center text-base">
                Please enter the 6-digit code we sent to
              </CardDescription>
              <Badge className="mt-2 bg-[#ffd8af] text-[#009689] hover:bg-[#ffd8af] font-bold mx-auto">
                <Mail className="w-4 h-4 mr-2" />
                {email}
              </Badge>
            </CardHeader>
            <CardContent className="pt-6 pb-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-base font-bold text-slate-700">
                    One-Time Password
                  </Label>
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={otpValue} onChange={handleOtpChange}>
                      <InputOTPGroup>
                        <InputOTPSlot 
                          index={0} 
                          className="border-2 border-[#009689]/30 focus:border-[#009689] h-14 w-12 text-xl font-bold"
                        />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot 
                          index={1} 
                          className="border-2 border-[#009689]/30 focus:border-[#009689] h-14 w-12 text-xl font-bold"
                        />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot 
                          index={2} 
                          className="border-2 border-[#009689]/30 focus:border-[#009689] h-14 w-12 text-xl font-bold"
                        />
                      </InputOTPGroup>
                      <Dot className="text-[#009689]" />
                      <InputOTPGroup>
                        <InputOTPSlot 
                          index={3} 
                          className="border-2 border-[#009689]/30 focus:border-[#009689] h-14 w-12 text-xl font-bold"
                        />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot 
                          index={4} 
                          className="border-2 border-[#009689]/30 focus:border-[#009689] h-14 w-12 text-xl font-bold"
                        />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot 
                          index={5} 
                          className="border-2 border-[#009689]/30 focus:border-[#009689] h-14 w-12 text-xl font-bold"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  {error && (
                    <p className="text-sm text-red-600 text-center mt-2">{error}</p>
                  )}
                  <div className="text-center mt-4">
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <span className="text-slate-600">Didn't receive the code?</span>
                      <Button
                        onClick={handleSendOtp}
                        type="button"
                        variant="link"
                        disabled={timer !== 0}
                        className={cn("p-0 font-bold text-[#009689]", {
                          "cursor-pointer hover:underline": timer === 0,
                          "text-slate-400 cursor-not-allowed": timer !== 0,
                        })}
                      >
                        Resend OTP
                      </Button>
                    </div>
                    {timer > 0 && (
                      <div className="flex items-center justify-center gap-2 mt-2 text-sm">
                        <Clock className="w-4 h-4 text-[#009689]" />
                        <span className="font-semibold text-[#009689]">
                          Resend available in {formatTime(timer)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-6 bg-[#ffd8af]/10 border-2 border-[#ffd8af]/30 rounded-lg p-4">
                <p className="text-xs text-slate-700 text-center">
                  🔒 <span className="font-bold">Security Notice:</span> Never share your OTP with anyone. 
                  ZapWallet will never ask for your verification code.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 pt-2 pb-6">
              <Button 
                onClick={handleSubmit}
                disabled={otpValue.length < 6}
                className="w-full bg-[#009689] hover:bg-[#007a6e] text-white font-bold py-6 text-lg shadow-xl"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Verify & Continue
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="border-2 border-[#009689]/20 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-[#009689]/5 to-[#ffd8af]/5 pb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#009689] flex items-center justify-center">
                  <Mail className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-black text-center text-[#009689]">
                Email Verification
              </CardTitle>
              <CardDescription className="text-center text-base mt-2">
                We will send a verification code to
              </CardDescription>
              <Badge className="mt-3 bg-[#ffd8af] text-[#009689] hover:bg-[#ffd8af] font-bold mx-auto px-4 py-2 text-base">
                <Mail className="w-4 h-4 mr-2" />
                {email}
              </Badge>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="bg-[#009689]/5 border-2 border-[#009689]/20 rounded-xl p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#009689] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900">Secure Verification</p>
                    <p className="text-sm text-slate-600">Your code is encrypted and valid for 2 minutes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#009689] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900">One-Time Use</p>
                    <p className="text-sm text-slate-600">Each code can only be used once for security</p>
                  </div>
                </div>
                
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 pt-2 pb-6">
              <Button 
                onClick={handleSendOtp} 
                className="w-full bg-[#009689] hover:bg-[#007a6e] text-white font-bold py-6 text-lg shadow-xl"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Verification Code
              </Button>
             
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}