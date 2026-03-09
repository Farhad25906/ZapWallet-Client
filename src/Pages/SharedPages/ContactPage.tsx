import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/modules/HomePages/SectionHeader";
import { useState } from "react";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    { icon: Phone, title: "Phone", details: "+880 1234-567890", subtext: "Mon-Fri 9AM-6PM", color: "bg-[#009689]" },
    { icon: Mail, title: "Email", details: "support@zapwallet.com", subtext: "Replied within 24h", color: "bg-[#ffd8af]" },
    { icon: MapPin, title: "Main Office", details: "Dhaka, Bangladesh", subtext: "Visit us anytime", color: "bg-[#009689]" },
    { icon: Clock, title: "Working Hours", details: "9AM - 6PM", subtext: "Everyday Support", color: "bg-[#ffd8af]" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="pt-32 pb-20 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-6">
          <SectionHeader
            badge="Get In Touch"
            title="We'd Love To Hear From You"
            subtitle="Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions." center={true}
          />
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-none shadow-xl hover:shadow-2xl transition-all duration-300 rounded-[2.5rem] overflow-hidden group">
                  <CardContent className="p-8 text-center">
                    <div className={`${info.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:rotate-12`}>
                      <info.icon className={`w-8 h-8 ${info.color === 'bg-[#009689]' ? 'text-white' : 'text-[#009689]'}`} />
                    </div>
                    <h3 className="font-black text-xl text-slate-900 mb-2">{info.title}</h3>
                    <p className="text-[#009689] font-black text-lg mb-1">{info.details}</p>
                    <p className="text-slate-500 font-medium">{info.subtext}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">
                Send Us A Message & <br />
                <span className="text-[#009689]">Let's Build Together</span>
              </h2>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
                Our team will get back to you within 24 hours to discuss your requirements or any issues you might be facing.
              </p>
              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-3xl flex items-center gap-6">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#009689] shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-bold text-slate-700">Immediate Response Guaranteed</span>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl flex items-center gap-6">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#009689] shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-bold text-slate-700">Technical Expert Consultation</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border-2 border-slate-100"
            >
              {!submitted ? (
                <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="font-black text-slate-700 ml-2">Your Name</label>
                      <Input placeholder="Farhad Hossen" className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-[#009689]" />
                    </div>
                    <div className="space-y-3">
                      <label className="font-black text-slate-700 ml-2">Email Address</label>
                      <Input placeholder="farhad@example.com" className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-[#009689]" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="font-black text-slate-700 ml-2">Subject</label>
                    <Input placeholder="How can we help?" className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-[#009689]" />
                  </div>
                  <div className="space-y-3">
                    <label className="font-black text-slate-700 ml-2">Message</label>
                    <Textarea placeholder="Write your message here..." className="min-h-[160px] rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-[#009689] resize-none" />
                  </div>
                  <Button className="w-full bg-[#009689] hover:bg-[#007a6e] text-white py-8 rounded-[2rem] font-black text-xl shadow-xl hover:shadow-2xl transition-all group">
                    Send Your Message
                    <Send className="ml-3 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </form>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-24 h-24 bg-[#ffd8af] rounded-full flex items-center justify-center text-[#009689] mb-8 animate-bounce">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 mb-4">Message Sent!</h2>
                  <p className="text-xl text-slate-600">Thank you for reaching out. We'll be in touch very soon.</p>
                  <Button variant="ghost" onClick={() => setSubmitted(false)} className="mt-8 font-bold text-[#009689]">
                    Send another message
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;