import { motion } from "framer-motion";
import {
    Send,
    ArrowDownToLine,
    ArrowUpFromLine,
    Smartphone,
    CheckCircle2
} from "lucide-react";
import SectionHeader from "./SectionHeader";
import { Card, CardContent } from "@/components/ui/card";

const FeaturesSection = () => {
    const coreServices = [
        {
            icon: Send,
            title: "Send Money",
            desc: "Instant P2P transfers to anyone, anywhere.",
            accent: "bg-[#009689]"
        },
        {
            icon: ArrowDownToLine,
            title: "Cash In",
            desc: "Fast deposits at 50,000+ agent points.",
            accent: "bg-[#ffd8af]"
        },
        {
            icon: ArrowUpFromLine,
            title: "Cash Out",
            desc: "Withdrawal made easy and secure.",
            accent: "bg-[#009689]"
        }
    ];

    const highlights = [
        "Bank-Level Encryption",
        "Real-time Confirmations",
        "Biometric Security",
        "Multi-platform Support",
        "No Hidden Charges",
        "24/7 Agent Availability"
    ];

    return (
        <section id="features" className="py-24 bg-slate-50">
            <div className="container mx-auto px-6">
                <SectionHeader
                    badge="Core Ecosystem"
                    title="Everything You Need For Digital Payments"
                    subtitle="Powerful features designed to make your financial life simpler, faster, and more secure than ever before."
                />

                <div className="grid lg:grid-cols-3 gap-8 mb-20">
                    {coreServices.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full border-2 hover:border-[#009689] transition-all duration-300 group shadow-lg hover:shadow-2xl">
                                <CardContent className="p-10">
                                    <div className={`${service.accent} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                                        <service.icon className={`w-8 h-8 ${service.accent === "bg-[#009689]" ? "text-white" : "text-[#009689]"}`} />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-4">{service.title}</h3>
                                    <p className="text-slate-600 text-lg leading-relaxed">{service.desc}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-[#009689] rounded-[3rem] p-8 md:p-16 overflow-hidden relative shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full -ml-24 -mb-24"></div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-black text-white mb-6">Driven By Innovation & Security</h3>
                            <p className="text-white/80 text-lg mb-10 leading-relaxed">
                                We combine bank-grade security with the latest mobile technology to ensure your funds are always safe and accessible.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {highlights.map((item, index) => (
                                    <div key={index} className="flex items-center gap-3 text-white">
                                        <CheckCircle2 className="w-5 h-5 text-[#ffd8af]" />
                                        <span className="font-semibold">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <motion.div
                            initial={{ rotate: 12, y: 50 }}
                            whileInView={{ rotate: 0, y: 0 }}
                            viewport={{ once: true }}
                            className="hidden lg:flex justify-center"
                        >
                            <div className="bg-white/10 p-8 rounded-[2.5rem] backdrop-blur-md border border-white/20 shadow-inner">
                                <Smartphone className="w-64 h-64 text-white opacity-40" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
