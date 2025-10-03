'use client';

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "@/components/shared/SectionTitle";
import SwiperPrevButton from "@/components/shared/SwiperPrevButton";
import SwiperNextButton from "@/components/shared/SwiperNextButton";

const clientLogos = [
    "/main/home/clients/client-1.webp",
    "/main/home/clients/client-2.webp",
    "/main/home/clients/client-3.webp",
    "/main/home/clients/client-4.webp",
    "/main/home/clients/client-5.webp",
    "/main/home/clients/client-6.webp",
    "/main/home/clients/client-7.webp",
];

export default function ClientsSection() {
    return (
        <section className="py-[60px] lg:py-[120px] relative px-3  bg-[url('/pattern-01.png')] bg-contain bg-center ">
            {/* Background layers */}
            <div className="absolute inset-0 bg-white/80 z-[1]" />

            {/* Content wrapper */}
            <div className="relative z-[2]">
                {/* Decorative Images */}

                <Image
                    alt="decoration"
                    width={208}
                    height={182}
                    className="hidden lg:block absolute top-10 left-10 -scale-[1] rotate-90"
                    src="/main/home/side-2.png"
                />
                <Image
                    alt="decoration"
                    width={99}
                    height={86}
                    className="hidden lg:block absolute right-10 top-[60%]"
                    src="/main/home/testimonial-el-3.webp"
                />

                <div className="container">
                    <SectionTitle
                        title="عملاؤنا"
                        bgColor="var(--primary-light)"
                        arrowTitle="شراكات"
                        description="نفخر بثقة عملائنا الذين يمثلون نخبة من الشركات والمؤسسات الرائدة في مجال العقارات."
                    />

                    <div className="relative mt-10">
                        {/* Navigation Buttons */}
                        <SwiperPrevButton className="clients-prev absolute top-[40%] left-2 lg:left-10" />
                        <SwiperNextButton className="clients-next absolute top-[40%] right-2 lg:right-10" />

                        {/* Swiper Carousel */}
                        <Swiper
                            modules={[Navigation]}
                            navigation={{
                                nextEl: ".clients-next",
                                prevEl: ".clients-prev",
                            }}
                            spaceBetween={24}
                            loop={true}
                            breakpoints={{
                                320: { slidesPerView: 2 },
                                640: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                                1280: { slidesPerView: 5 },
                                1536: { slidesPerView: 6 },
                            }}
                            className="swiper max-w-[856px] bg-[#EBEBFD] rounded-xl px-3 lg:px-5 xl:px-10 !py-12 text-center mx-auto"
                        >
                            {clientLogos.map((logo, index) => (
                                <SwiperSlide key={index} className="flex items-center justify-center py-4">
                                    <Image
                                        alt={`Client ${index + 1}`}
                                        width={160} // was 120
                                        height={80} // was 60
                                        className="object-contain max-h-[80px]" // was 60px
                                        src={logo}
                                    />

                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}
