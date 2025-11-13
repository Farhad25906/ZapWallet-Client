import { CheckCircle, X } from "lucide-react";
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
      <DialogContent className="sm:max-w-sm p-0 gap-0">
        {/* Header with gradient */}
        <DialogHeader className="bg-gradient-to-r from-[#009689] to-[#00c4b4] text-white p-4 pb-6 relative">
          {/* <Button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </Button> */}
          
          <div className="flex flex-col items-center pt-2">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-3">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <DialogTitle className="text-center text-xl font-black text-white">
              {title}
            </DialogTitle>
            <p className="text-center text-sm text-white/90 mt-1">
              {description}
            </p>
          </div>
        </DialogHeader>

        <div className="p-4 space-y-3">
          {/* Amount - Centered and Bold */}
          <div className="text-center py-3 bg-gradient-to-br from-[#009689]/5 to-[#ffd8af]/10 rounded-lg">
            <p className="text-xs text-slate-600 mb-1 font-semibold">Amount</p>
            <p className="text-3xl font-black text-[#009689]">
              ৳{receipt?.amount?.toLocaleString()}
            </p>
          </div>

          {/* Transaction Details - Compact */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">From</span>
              <span className="font-bold text-slate-900">{receipt?.fromNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">To</span>
              <span className="font-bold text-slate-900">{receipt?.toNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Fee</span>
              <span className="font-bold text-[#009689]">৳{receipt?.fee}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-slate-600">Status</span>
              <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs">
                {receipt?.status}
              </Badge>
            </div>
          </div>

          {/* Transaction ID - Compact */}
          <div className="bg-slate-100 rounded-lg p-2">
            <p className="text-xs text-slate-600 mb-1">Transaction ID</p>
            <p className="font-mono text-xs font-bold text-slate-900 break-all">
              {receipt?.transactionId}
            </p>
          </div>

          {/* Close Button */}
          <Button 
            onClick={onClose} 
            className="w-full bg-[#009689] hover:bg-[#007a6e] text-white font-bold"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionSuccessModal;