import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
    const info = [
        { icon: Phone, title: "Support Line", detail: "+880 1234-567890", color: "bg-[#009689]" },
        { icon: Mail, title: "Email Support", detail: "help@zapwallet.com", color: "bg-[#ffd8af]" },
        { icon: MapPin, title: "Head Office", detail: "Dhaka, Bangladesh", color: "bg-[#009689]" }
    ];

    return (
        <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <SectionHeader
                    badge="Contact Us"
                    title="Let's Start A Conversation"
                    subtitle="Have questions or feedback? We'd love to hear from you. Reach out through any of these channels."
                />

                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-1 space-y-6">
                        {info.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-8 rounded-3xl shadow-lg border-b-4 border-transparent hover:border-[#ffd8af] transition-all"
                            >
                                <div className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center mb-6`}>
                                    <item.icon className={`w-6 h-6 ${item.color === "bg-[#009689]" ? "text-white" : "text-[#009689]"}`} />
                                </div>
                                <h4 className="font-bold text-slate-900 text-lg mb-1">{item.title}</h4>
                                <p className="text-[#009689] font-black">{item.detail}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border-2 border-slate-100"
                    >
                        <form className="grid sm:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="font-bold text-slate-700 ml-1">Full Name</label>
                                <Input placeholder="John Doe" className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-[#009689]" />
                            </div>
                            <div className="space-y-4">
                                <label className="font-bold text-slate-700 ml-1">Email Address</label>
                                <Input placeholder="john@example.com" className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-[#009689]" />
                            </div>
                            <div className="sm:col-span-2 space-y-4">
                                <label className="font-bold text-slate-700 ml-1">Your Message</label>
                                <Textarea placeholder="How can we help you?" className="min-h-[160px] rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-[#009689] resize-none" />
                            </div>
                            <div className="sm:col-span-2">
                                <Button className="w-full bg-[#009689] hover:bg-[#007a6e] text-white py-8 rounded-2xl font-black text-xl shadow-xl hover:shadow-2xl transition-all group">
                                    Send Message
                                    <Send className="ml-3 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
