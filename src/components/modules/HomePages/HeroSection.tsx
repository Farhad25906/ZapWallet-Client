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
    <section className="py-8 md:py-12 lg:py-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 md:px-4 lg:px-8">
        <div className="grid items-center gap-12 md:gap-16 lg:gap-24 lg:grid-cols-2">
          {/* Text Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 md:space-y-8 max-w-2xl mx-auto lg:mx-0">
            <Badge
              variant="outline"
              className="mb-2 bg-[#009689] text-white border-[#009689] px-3 py-1.5 md:px-2 md:py-1 text-xs md:text-sm font-medium shadow-lg shadow-[#009689]/20 hover:bg-[#007a6e]"
            >
              ⚡ Next-Gen Digital Wallet
              <ArrowUpRight className="ml-1 md:ml-2 size-3 md:size-4" />
            </Badge>

            <div className="space-y-3 md:space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-black tracking-tight">
                <span className="text-[#009689] block">
                  Experience
                </span>
                <span className="text-[#ffd8af] block mt-1 md:mt-2">
                  ZapWallet
                </span>
              </h1>
            </div>

            <p className="text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl px-4 sm:px-0">
              Secure, fast, and seamless digital payments. Manage your finances,
              make instant transfers, and enjoy exclusive rewards with our
              cutting-edge technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto pt-2 md:pt-4 px-4 sm:px-0">
              <Button
                size="lg"
                className="bg-[#009689] hover:bg-[#007a6e] text-white px-6 py-3 md:px-4 md:py-2 text-base md:text-lg font-bold shadow-xl shadow-[#009689]/30 hover:shadow-2xl hover:shadow-[#009689]/40 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-6 py-3 md:px-4 md:py-2 text-base md:text-lg font-bold border-2 border-[#009689] text-[#009689] hover:bg-[#009689] hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
              >
                Learn More
                <ArrowRight className="ml-2 size-4 md:size-5" />
              </Button>
            </div>

          </div>

          {/* Credit Card Component */}
          <div className="flex justify-center lg:justify-end order-first lg:order-last">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg transform hover:scale-105 transition-transform duration-300 scale-90 sm:scale-95 md:scale-100">
              <CreditCard>
                <CreditCardFlipper>
                  <CreditCardFront className="bg-[#009689] shadow-2xl shadow-[#009689]/40">
                    <h1 className="font-bold text-lg sm:text-xl md:text-2xl">ZapWallet</h1>
                    <CreditCardLogo>
                      <Logo />
                    </CreditCardLogo>
                    <CreditCardChip />
                    <CreditCardServiceProvider
                      className="brightness-0 invert"
                      format="logo"
                      type="Visa"
                    />
                    <CreditCardName className="absolute bottom-0 left-0 text-sm sm:text-base md:text-lg font-semibold">
                      John R. Doe
                    </CreditCardName>
                  </CreditCardFront>
                  <CreditCardBack className="bg-[#007a6e] shadow-2xl shadow-[#007a6e]/40">
                    <CreditCardMagStripe className="bg-[#ffd8af]"/>
                    <CreditCardNumber className="absolute bottom-0 left-0 text-xs sm:text-sm md:text-base font-medium">
                      0123 4567 8901 2345
                    </CreditCardNumber>
                    <div className="-translate-y-1/2 absolute top-1/2 flex gap-3 sm:gap-4">
                      <CreditCardExpiry className="text-xs sm:text-sm">01/24</CreditCardExpiry>
                      <CreditCardCvv className="text-xs sm:text-sm">123</CreditCardCvv>
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