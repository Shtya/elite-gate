import React from 'react';
import WorkProcessCard from './WorkProcessCard';
import SectionTitle from '@/components/shared/SectionTitle';

const WorkProcessSection = () => {

    const cards = [
        {
            step: 1,
            title: 'اختيار البحث',
            description: 'حدد نوع العقار الذي ترغب في التخصص فيه، مثل السكني',
            imageSrc: '/main/about/work-process-icon-3.png',
        },
        {
            step: 2,
            title: 'تحديد الوجهة',
            description: 'حدد نوع العقار الذي ترغب في التخصص فيه، مثل السكني',
            imageSrc: '/main/about/work-process-icon-3.png',
        },
        {
            step: 3,
            title: 'سهولة الحجز',
            description: 'حدد نوع العقار الذي ترغب في التخصص فيه، مثل السكني',
            imageSrc: '/main/about/work-process-icon-3.png',
        },
    ];

    if (!cards || cards.length === 0) {
        return <p className="text-center text-neutral-500">لا توجد خطوات متاحة حالياً.</p>;
    }

    return (
        <section className="bg-white py-[60px] lg:py-[120px] px-3 xl:px-0">
            <div className="container">
                <SectionTitle arrowTitle='عملية الحجز' title='كيفية حجز تذاكر الطيران: دليل خطوة بخطوة' description='يمكن شراء العقارات أو بيعها أو تأجيرها، وهي فرصة استثمارية قيّمة. قيمة العقارات قابلة للنمو...' />


                <div className="grid grid-cols-12 gap-4 lg:gap-6">
                    {cards.map((card) => (
                        <WorkProcessCard key={card.step} {...card} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkProcessSection;
