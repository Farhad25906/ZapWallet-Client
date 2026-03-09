import AboutSection from "@/components/modules/HomePages/AboutSection";
import ContactSection from "@/components/modules/HomePages/ContactSection";
import FAQSection from "@/components/modules/HomePages/FAQSection";
import FeaturesSection from "@/components/modules/HomePages/FeaturesSection";
import HeroSection from "@/components/modules/HomePages/HeroSection";
import PricingSection from "@/components/modules/HomePages/PricingSection";
import RelatableSection from "@/components/modules/HomePages/RelatableSection";


const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <RelatableSection />
            <AboutSection />
            <FeaturesSection />
            <PricingSection />
            <FAQSection />
            <ContactSection />
        </div>
    );
};

export default HomePage;