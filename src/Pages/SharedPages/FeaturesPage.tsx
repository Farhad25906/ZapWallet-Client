import { 
  Send, 
  Wallet, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Users, 
  Shield,
  Zap,
  Clock,
  Lock,
  Smartphone,
  Receipt,
  Headphones
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FeaturesPage = () => {
  const mainFeatures = [
    {
      icon: Send,
      title: "Send Money",
      description: "Instant P2P transfers between users",
      details: "Transfer money to any ZapWallet user instantly. Just enter their number and amount.",
      color: "bg-[#009689]",
      iconColor: "text-white"
    },
    {
      icon: ArrowDownToLine,
      title: "Cash In",
      description: "Deposit cash at any agent",
      details: "Visit any ZapWallet agent to convert your cash into digital balance instantly.",
      color: "bg-[#ffd8af]",
      iconColor: "text-[#009689]"
    },
    {
      icon: ArrowUpFromLine,
      title: "Cash Out",
      description: "Withdraw cash anytime",
      details: "Convert your digital balance to cash at any agent location. Available 24/7.",
      color: "bg-[#009689]",
      iconColor: "text-white"
    },
    {
      icon: Wallet,
      title: "Add Money",
      description: "Admin to agent funding",
      details: "Agents receive funds from admin to serve customers efficiently.",
      color: "bg-[#ffd8af]",
      iconColor: "text-[#009689]"
    },
    {
      icon: ArrowUpFromLine,
      title: "Withdraw",
      description: "Agent to admin settlement",
      details: "Agents can return funds to admin for settlement and reconciliation.",
      color: "bg-[#009689]",
      iconColor: "text-white"
    },
    {
      icon: Users,
      title: "Agent Network",
      description: "50,000+ agents nationwide",
      details: "Find an agent near you for cash in/out services anytime, anywhere.",
      color: "bg-[#ffd8af]",
      iconColor: "text-[#009689]"
    }
  ];

  const additionalFeatures = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "256-bit encryption protects every transaction"
    },
    {
      icon: Zap,
      title: "Instant Transfers",
      description: "Money arrives in seconds, not days"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Service never sleeps, always ready"
    },
    {
      icon: Lock,
      title: "PIN Protection",
      description: "Secure PIN and biometric authentication"
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Optimized for all devices and platforms"
    },
    {
      icon: Receipt,
      title: "Transaction History",
      description: "Complete records of all your activities"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Always here to help you succeed"
    },
    {
      icon: Users,
      title: "Multi-User",
      description: "Family accounts and shared wallets"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-[#009689] text-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-white text-[#009689] hover:bg-white px-4 py-2">
              Features
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              Everything You Need
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Powerful features designed for seamless digital payments
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#009689] mb-4">Core Services</h2>
            <p className="text-xl text-slate-600">
              Complete ecosystem for all your payment needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-[#009689] transition-all duration-300 hover:shadow-2xl group">
                <CardContent className="p-8">
                  <div className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                  </div>
                  <h3 className="font-black text-2xl mb-3 text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-[#009689] font-semibold mb-3">
                    {feature.description}
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.details}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Transaction Flow Visual */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#009689] mb-4">How It Works</h2>
            <p className="text-xl text-slate-600">
              Simple, secure, and straightforward
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-[#009689] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold text-xl mb-2">Create Account</h3>
              <p className="text-slate-600">Sign up in minutes with just your phone number</p>
            </div>
            <div className="text-center">
              <div className="bg-[#ffd8af] text-[#009689] w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold text-xl mb-2">Add Money</h3>
              <p className="text-slate-600">Cash in at any agent or link your bank</p>
            </div>
            <div className="text-center">
              <div className="bg-[#009689] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold text-xl mb-2">Start Transacting</h3>
              <p className="text-slate-600">Send, receive, and manage your money</p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#009689] mb-4">More Features</h2>
            <p className="text-xl text-slate-600">
              Built with security and convenience in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-[#ffd8af] transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-[#009689]" />
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#009689] text-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
          <h2 className="text-4xl font-black mb-6">Ready to Experience ZapWallet?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join millions of users enjoying seamless digital payments
          </p>
          <button className="bg-white text-[#009689] px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#ffd8af] transition-all duration-300 shadow-xl">
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;