import { motion } from "framer-motion";
import { Target, Shield, Zap, TrendingUp, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeader from "@/components/modules/HomePages/SectionHeader";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Sarah Ahmed",
      role: "CEO & Founder",
      image: "https://i.ibb.co.com/0py42zD6/person3.jpg",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://i.ibb.co.com/V0Z5hzbQ/person2.jpg",
    },
    {
      name: "Priya Sharma",
      role: "Head of Operations",
      image: "https://i.ibb.co.com/b5T6fRLG/person4.jpg",
    },
    {
      name: "James Wilson",
      role: "Head of Security",
      image: "https://i.ibb.co.com/fV4PHD74/person1.jpg ",
    },
  ];

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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="pt-32 pb-20 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-6">
          <SectionHeader
            badge="Our Company"
            title="Pioneering the Future of Digital Assets"
            subtitle="ZapWallet is more than just a payment app. We're a growing ecosystem dedicated to financial freedom."
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-black text-[#009689] mb-8">Our Journey</h2>
              <div className="space-y-6 text-xl text-slate-600 leading-relaxed">
                <p>
                  ZapWallet was born from a simple vision: to make digital
                  payments as easy as handing cash to a friend.
                </p>
                <p>
                  Founded in 2020, we recognized that millions of people were
                  underserved by traditional banking. We built a platform that
                  connects users, agents, and businesses in a seamless
                  ecosystem.
                </p>
                <p>
                  Today, we serve over 10 million users, processing billions in
                  transactions while maintaining the personal touch that makes
                  financial services truly accessible.
                </p>
              </div>
            </motion.div>
            <div className="relative">
              <div className="absolute -inset-4 bg-[#ffd8af]/10 rounded-[3rem] rotate-3"></div>
              <div className="relative bg-[#009689] rounded-[3rem] p-12 text-white shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
                <div className="space-y-10 relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center font-black text-3xl">
                      10M+
                    </div>
                    <div>
                      <div className="text-2xl font-bold">Active Users</div>
                      <div className="text-white/70">Growing community</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-[#ffd8af] rounded-2xl flex items-center justify-center text-[#009689] font-black text-3xl">
                      50K+
                    </div>
                    <div>
                      <div className="text-2xl font-bold">Agent Network</div>
                      <div className="text-white/70">Nationwide presence</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center font-black text-3xl">
                      99%
                    </div>
                    <div>
                      <div className="text-2xl font-bold">Uptime</div>
                      <div className="text-white/70">Reliable infrastructure</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <div className="w-20 h-20 bg-[#009689] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#009689]/20">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-6">
              Our Core Mission
            </h2>
            <p className="text-2xl text-slate-600 leading-relaxed font-medium">
              "To democratize financial services by providing secure, instant,
              and affordable digital payment solutions that empower individuals
              and communities to thrive."
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-none shadow-xl hover:shadow-2xl transition-all duration-300 group rounded-[2rem] overflow-hidden">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-[#009689]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="w-8 h-8 text-[#009689]" />
                    </div>
                    <h3 className="font-black text-xl mb-3 text-slate-900">{value.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <SectionHeader
            badge="Our People"
            title="The Visionaries Behind ZapWallet"
            subtitle="Meet the talented team working hard to build a more inclusive financial future."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="group relative text-center">
                  <div className="absolute -inset-2 bg-gradient-to-br from-[#009689] to-[#ffd8af] rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-lg transition duration-500"></div>
                  <div className="relative bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#ffd8af]">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="font-black text-2xl text-slate-900 mb-1">{member.name}</h3>
                    <p className="text-[#009689] font-bold uppercase tracking-wider text-sm">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
