import { 
  Send, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Info
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const PricingSection = () => {
  const transactionFees = [
    {
      icon: Send,
      title: "Send Money (P2P)",
      fee: "৳5",
      description: "Per transaction",
      details: "Transfer money to any ZapWallet user",
      color: "bg-[#009689]"
    },
    {
      icon: ArrowUpFromLine,
      title: "Cash Out",
      fee: "1.5%",
      description: "Of withdrawal amount",
      details: "Withdraw cash from any agent",
      color: "bg-[#ffd8af]"
    },
    {
      icon: ArrowDownToLine,
      title: "Cash In",
      fee: "FREE",
      description: "No charges",
      details: "Deposit cash at any agent location",
      color: "bg-[#009689]"
    }
  ];

  const additionalInfo = [
    {
      title: "No Hidden Charges",
      description: "All fees are transparent and shown before confirming"
    },
    {
      title: "Daily Limits",
      description: "Personal: ৳50,000/day | Business: ৳500,000/day"
    },
    {
      title: "Monthly Limits",
      description: "Personal: ৳1,000,000/month | Business: Unlimited"
    },
    {
      title: "Instant Processing",
      description: "All transactions processed in real-time"
    }
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Transaction Fees */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#009689] mb-4">
              Transaction Fees
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Clear and competitive rates for all services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {transactionFees.map((item, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-[#009689] transition-all duration-300 hover:shadow-xl"
              >
                <CardContent className="p-6 md:p-8 text-center">
                  <div className={`${item.color} w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mx-auto mb-4 md:mb-6`}>
                    <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="font-black text-xl md:text-2xl mb-3 text-slate-900">
                    {item.title}
                  </h3>
                  <div className="text-3xl md:text-4xl font-black text-[#009689] mb-2">
                    {item.fee}
                  </div>
                  <p className="text-slate-600 font-medium mb-3 md:mb-4 text-base">
                    {item.description}
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.details}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Fee Example */}
          <div className="mt-12 md:mt-16 max-w-4xl mx-auto">
            <div className="bg-[#ffd8af]/20 border-2 border-[#ffd8af] rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <Info className="w-5 h-5 md:w-6 md:h-6 text-[#009689] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg md:text-xl mb-3 text-slate-900">
                    Fee Examples
                  </h4>
                  <ul className="space-y-2 text-slate-700 text-sm md:text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-[#009689] mt-1">•</span>
                      <span>Send ৳1,000 to friend = ৳5 fee (total: ৳1,005)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#009689] mt-1">•</span>
                      <span>Cash out ৳10,000 = ৳150 fee (1.5% of ৳10,000)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#009689] mt-1">•</span>
                      <span>Cash in ৳5,000 = ৳0 fee (completely free)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#009689] mb-4">
              Good to Know
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Important information about your ZapWallet account
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {additionalInfo.map((item, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-[#ffd8af] transition-all duration-300 bg-white"
              >
                <CardContent className="p-6 md:p-8">
                  <h3 className="font-bold text-lg md:text-xl mb-3 text-[#009689]">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default PricingSection;