import Link from "next/link";
import { AiOutlineArrowDown } from "react-icons/ai";
import "rc-slider/assets/index.css";
import Image from "next/image";
import HeroPropertyFiltering from "./HeroPropertyFiltering";

export default function HeroSection() {
  return (
    <section className="relative bg-bg-1 border-t lg:border-t-0 overflow-hidden bg-[url('/pattern-01.png')] bg-contain bg-center ">
      {/* Background layers */}
      <div className="absolute inset-0 bg-white/80" />

      {/* Decorative photos */}
      <Image
        src="/main/home/primary-hero-img-2.jpg"
        className="absolute hidden lg:block w-[25%] left-0 bottom-0 z-[2] rounded-tr-3xl shadow-xl"
        width={508} height={642} alt="صورة"
        priority
      />
      <Image
        src="/main/home/primary-hero-img-1.jpg"
        className="absolute hidden xl:block w-[25%] top-0 right-0 rounded-bl-3xl shadow-xl"
        width={508} height={642} alt="صورة"
        priority
      />

      <div className="pt-[90px] sm:pt-[120px] md:pt-[160px] xl:pt-[200px] pb-16 h-full px-3 relative z-[3]">
        <div className="container mx-auto">
          <div className="text-center">
            <h1 className="text-[40px] lg:text-[56px] leading-[1.15] text-neutral-800 font-extrabold tracking-tight">
              طريقة أسرع وأذكى للعثور على <br className="hidden md:block" /> عقارك المثالي
            </h1>
            <p className="text-lg lg:text-xl mx-auto max-w-[680px] text-neutral-600 mt-4 md:mt-6">
              تصفّح آلاف القوائم المصنّفة بدقة، وفِلتر النتائج حسب المدينة، النوع والميزانية.
            </p>

            <HeroPropertyFiltering />

            {/* More Details */}
            <div className="mx-auto mt-12">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-full bg-primary text-white p-4 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition"
                aria-label="عرض المزيد"
              >
                <AiOutlineArrowDown className="w-5 h-5" />
              </Link>
              <span className="text-center block mt-2 text-neutral-600">عرض المزيد</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
