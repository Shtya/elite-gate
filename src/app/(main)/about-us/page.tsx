import AboutSection from "@/components/main/aboutUs/AboutSection";
import ExplorePropertiesSection from "@/components/main/aboutUs/ExplorePropertiesSection";
import StatsSection from "@/components/main/aboutUs/StatsSection";
import WhyChooseSection from "@/components/main/aboutUs/WhyChooseSection";
import WorkProcessSection from "@/components/main/aboutUs/WorkProcessSection";


export default async function AboutUsPage() {

    return (
        <>
            <AboutSection />
            <WorkProcessSection />
            <WhyChooseSection />
            <ExplorePropertiesSection />
            <StatsSection />
        </>
    )
}