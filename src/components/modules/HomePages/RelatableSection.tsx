import { motion } from "framer-motion";
import { Utensils, ShoppingBag, Globe, Zap } from "lucide-react";

const useCases = [
    {
        title: "Dining Out",
        description: "Split bills instantly with friends at your favorite restaurants.",
        icon: Utensils,
        color: "bg-orange-500",
        delay: 0.1
    },
    {
        title: "Global Shopping",
        description: "Shop from international brands with seamless currency conversion.",
        icon: ShoppingBag,
        color: "bg-blue-500",
        delay: 0.2
    },
    {
        title: "Instant Transfers",
        description: "Send money across the globe in seconds, not days.",
        icon: Globe,
        color: "bg-emerald-500",
        delay: 0.3
    },
    {
        title: "Quick Recharge",
        description: "Never run out of balance. Top up your phone or services instantly.",
        icon: Zap,
        color: "bg-purple-500",
        delay: 0.4
    }
];

const RelatableSection = () => {
    return (
        <section className="py-20 bg-slate-50 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-[#009689] rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#ffd8af] rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black text-slate-900 mb-4"
                    >
                        Your Money, Your <span className="text-[#009689]">Lifestyle</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-600 text-lg max-w-2xl mx-auto"
                    >
                        ZapWallet integrates perfectly into your daily routine, making every transaction a breeze.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {useCases.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: item.delay, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                            className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 group transition-all duration-300"
                        >
                            <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-${item.color.split('-')[1]}-200 group-hover:scale-110 transition-transform duration-300`}>
                                <item.icon className="text-white w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RelatableSection;
