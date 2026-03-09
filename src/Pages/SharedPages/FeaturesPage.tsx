import { motion } from "framer-motion";
import {
  Send,
  ArrowDownToLine,
  ArrowUpFromLine,
  Wallet,
  Users,
  Shield,
  Zap,
  Smartphone,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeader from "@/components/modules/HomePages/SectionHeader";

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
      icon: Users,
      title: "Agent Network",
      description: "50,000+ agents nationwide",
      details: "Find an agent near you for cash in/out services anytime, anywhere.",
      color: "bg-[#009689]",
      iconColor: "text-white"
    },
    {
      icon: Shield,
      title: "Secure Vault",
      description: "Bank-level asset protection",
      details: "Your funds are stored in secure, encrypted vaults with multi-sig protection.",
      color: "bg-[#ffd8af]",
      iconColor: "text-[#009689]"
    }
  ];

  const highlights = [
    "256-bit AES Encryption",
    "Biometric Authentication",
    "Real-time fraud detection",
    "Instant SMS Notifications",
    "Multi-platform support",
    "Regulatory Compliance"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="pt-32 pb-20 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-6">
          <SectionHeader
            badge="Features"
            title="Everything You Need Setup"
            subtitle="Explore the powerful tools and security measures that make ZapWallet the leader in digital payments."
          />
        </div>
      </section>

      {/* Main Features */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:border-[#009689] transition-all duration-300 group shadow-lg hover:shadow-2xl rounded-[2.5rem] overflow-hidden">
                  <CardContent className="p-10">
                    <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-[#009689] font-bold mb-4 uppercase tracking-tighter">{feature.description}</p>
                    <p className="text-slate-600 leading-relaxed">{feature.details}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Visual */}
      <section className="py-24 bg-[#009689] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48"></div>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Zap className="w-16 h-16 text-[#ffd8af] mb-8" />
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                Built On Foundation Of Trust & Innovation
              </h2>
              <p className="text-xl text-white/80 mb-12 leading-relaxed">
                We've engineered ZapWallet to be the most secure and reliable payment platform. Our multi-layer security ensures your peace of mind.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#ffd8af]" />
                    <span className="font-bold text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ rotate: -10, y: 50, opacity: 0 }}
              whileInView={{ rotate: 0, y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="hidden lg:flex justify-end"
            >
              <div className="bg-white/10 p-12 rounded-[4rem] backdrop-blur-xl border border-white/20 shadow-inner">
                <Smartphone className="w-72 h-72 text-white/50" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <SectionHeader
            badge="Process"
            title="Getting Started Is Seamless"
            subtitle="Three simple steps to join the digital revolution and take control of your finances."
          />

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[1, 2, 3].map((step) => (
              <div key={step} className="text-center group">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center font-black text-3xl mx-auto mb-8 transition-all duration-300 ${step === 2 ? "bg-[#ffd8af] text-[#009689]" : "bg-[#009689] text-white"
                  } group-hover:scale-110 shadow-xl`}>
                  {step}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">
                  {step === 1 ? "Create Account" : step === 2 ? "Verify Identity" : "Start Transacting"}
                </h3>
                <p className="text-slate-600 text-lg">
                  {step === 1 ? "Sign up with your phone number in seconds." :
                    step === 2 ? "Complete optional KYC for higher limits." :
                      "Enjoy instant, secure payments anywhere."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;