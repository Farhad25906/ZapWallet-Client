import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, HelpCircle, MessageCircle, Plus, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/modules/HomePages/SectionHeader";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQCategory = {
  category: string;
  color: string;
  questions: FAQItem[];
};

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItem, setActiveItem] = useState<string | null>("0-0");

  const faqCategories: FAQCategory[] = [
    {
      category: "Getting Started",
      color: "bg-[#009689]",
      questions: [
        {
          question: "How do I create a ZapWallet account?",
          answer: "Creating a ZapWallet account is simple! Download our mobile app or visit our website, click on 'Register', enter your phone number and basic details, verify your phone via OTP, and set up a secure PIN. Your account will be ready in under 2 minutes."
        },
        {
          question: "What documents do I need to register?",
          answer: "For basic accounts, you only need a valid phone number. For higher transaction limits, you'll need to verify your identity with a National ID card or passport, and a recent photograph."
        }
      ]
    },
    {
      category: "Transactions & Fees",
      color: "bg-[#ffd8af]",
      questions: [
        {
          question: "How much does it cost to send money?",
          answer: "Sending money to another ZapWallet user costs only ৳5 per transaction, regardless of the amount. This flat fee makes it affordable for everyone."
        },
        {
          question: "What are the Cash Out fees?",
          answer: "Cash Out fees are competitive at 1.5% of the withdrawal amount. For example, withdrawing ৳1,000 would cost only ৳15."
        }
      ]
    },
    {
      category: "Security & Safety",
      color: "bg-[#009689]",
      questions: [
        {
          question: "How secure is my money with ZapWallet?",
          answer: "Your money is protected by bank-level 256-bit encryption, secure PIN authentication, and biometric login options. We follow strict financial regulations to keep your funds safe."
        },
        {
          question: "What if I forget my PIN?",
          answer: "You can reset your PIN easily through the app via OTP verification or by contacting our 24/7 support center."
        }
      ]
    },
  ];

  const filteredCategories = faqCategories.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="pt-32 pb-20 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-6">
          <SectionHeader
            badge="Help Center"
            title="Have Some Questions?"
            subtitle="Find quick answers to common queries about our platform, security, and services."
          />

          <div className="max-w-2xl mx-auto relative group mt-8">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#009689] transition-colors" />
            <Input
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 h-16 rounded-2xl border-none bg-white shadow-xl focus-visible:ring-2 focus-visible:ring-[#009689] text-lg"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-4">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Quick Categories</h3>
                {faqCategories.map((cat, idx) => (
                  <button
                    key={idx}
                    className="flex items-center gap-3 w-full p-4 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-600 hover:text-[#009689]"
                  >
                    <div className={`w-3 h-3 rounded-full ${cat.color}`}></div>
                    {cat.category}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 space-y-16">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat, catIdx) => (
                  <div key={catIdx}>
                    <h2 className="text-3xl font-black text-[#009689] mb-8 flex items-center gap-4">
                      <HelpCircle className="w-8 h-8" />
                      {cat.category}
                    </h2>
                    <div className="space-y-4">
                      {cat.questions.map((q, qIdx) => {
                        const identifier = `${catIdx}-${qIdx}`;
                        const isOpen = activeItem === identifier;
                        return (
                          <div
                            key={qIdx}
                            className={`border-2 rounded-[2rem] overflow-hidden transition-all duration-300 ${isOpen ? "border-[#009689] shadow-xl" : "border-slate-100"
                              }`}
                          >
                            <button
                              onClick={() => setActiveItem(isOpen ? null : identifier)}
                              className="w-full px-8 py-6 flex items-center justify-between text-left group"
                            >
                              <span className={`text-xl font-bold transition-colors ${isOpen ? "text-[#009689]" : "text-slate-800"}`}>
                                {q.question}
                              </span>
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? "bg-[#009689] text-white" : "bg-slate-50 text-slate-400 group-hover:bg-[#ffd8af] group-hover:text-[#009689]"
                                }`}>
                                {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                              </div>
                            </button>
                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                >
                                  <div className="px-8 pb-8 pt-2 text-slate-600 text-lg leading-relaxed border-t border-slate-50 mt-2 mx-2">
                                    {q.answer}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                  <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-800">No results found</h3>
                  <p className="text-slate-500">Try adjusting your search terms.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Support */}
      <section className="py-24 bg-[#ffd8af] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <MessageCircle className="w-20 h-20 text-[#009689] mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-black text-[#009689] mb-6">Still Have Questions?</h2>
          <p className="text-2xl text-slate-700 max-w-2xl mx-auto mb-10 font-medium">
            Our dedicated support team is available 24/7 to help you with any issues or queries.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button className="bg-[#009689] hover:bg-[#007a6e] text-white px-10 py-8 text-xl font-bold rounded-[2rem] shadow-2xl transition-transform hover:scale-105">
              Start Live Chat
            </Button>
            <Button variant="outline" className="border-4 border-[#009689] text-[#009689] hover:bg-[#009689] hover:text-white px-10 py-8 text-xl font-bold rounded-[2rem] transition-transform hover:scale-105">
              Email Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;