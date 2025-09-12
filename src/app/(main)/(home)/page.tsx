import CallToActionSection from "@/components/main/home/CallToActionSection";
import CategorySection from "@/components/main/home/CategorySection";
import ClientsSection from "@/components/main/home/ClientsSection";
import CtaSection from "@/components/main/home/CtaSection";
import FaqSection from "@/components/main/home/FaqSection";
import HeroSection from "@/components/main/home/HeroSection";
import ServicesSection from "@/components/main/home/ServicesSection";
import TestimonialSection from "@/components/main/home/TestimonialSection";


export default function Home() {

  return (
    <div className="">
      <HeroSection />
      <CategorySection />
      <ServicesSection />
      <CallToActionSection />
      <TestimonialSection />
      <ClientsSection />
      <CtaSection />
      <FaqSection />
    </div>
  );
}
