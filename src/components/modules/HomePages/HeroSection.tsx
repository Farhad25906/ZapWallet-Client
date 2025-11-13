import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  CreditCardFlipper,
  CreditCardFront,
  CreditCardBack,
  CreditCardLogo,
  CreditCardChip,
  CreditCardServiceProvider,
  CreditCardName,
  CreditCardNumber,
  CreditCardExpiry,
  CreditCardCvv,
  CreditCardMagStripe,
} from "@/components/kibo-ui/credit-card";
import Logo from "@/assets/icons/Logo";



const HeroSection = () => {
  return (
    <section className="py-12 flex items-center ">
      <div className="container mx-auto px-2 md:px-4 lg:px-8 ">
        <div className="grid items-center gap-16 lg:gap-24 lg:grid-cols-2">
          {/* Text Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-8 max-w-2xl mx-auto lg:mx-0">
            <Badge
              variant="outline"
              className="mb-2 bg-[#009689] text-white border-[#009689] px-2 py-1 text-sm font-medium shadow-lg shadow-[#009689]/20 hover:bg-[#007a6e]"
            >
              ⚡ Next-Gen Digital Wallet
              <ArrowUpRight className="ml-2 size-4" />
            </Badge>

            <div className="space-y-4">
              <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-5xl xl:text-5xl">
                <span className=" text-[#009689]">
                  Experience
                </span>
                <span className=" text-[#ffd8af]">
                  ZapWallet
                </span>
              </h1>
            </div>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
              Secure, fast, and seamless digital payments. Manage your finances,
              make instant transfers, and enjoy exclusive rewards with our
              cutting-edge technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
              <Button
                size="lg"
                className="bg-[#009689] hover:bg-[#007a6e] text-white px-4 py-2 text-lg font-bold shadow-xl shadow-[#009689]/30 hover:shadow-2xl hover:shadow-[#009689]/40 transition-all duration-300 hover:scale-105"
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-4 py-2  text-lg font-bold border-2 border-[#009689] text-[#009689] hover:bg-[#009689] hover:text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Learn More
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </div>

            {/* Stats */}
            {/* <div className="grid grid-cols-3 gap-8 pt-12 w-full border-t-2 border-slate-100">
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-black text-[#009689]">10M+</div>
                <div className="text-sm md:text-base text-slate-500 font-medium mt-1">Active Users</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-black text-[#ffd8af]">$50B+</div>
                <div className="text-sm md:text-base text-slate-500 font-medium mt-1">Processed</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-black text-[#009689]">99.9%</div>
                <div className="text-sm md:text-base text-slate-500 font-medium mt-1">Uptime</div>
              </div>
            </div> */}
          </div>

          {/* Credit Card Component */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md lg:max-w-lg transform hover:scale-105 transition-transform duration-300">
              <CreditCard>
                <CreditCardFlipper>
                  <CreditCardFront className="bg-[#009689] shadow-2xl shadow-[#009689]/40">
                    <h1 className="font-bold text-2xl">ZapWallet</h1>
                    <CreditCardLogo>
                      <Logo/>
                    </CreditCardLogo>
                    <CreditCardChip />
                    <CreditCardServiceProvider
                      className="brightness-0 invert"
                      format="logo"
                      type="Visa"
                    />
                    <CreditCardName className="absolute bottom-0 left-0 text-lg font-semibold">
                      John R. Doe
                    </CreditCardName>
                  </CreditCardFront>
                  <CreditCardBack className="bg-[#007a6e] shadow-2xl shadow-[#007a6e]/40">
                    <CreditCardMagStripe className="bg-[#ffd8af]"/>
                    <CreditCardNumber className="absolute bottom-0 left-0 text-base font-medium">
                      0123 4567 8901 2345
                    </CreditCardNumber>
                    <div className="-translate-y-1/2 absolute top-1/2 flex gap-4">
                      <CreditCardExpiry>01/24</CreditCardExpiry>
                      <CreditCardCvv>123</CreditCardCvv>
                    </div>
                  </CreditCardBack>
                </CreditCardFlipper>
              </CreditCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;