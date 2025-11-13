import React, { useState } from "react";
import { ChevronDown, Search, HelpCircle, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState([]);

  const faqCategories = [
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
          answer: "For basic accounts, you only need a valid phone number. For higher transaction limits, you'll need to verify your identity with a National ID card or passport, and a recent photograph. The verification process is quick and secure."
        },
        {
          question: "Is ZapWallet free to use?",
          answer: "Yes! Creating and maintaining a ZapWallet account is completely free. We only charge small fees for certain transactions: ৳5 per Send Money transaction and 1.5% for Cash Out. Cash In is always free."
        }
      ]
    },
    {
      category: "Transactions & Fees",
      color: "bg-[#ffd8af]",
      questions: [
        {
          question: "How much does it cost to send money?",
          answer: "Sending money to another ZapWallet user costs only ৳5 per transaction, regardless of the amount. This flat fee makes it affordable whether you're sending ৳100 or ৳10,000."
        },
        {
          question: "What are the Cash Out fees?",
          answer: "Cash Out fees are 1.5% of the withdrawal amount. For example, withdrawing ৳10,000 would cost ৳150. There's no fixed fee, so smaller withdrawals have proportionally smaller fees."
        },
        {
          question: "Are there any limits on transactions?",
          answer: "Personal accounts have daily limits of ৳50,000 and monthly limits of ৳1,000,000. Business accounts have higher limits (৳500,000/day) and unlimited monthly transactions. Limits can be increased with identity verification."
        },
        {
          question: "How long do transfers take?",
          answer: "All ZapWallet transfers are instant! Whether you're sending money to a friend or cashing in at an agent, transactions complete in real-time. You'll receive immediate confirmation on your phone."
        }
      ]
    },
    {
      category: "Security & Safety",
      color: "bg-[#009689]",
      questions: [
        {
          question: "How secure is my money with ZapWallet?",
          answer: "Your money is protected by bank-level 256-bit encryption, secure PIN authentication, and biometric login options. We're licensed by Bangladesh Bank and follow strict financial regulations to keep your funds safe."
        },
        {
          question: "What if I forget my PIN?",
          answer: "You can reset your PIN easily through the app. Go to Settings > Security > Reset PIN. You'll need to verify your identity via OTP sent to your registered phone number. For additional security, you can also contact our support team."
        },
        {
          question: "Can someone access my account if I lose my phone?",
          answer: "No. Your account is protected by your PIN and optional biometric authentication. If you lose your phone, immediately contact our support team to temporarily freeze your account. You can then access your account from a new device after verification."
        },
        {
          question: "How do I report suspicious activity?",
          answer: "If you notice any unauthorized transactions, immediately contact our 24/7 support at +880 1234-567890 or email security@zapwallet.com. We'll investigate and freeze suspicious activity within minutes to protect your account."
        }
      ]
    },
    {
      category: "Agent Services",
      color: "bg-[#ffd8af]",
      questions: [
        {
          question: "How do I find a nearby agent?",
          answer: "Use the 'Find Agent' feature in the app to see all nearby agent locations on a map. You can also filter by services offered (Cash In/Cash Out) and see their working hours. We have over 50,000 agents nationwide."
        },
        {
          question: "What do I need to cash in at an agent?",
          answer: "To cash in, visit any ZapWallet agent with your cash and phone. The agent will request your phone number, you'll enter your PIN to confirm, and the money is instantly added to your digital balance. It's that simple!"
        },
        {
          question: "How do I become a ZapWallet agent?",
          answer: "To become an agent, you need a business location, initial capital (minimum ৳50,000), and valid business registration. Apply through our website or call +880 1234-567890. Our team will guide you through the process and provide training."
        }
      ]
    },
    {
      category: "Technical Support",
      color: "bg-[#009689]",
      questions: [
        {
          question: "The app isn't working properly. What should I do?",
          answer: "First, try closing and reopening the app. If that doesn't work, check if you have the latest version in your app store. Clear the app cache in your phone settings, or uninstall and reinstall the app. If issues persist, contact our support team."
        },
        {
          question: "Can I use ZapWallet on multiple devices?",
          answer: "Yes! You can log into your ZapWallet account on multiple devices. However, for security reasons, you'll need to verify each new device with an OTP. You can see all active sessions in Settings > Security > Active Devices."
        },
        {
          question: "What happens if a transaction fails?",
          answer: "If a transaction fails, the money is automatically returned to your account within minutes. You'll receive a notification explaining why it failed. If the money doesn't return within 24 hours, contact support with your transaction ID for immediate assistance."
        }
      ]
    }
  ];

  const toggleItem = (categoryIndex, questionIndex) => {
    const itemKey = `${categoryIndex}-${questionIndex}`;
    setOpenItems(prev => 
      prev.includes(itemKey) 
        ? prev.filter(key => key !== itemKey)
        : [...prev, itemKey]
    );
  };

  const isOpen = (categoryIndex, questionIndex) => {
    return openItems.includes(`${categoryIndex}-${questionIndex}`);
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      searchQuery === "" || 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-[#009689] text-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-white text-[#009689] hover:bg-white px-4 py-2">
              Help Center
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Find answers to common questions about ZapWallet
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg border-2 border-white/20 bg-white/10 text-white placeholder:text-white/60 focus:border-white focus:bg-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-20">
              <HelpCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-700 mb-2">No results found</h3>
              <p className="text-slate-600">Try a different search term or browse all categories</p>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map((category, catIndex) => (
                <div key={catIndex}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                      <HelpCircle className={`w-6 h-6 ${category.color === 'bg-[#009689]' ? 'text-white' : 'text-[#009689]'}`} />
                    </div>
                    <h2 className="text-3xl font-black text-[#009689]">{category.category}</h2>
                  </div>

                  <div className="space-y-4">
                    {category.questions.map((item, qIndex) => (
                      <Card 
                        key={qIndex}
                        className="border-2 hover:border-[#009689] transition-all duration-300"
                      >
                        <CardContent className="p-0">
                          <button
                            onClick={() => toggleItem(catIndex, qIndex)}
                            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                          >
                            <span className="font-bold text-lg text-slate-900 pr-4">
                              {item.question}
                            </span>
                            <ChevronDown 
                              className={`w-6 h-6 text-[#009689] flex-shrink-0 transition-transform duration-300 ${
                                isOpen(catIndex, qIndex) ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          
                          <div 
                            className={`overflow-hidden transition-all duration-300 ${
                              isOpen(catIndex, qIndex) ? 'max-h-96' : 'max-h-0'
                            }`}
                          >
                            <div className="px-6 pb-5 pt-2 text-slate-700 leading-relaxed border-t">
                              {item.answer}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-[#009689]">
              <CardContent className="p-12 text-center">
                <MessageCircle className="w-16 h-16 text-[#009689] mx-auto mb-6" />
                <h2 className="text-4xl font-black text-[#009689] mb-4">
                  Still Need Help?
                </h2>
                <p className="text-xl text-slate-600 mb-8">
                  Can't find the answer you're looking for? Our support team is ready to assist you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="bg-[#009689] hover:bg-[#007a6e] text-white px-8 py-6 text-lg font-bold shadow-xl"
                  >
                    Contact Support
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-2 border-[#009689] text-[#009689] hover:bg-[#009689] hover:text-white px-8 py-6 text-lg font-bold"
                  >
                    Live Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 bg-[#009689] text-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-5xl font-black mb-2">24/7</div>
              <div className="text-white/80 text-lg">Support Available</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">&lt;5min</div>
              <div className="text-white/80 text-lg">Average Response Time</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">98%</div>
              <div className="text-white/80 text-lg">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;