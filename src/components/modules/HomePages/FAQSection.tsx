import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircle } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { Button } from "@/components/ui/button";

const FAQSection = () => {
    const faqs = [
        {
            q: "How do I create a ZapWallet account?",
            a: "Simply download our app or click register, enter your phone number, verify with OTP, and set your secure PIN. You'll be ready in under 2 minutes."
        },
        {
            q: "What are the transaction fees?",
            a: "Send Money is just ৳5 flat. Cash Out is 1.5% commission. Cash In is always completely free of charge."
        },
        {
            q: "Is ZapWallet secure?",
            a: "Absolutely. We use bank-level 256-bit encryption, two-factor authentication, and are fully compliant with legal financial standards."
        },
        {
            q: "Can I use ZapWallet without internet?",
            a: "Yes! You can use our USSD code (coming soon) to perform basic transactions like balance checks and money transfers without data."
        }
    ];

    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <SectionHeader
                    badge="Common Questions"
                    title="Resolve Your Doubts"
                    subtitle="Everything you need to know about our platform, fees, and security measures in one place."
                />

                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border-2 rounded-3xl overflow-hidden transition-all duration-300 ${activeIndex === index ? "border-[#009689] shadow-xl" : "border-slate-100"
                                }`}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full px-8 py-7 flex items-center justify-between text-left group"
                            >
                                <span className={`text-xl font-bold transition-colors ${activeIndex === index ? "text-[#009689]" : "text-slate-800"
                                    }`}>
                                    {faq.q}
                                </span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${activeIndex === index ? "bg-[#009689] text-white" : "bg-slate-100 text-slate-400 group-hover:bg-[#ffd8af] group-hover:text-[#009689]"
                                    }`}>
                                    {activeIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-8 pb-8 text-slate-600 text-lg leading-relaxed border-t border-slate-50 pt-4">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center bg-[#ffd8af]/20 rounded-3xl p-10 max-w-2xl mx-auto border-2 border-dashed border-[#ffd8af]">
                    <MessageCircle className="w-12 h-12 text-[#009689] mx-auto mb-4" />
                    <h4 className="text-2xl font-black text-[#009689] mb-2">Still Need Help?</h4>
                    <p className="text-slate-600 mb-6 font-medium">Our 24/7 support team is just a chat away.</p>
                    <Button className="bg-[#009689] hover:bg-[#007a6e] text-white px-8 py-6 rounded-2xl font-bold shadow-lg transition-all hover:scale-105">
                        Contact Support
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
