import { motion } from "framer-motion";
import { Shield, Zap, TrendingUp, Award } from "lucide-react";
import SectionHeader from "./SectionHeader";

const AboutSection = () => {
    const values = [
        {
            icon: Shield,
            title: "Security First",
            description: "Bank-level encryption protecting every transaction",
        },
        {
            icon: Zap,
            title: "Lightning Fast",
            description: "Instant transfers and real-time processing",
        },
        {
            icon: TrendingUp,
            title: "Growth Focused",
            description: "Empowering financial inclusion for all",
        },
        {
            icon: Award,
            title: "Trust & Transparency",
            description: "Clear fees, no hidden charges",
        },
    ];

    const stats = [
        { label: "Active Users", value: "10M+", color: "bg-[#009689]", textColor: "text-white" },
        { label: "Agent Network", value: "50K+", color: "bg-[#ffd8af]", textColor: "text-[#009689]" },
        { label: "Daily Uptime", value: "99.9%", color: "bg-[#009689]", textColor: "text-white" },
    ];

    return (
        <section id="about" className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <SectionHeader
                    badge="About ZapWallet"
                    title="Revolutionizing Digital Payments"
                    subtitle="We're building the future of financial inclusion with a robust ecosystem that connects users, agents, and businesses seamlessly."
                />

                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-3xl font-black text-[#009689] mb-6">Our Story</h3>
                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                            <p>
                                ZapWallet was born from a simple vision: to make digital payments as easy as handing cash to a friend. Founded in 2020, we recognized that millions were underserved by traditional banking.
                            </p>
                            <p>
                                We built a platform that isn't just a wallet, but a gateway to the digital economy. Today, we're proud to serve a growing network of millions, processing transactions with the speed and security our users deserve.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center group">
                                    <div className={`${stat.color} ${stat.textColor} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        {stat.value}
                                    </div>
                                    <div className="font-bold text-slate-800">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-[#ffd8af]/20 rounded-3xl -rotate-2"></div>
                        <div className="relative bg-white border-4 border-[#ffd8af] p-8 md:p-12 rounded-3xl shadow-xl">
                            <div className="grid sm:grid-cols-2 gap-8">
                                {values.map((value, index) => (
                                    <div key={index} className="space-y-4">
                                        <div className="w-12 h-12 bg-[#009689]/10 rounded-xl flex items-center justify-center">
                                            <value.icon className="w-6 h-6 text-[#009689]" />
                                        </div>
                                        <h4 className="font-bold text-xl text-slate-900">{value.title}</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
