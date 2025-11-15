import bg from "@/assets/images/registration.jpeg";
import { Link } from "react-router";
import Logo from "@/assets/icons/Logo";
import { RegisterForm } from "@/components/modules/Authentication/RegisterForm";
import { useState } from "react";
import {
  RoleSelectionDialog,
  type RoleType,
} from "@/components/modules/Authentication/RoleSelectionDialog";

export default function Register() {
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  const [showRoleDialog, setShowRoleDialog] = useState(true);

  const handleRoleSelect = (role: RoleType) => {
    setSelectedRole(role);
    setShowRoleDialog(false);
  };
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <RoleSelectionDialog
        open={showRoleDialog}
        onRoleSelect={handleRoleSelect}
      />
      <div className="relative hidden bg-muted lg:block">
        <img
          src={bg}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm role={selectedRole} />
          </div>
        </div>
      </div>
    </div>
  );
}
