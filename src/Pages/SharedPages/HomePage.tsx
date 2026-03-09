import HeroSection from "@/components/modules/HomePages/HeroSection";
import PricingSection from "@/components/modules/HomePages/PricingSection";
import RelatableSection from "@/components/modules/HomePages/RelatableSection";


const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <RelatableSection />
            <PricingSection />
        </div>
    );
};

export default HomePage;