import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+880 1234-567890",
      subtext: "Mon-Fri 9AM-6PM",
      color: "bg-[#009689]",
    },
    {
      icon: Mail,
      title: "Email",
      details: "support@zapwallet.com",
      subtext: "We reply within 24 hours",
      color: "bg-[#ffd8af]",
    },
    {
      icon: MapPin,
      title: "Office",
      details: "Dhaka, Bangladesh",
      subtext: "Visit us by appointment",
      color: "bg-[#009689]",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: "Mon - Fri: 9AM - 6PM",
      subtext: "Saturday: 10AM - 4PM",
      color: "bg-[#ffd8af]",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }, 3000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-[#009689] text-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-white text-[#009689] hover:bg-white px-4 py-2">
              Contact Us
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Have questions? We're here to help. Reach out and we'll respond as
              soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Support Cards Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Quick Support */}
            <Card className="border-2 border-[#ffd8af] bg-[#ffd8af]/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-black text-[#009689] mb-4">
                  Need Immediate Help?
                </h3>
                <p className="text-slate-700 mb-6">
                  For urgent matters, you can reach our support team directly
                  through these channels:
                </p>
                <div className="space-y-4">
                  <Button
                    className="w-full justify-start bg-[#009689] hover:bg-[#007a6e] text-white"
                    size="lg"
                  >
                    <Phone className="mr-3 w-5 h-5" />
                    Call Support: +880 1234-567890
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-2 border-[#009689] text-[#009689] hover:bg-[#009689] hover:text-white"
                    size="lg"
                  >
                    <Mail className="mr-3 w-5 h-5" />
                    Email: support@zapwallet.com
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Link */}
            <Card className="border-2 border-[#009689] hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-black text-[#009689] mb-4">
                  Frequently Asked Questions
                </h3>
                <p className="text-slate-700 mb-6">
                  Looking for quick answers? Check out our FAQ section for
                  common questions about ZapWallet services.
                </p>
                <Button
                  className="w-full bg-white border-2 border-[#009689] text-[#009689] hover:bg-[#009689] hover:text-white font-bold"
                  size="lg"
                >
                  Visit FAQ Page
                </Button>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="border-2 hover:border-[#ffd8af] transition-all duration-300">
              <CardContent className="p-8">
                <Clock className="w-12 h-12 text-[#009689] mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Business Hours
                </h3>
                <div className="space-y-2 text-slate-700">
                  <div className="flex justify-between">
                    <span className="font-semibold">Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Sunday</span>
                    <span className="text-red-600">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="border-2 hover:border-[#009689] transition-all duration-300 hover:shadow-xl"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`${info.color} w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <info.icon
                      className={`w-7 h-7 ${
                        info.color === "bg-[#009689]"
                          ? "text-white"
                          : "text-[#009689]"
                      }`}
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                  <p className="text-[#009689] font-semibold mb-1">
                    {info.details}
                  </p>
                  <p className="text-slate-600 text-sm">{info.subtext}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-4xl font-black text-[#009689] mb-4">
                Send us a Message
              </h2>
              <p className="text-slate-600 text-lg mb-8">
                Fill out the form and our team will get back to you within 24
                hours.
              </p>

              {submitted ? (
                <div className="bg-[#009689]/10 border-2 border-[#009689] rounded-2xl p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-[#009689] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#009689] mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-slate-600">
                    Thank you for contacting us. We'll respond shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-slate-700 font-semibold"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="border-2 focus:border-[#009689]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-slate-700 font-semibold"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="border-2 focus:border-[#009689]"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-slate-700 font-semibold"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+880 1234-567890"
                        className="border-2 focus:border-[#009689]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="subject"
                        className="text-slate-700 font-semibold"
                      >
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        className="border-2 focus:border-[#009689]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-slate-700 font-semibold"
                    >
                      Your Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      className="border-2 focus:border-[#009689] resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#009689] hover:bg-[#007a6e] text-white py-6 text-lg font-bold shadow-xl hover:shadow-2xl transition-all"
                  >
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;