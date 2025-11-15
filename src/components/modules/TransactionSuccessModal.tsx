import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

export interface TransactionReceipt {
  transactionId: string;
  amount: number;
  fromNumber: string;
  toNumber: string;
  timestamp: string;
  status: string;
  fee: number;
}

interface TransactionSuccessModalProps {
  receipt: TransactionReceipt;
  isOpen: boolean;
  onClose: () => void;
  autoCloseDelay?: number;
  title?: string;
  description?: string;
}

const TransactionSuccessModal = ({
  receipt,
  isOpen,
  onClose,
  autoCloseDelay = 10000,
  title = "Transaction Successful!",
  description = "Cash In completed successfully",
}: TransactionSuccessModalProps) => {
  useEffect(() => {
    if (isOpen && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoCloseDelay, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-sm md:max-w-md w-full mx-2 p-0 gap-0 rounded-lg sm:rounded-xl">
        {/* Header with gradient */}
        <DialogHeader className="bg-gradient-to-r from-[#009689] to-[#00c4b4] text-white p-3 sm:p-4 pb-4 sm:pb-6 relative rounded-t-lg sm:rounded-t-xl">
          <div className="flex flex-col items-center pt-1 sm:pt-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/20 flex items-center justify-center mb-2 sm:mb-3">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
            </div>
            <DialogTitle className="text-center text-lg sm:text-xl md:text-2xl font-black text-white">
              {title}
            </DialogTitle>
            <p className="text-center text-xs sm:text-sm text-white/90 mt-1 max-w-[90%]">
              {description}
            </p>
          </div>
        </DialogHeader>

        <div className="p-3 sm:p-4 md:p-5 space-y-2 sm:space-y-3 md:space-y-4">
          {/* Amount - Centered and Bold */}
          <div className="text-center py-2 sm:py-3 bg-gradient-to-br from-[#009689]/5 to-[#ffd8af]/10 rounded-lg">
            <p className="text-xs text-slate-600 mb-1 font-semibold">Amount</p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-black text-[#009689]">
              ৳{receipt?.amount?.toLocaleString()}
            </p>
          </div>

          {/* Transaction Details - Compact */}
          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm md:text-base">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">From</span>
              <span className="font-bold text-slate-900 text-right break-all ml-2 max-w-[60%]">
                {receipt?.fromNumber}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">To</span>
              <span className="font-bold text-slate-900 text-right break-all ml-2 max-w-[60%]">
                {receipt?.toNumber}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Fee</span>
              <span className="font-bold text-[#009689]">৳{receipt?.fee}</span>
            </div>
            <div className="flex justify-between items-center pt-1 sm:pt-2 border-t">
              <span className="text-slate-600">Status</span>
              <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm">
                {receipt?.status}
              </Badge>
            </div>
          </div>

          {/* Transaction ID - Compact */}
          <div className="bg-slate-100 rounded-lg p-2 sm:p-3">
            <p className="text-xs text-slate-600 mb-1">Transaction ID</p>
            <p className="font-mono text-xs font-bold text-slate-900 break-all leading-tight">
              {receipt?.transactionId}
            </p>
          </div>

          {/* Close Button */}
          <Button 
            onClick={onClose} 
            className="w-full bg-[#009689] hover:bg-[#007a6e] text-white font-bold py-2 sm:py-3 text-sm sm:text-base"
          >
            Close
          </Button>

          {/* Auto-close indicator for mobile */}
          {autoCloseDelay > 0 && (
            <div className="text-center">
              <p className="text-xs text-slate-500">
                This dialog will close automatically in {autoCloseDelay / 1000} seconds
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionSuccessModal;