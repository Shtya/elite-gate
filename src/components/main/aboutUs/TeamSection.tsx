'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperNextButton from '@/components/shared/SwiperNextButton';
import SwiperPrevButton from '@/components/shared/SwiperPrevButton';

import SectionTitle from '@/components/shared/SectionTitle';

interface TeamMember {
    name: string;
    role: string;
    image: string;
    socials?: {
        facebook?: string;
        twitter?: string;
        linkedin?: string;
    };
}
const members: TeamMember[] = [
    {
        name: 'خالد العتيبي',
        role: 'خبير تسويق رقاري',
        image: '/main/about/team/member-1.webp',
    },
    {
        name: 'عبدالله الشهري',
        role: 'مستشار عقاري أول',
        image: '/main/about/team/member-1.webp',
    },
    {
        name: 'فهد السبيعي',
        role: 'مدير علاقات العملاء',
        image: '/main/about/team/member-1.webp',
    },
    {
        name: 'ماجد البلوشي',
        role: 'محلل بيانات عقارية',
        image: '/main/about/team/member-1.webp',
    },
    {
        name: 'سامي القحطاني',
        role: 'مصمم محتوى بصري',
        image: '/main/about/team/member-1.webp',
    },
    {
        name: 'تركي المطيري',
        role: 'مدير العمليات',
        image: '/main/about/team/member-1.webp',
    },
    {
        name: 'علي البركاتي',
        role: 'خبير تمويل عقاري',
        image: '/main/about/team/member-1.webp',
    },
    {
        name: 'راكان الزهراني',
        role: 'منسق الحملات الإعلانية',
        image: '/main/about/team/member-1.webp',
    },
];


export default function TeamSection() {
    if (!members || members.length === 0) return null;

    return (
        <section className="relative mt-12 max-w-7xl mx-auto px-4">
            <SectionTitle
                arrowTitle="الفريق"
                title="فريقنا المميز"
                description="تعرف على أعضاء فريقنا الذين يقفون خلف نجاحنا، حيث يجمعون بين الخبرة، الشغف، والاحترافية لتقديم أفضل الخدمات العقارية وتحقيق تطلعات عملائنا."
                bgColor="var(--primary-light)"
                className="items-center text-center "
            />

            <div className='relative'>


                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    navigation={{
                        nextEl: '.team-next',
                        prevEl: '.team-prev',
                    }}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1020: { slidesPerView: 3 },
                        1200: { slidesPerView: 4 },
                    }}
                    loop={true}
                    className="swiper "
                >
                    {members.map((member, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="group text-center">
                                <div className="relative flex justify-center">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="rounded-full w-[250px] h-[250px] object-cover group-hover:grayscale duration-300"
                                    />

                                </div>
                                <div className="mt-6">
                                    <h4 className="text-[24px] font-semibold">{member.name}</h4>
                                    <p className="text-lg mb-4">{member.role}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <SwiperPrevButton className="team-prev absolute top-[50%] left-2 lg:left-6 xl:-left-2 z-10" />
                <SwiperNextButton className="team-next absolute top-[50%] right-2 lg:right-6 xl:-right-2 z-10" />
            </div>
        </section>
    );
}
