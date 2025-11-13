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
import { cn } from "@/lib/utils";
import { useForm, type ControllerRenderProps } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import Password from "@/components/ui/Password";
import { Briefcase, Users, Phone } from "lucide-react";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters" })
      .max(50),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().regex(/^\+88\d{11}$/, {
      message: "Phone must start with +88 and be 13 digits total",
    }),
    nid: z.string().length(13, { message: "NID must be exactly 13 digits" }),
    pin: z.string().min(4, { message: "PIN must be at least 4 digits" }),
    confirmPin: z
      .string()
      .min(4, { message: "Confirm PIN must be at least 4 digits" }),
  })
  .refine((data) => data.pin === data.confirmPin, {
    message: "PINs do not match",
    path: ["confirmPin"],
  });

const agentSchema = registerSchema.safeExtend({
  tinId: z.string().length(13, { message: "TIN ID must be exactly 13 digits" }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;
type AgentFormValues = z.infer<typeof agentSchema>;

interface RegisterFormProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
  role: "user" | "agent" | null;
}

export function RegisterForm({ role, className, ...props }: RegisterFormProps) {
  const schema = role === "agent" ? agentSchema : registerSchema;
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  type FormValues = (typeof schema extends typeof agentSchema
    ? AgentFormValues
    : RegisterFormValues) & {
    tinId?: string;
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "+88",
      nid: "",
      pin: "",
      confirmPin: "",
      ...(role === "agent" && { tinId: "" }),
    } as FormValues,
  });

  const onSubmit = async (data: FormValues) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      pin: parseInt(data.pin),
      phone: data.phone,
      nid: data.nid,
      role: role,
      ...(role === "agent" && {
        agentInfo: {
          tinId: (data as AgentFormValues).tinId,
        },
      }),
    };

    try {
      const res = await register(userInfo).unwrap();
      console.log(res.data.email,"From Register");
      if (res.success === true) {
        toast.success(
          `${role === "agent" ? "Agent" : "User"} registered successfully`
        );
        navigate("/verify", { state: res.data.email });
      }
    } catch (error:any) {
      console.error(error);
      toast.error(`Registration failed ${error.data.message}`);
    }
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FormValues, "phone">
  ) => {
    const value = e.target.value;

    if (!value.startsWith("+88")) {
      field.onChange("+88");
      return;
    }
    
    if (value.length > 14) return;
    
    field.onChange(value);
  };

  if (!role) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="text-center">
          <p className="text-muted-foreground">
            Please select a role to continue registration.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#009689]/10 border border-[#009689]/20 mb-2">
          {role === "agent" ? (
            <Briefcase className="w-4 h-4 text-[#009689]" />
          ) : (
            <Users className="w-4 h-4 text-[#009689]" />
          )}
          <span className="text-sm font-semibold text-[#009689] capitalize">
            {role} Registration
          </span>
        </div>
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to register as a {role}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john.doe@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            name="nid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>National ID (NID)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="1234567890123"
                    maxLength={13}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {role === "agent" && (
            <FormField
              control={form.control}
              name="tinId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TIN ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1234567890123"
                      maxLength={13}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PIN</FormLabel>
                <FormControl>
                  <Password placeholder="Enter 4+ digit PIN" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm PIN</FormLabel>
                <FormControl>
                  <Password placeholder="Re-enter your PIN" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#009689] hover:bg-[#007a6e] text-white font-semibold"
          >
            Register
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link
          to="/login"
          className="underline underline-offset-4 text-[#009689] font-semibold"
        >
          Login
        </Link>
      </div>
    </div>
  );
}