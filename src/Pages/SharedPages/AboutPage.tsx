import { Target, Users, Shield, Zap, TrendingUp, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      {/* Hero Section */}
      <section className="py-20 bg-[#009689] text-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-white text-[#009689] hover:bg-white px-4 py-2">
              About ZapWallet
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              Revolutionizing Digital Payments
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Making financial services accessible, secure, and instant for
              everyone
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-[#009689] mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-slate-700">
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
            </div>
            <div className="bg-[#ffd8af]/20 rounded-3xl p-12 border-4 border-[#ffd8af]">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#009689] rounded-full flex items-center justify-center text-white font-black text-2xl">
                    10M+
                  </div>
                  <div>
                    <div className="font-bold text-xl">Active Users</div>
                    <div className="text-slate-600">Growing daily</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#ffd8af] rounded-full flex items-center justify-center text-[#009689] font-black text-2xl">
                    50K+
                  </div>
                  <div>
                    <div className="font-bold text-xl">Agent Network</div>
                    <div className="text-slate-600">Nationwide coverage</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#009689] rounded-full flex items-center justify-center text-white font-black text-2xl">
                    99%
                  </div>
                  <div>
                    <div className="font-bold text-xl">Uptime</div>
                    <div className="text-slate-600">Always available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Target className="w-16 h-16 mx-auto mb-6 text-[#009689]" />
            <h2 className="text-4xl font-black text-[#009689] mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-slate-700 leading-relaxed">
              To democratize financial services by providing secure, instant,
              and affordable digital payment solutions that empower individuals
              and communities to thrive in the digital economy.
            </p>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-2 hover:border-[#009689] transition-all duration-300 hover:shadow-xl"
              >
                <CardContent className="p-6 text-center">
                  <value.icon className="w-12 h-12 mx-auto mb-4 text-[#009689]" />
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-slate-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-16">
            <Users className="w-16 h-16 mx-auto mb-6 text-[#009689]" />
            <h2 className="text-4xl font-black text-[#009689] mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-slate-600">
              Passionate experts dedicated to your financial success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="border-2 hover:border-[#ffd8af] transition-all duration-300 hover:shadow-xl"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name || "Member"}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-[#009689] font-medium">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default AboutPage;
