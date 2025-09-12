import Link from "next/link";
import { AiOutlineArrowDown } from "react-icons/ai";
import "rc-slider/assets/index.css";
import Image from "next/image";
import HeroPropertyFiltering from "./HeroPropertyFiltering";



export default function HeroSection() {


    return (
        <section className="relative bg-bg-1 border-t lg:border-t-0">
            <Image src="/main/home/primary-hero-img-2.jpg" className="absolute hidden lg:block w-[25%] left-0 bottom-0 z-[2]" width={508} height={642} alt="صورة" />
            <Image src="/main/home/primary-hero-img-1.jpg" className="absolute hidden xl:block w-[25%] top-0 right-0" width={508} height={642} alt="صورة" />
            <div className="pt-[70px] sm:pt-[100px] md:pt-[150px] xl:pt-[180px] pb-16 h-full px-3">
                <div className="container mx-auto">
                    <div className="text-center relative z-[2]">
                        <h1 className="text-[40px] lg:text-[56px] leading-[68px] text-neutral-700 font-semibold">
                            طريقة سهلة للعثور على <br /> العقار المثالي
                        </h1>
                        <p className="text-xl mx-auto max-w-[600px] text-gray-500 mt-4 md:mt-9">
                            استكشف قوائم العقارات الواسعة مصنفة حسب الفئات عبر واجهتنا سهلة الاستخدام
                        </p>

                        <HeroPropertyFiltering />

                        {/* More Details */}
                        <div className="mx-auto mt-16">
                            <button className="bg-primary text-white rounded-full p-4 mb-2">
                                <Link href="#more-details">
                                    <AiOutlineArrowDown className="w-5 h-5" />
                                </Link>
                            </button>
                            <br />
                            <span className="text-center block">عرض المزيد</span>
                        </div>
                    </div>
                </div>
            </div >
        </section>
    );
}
