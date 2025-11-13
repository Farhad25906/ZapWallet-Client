import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Briefcase, Users } from "lucide-react";

interface RoleSelectionDialogProps {
  open: boolean;
  onRoleSelect: (role: "user" | "agent") => void;
}

export function RoleSelectionDialog({ open, onRoleSelect }: RoleSelectionDialogProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-[#009689]">
            Choose Your Role
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Select how you want to use ZapWallet
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-6">
          <button
            onClick={() => onRoleSelect("user")}
            className="flex flex-col items-center gap-4 p-6 rounded-xl border-2 border-slate-200 hover:border-[#009689] hover:bg-[#009689]/5 transition-all duration-300 group"
          >
            <div className="w-16 h-16 rounded-full bg-[#009689]/10 group-hover:bg-[#009689] flex items-center justify-center transition-colors">
              <Users className="w-8 h-8 text-[#009689] group-hover:text-white transition-colors" />
            </div>
            <div className="text-center">
              <div className="font-bold text-lg mb-1">User</div>
              <div className="text-sm text-slate-600">Personal account for daily transactions</div>
            </div>
          </button>

          <button
            onClick={() => onRoleSelect("agent")}
            className="flex flex-col items-center gap-4 p-6 rounded-xl border-2 border-slate-200 hover:border-[#ffd8af] hover:bg-[#ffd8af]/5 transition-all duration-300 group"
          >
            <div className="w-16 h-16 rounded-full bg-[#ffd8af]/30 group-hover:bg-[#ffd8af] flex items-center justify-center transition-colors">
              <Briefcase className="w-8 h-8 text-[#009689] transition-colors" />
            </div>
            <div className="text-center">
              <div className="font-bold text-lg mb-1">Agent</div>
              <div className="text-sm text-slate-600">Provide cash in/out services</div>
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}