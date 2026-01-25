/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/Password";

import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { Phone, User, Briefcase, Shield } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEMO_USERS, type DemoUserType } from "@/constants/demoUsers";
import { motion } from "framer-motion";


const loginSchema = z.object({
  phone: z.string().regex(/^\+88\d{11}$/, {
    message: "Phone must start with +88 and be 13 digits total",
  }),
  pin: z
    .string()
    .length(6, { message: "PIN must be exactly 6 digits" })
    .regex(/^\d+$/, { message: "PIN must contain only numbers" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "+88",
      pin: "",
    },
  });

  const [login] = useLoginMutation();

  const onSubmit = async (data: LoginFormValues) => {
    console.log(data);

    try {
      const res = await login(data).unwrap();
      console.log(res);
      if (res.success) {
        toast.success("Logged in successfully");
        navigate("/");
      }
    } catch (error: any) {
      console.error(error.data.message);

      // Handle specific error cases with user-friendly messages
      if (error.data.message === "Password does not match") {
        toast.error("Invalid credentials. Please try again.");
      } else if (error.data.message === "User is not verified") {
        toast.error("Your account is not verified. Redirecting to verification...");
        navigate("/verify", { state: data.phone });
      } else {
        // Generic error message for other cases
        toast.error(error.data.message || "Login failed. Please try again.");
      }
    }
  };

  interface PhoneField {
    onChange: (value: string) => void;
    value?: string;
    name?: string;
    ref?: React.LegacyRef<HTMLInputElement>;
  }

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: PhoneField
  ): void => {
    const value: string = e.target.value;

    if (!value.startsWith("+88")) {
      field.onChange("+88");
      return;
    }
    if (value.length > 14) return;

    field.onChange(value);
  };

  const handlePinChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ): void => {
    const value: string = e.target.value;

    // Only allow exactly 6 digits
    if (/^\d*$/.test(value) && value.length <= 6) {
      field.onChange(value);
    }
  };

  const handleDemoLogin = (userType: DemoUserType) => {
    const demoUser = DEMO_USERS[userType];
    form.setValue("phone", demoUser.phone);
    form.setValue("pin", demoUser.pin);
    toast.info(`Demo ${userType} credentials loaded. Click Login to continue.`);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your phone number below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#009689]" />
                      <Input
                        placeholder="+8801234567890"
                        className="pl-12"
                        {...field}
                        onChange={(e) => handlePhoneChange(e, field)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PIN</FormLabel>
                  <FormControl>
                    <Password
                      placeholder="Enter 6-digit PIN"
                      {...field}
                      onChange={(error: any) => handlePinChange(error, field)}
                      maxLength={6}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-[#009689] hover:bg-[#007a6e] text-white font-semibold"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        {/* Demo Login Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-3"
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Quick Demo Login
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="button"
                variant="outline"
                className="w-full border-[#009689]/30 hover:bg-[#009689]/10 hover:border-[#009689] transition-all"
                onClick={() => handleDemoLogin("user")}
              >
                <User className="w-4 h-4 mr-1" />
                User
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="button"
                variant="outline"
                className="w-full border-[#009689]/30 hover:bg-[#009689]/10 hover:border-[#009689] transition-all"
                onClick={() => handleDemoLogin("agent")}
              >
                <Briefcase className="w-4 h-4 mr-1" />
                Agent
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="button"
                variant="outline"
                className="w-full border-[#009689]/30 hover:bg-[#009689]/10 hover:border-[#009689] transition-all"
                onClick={() => handleDemoLogin("admin")}
              >
                <Shield className="w-4 h-4 mr-1" />
                Admin
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-sm"
      >
        Don&apos;t have an account?{" "}
        <Link to="/register" replace className="underline underline-offset-4">
          Register
        </Link>
      </motion.div>
    </div>
  );
}