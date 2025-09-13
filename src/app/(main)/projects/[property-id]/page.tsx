import React from 'react';
import ImageGallery from '@/components/shared/ImageGallery';;
import ProjectBookingForm from '@/components/main/projects/ProjectBookingForm';
import PropertyInfoSection from '@/components/main/projects/property/PropertyInfoSection';
import PropertySummary from '@/components/main/projects/property/PropertySummary';
import PropertyDescriptionSection from '@/components/main/projects/property/PropertyDescriptionSection';
import MapCard from '@/components/shared/MapCard';
import VideoSection from '@/components/shared/VideoSection';
import GuaranteesSection from '@/components/main/projects/property/GuaranteesSection';
import SimilarProjectsSection from '@/components/shared/SimilarProjectsSection';

const projectImages = [
    '/main/projects/property-1.webp',
    '/main/projects/property-2.webp',
    '/main/projects/property-3.webp'
];

const propertyInfo = {
    id: "dfds",
    title: 'فيلا الزمرد 362',
    price: '2,900,000',
    location: 'السعودية، جدة',
    lat: 24.7136,
    lng: 46.6753,
    rooms: '9 غرف',
    baths: '7 حمامات',
    area: '650 متر مربع',
    description: `مرحبًا بكر، عبر منصتنا يمكنك استكشاف وشراء وحدات عقارية بكل سهولة وشفافية، حيث نوفر لك عروضًا متنوعة تناسب احتياجاتك. كما نتيح لأصحاب العقارات فرصة عرض وحداتهم للبيع، وإدارتها من خلال نظام ذكي يضمن وصولها إلى المهتمين، مع دعم فريق متخصص لضمان جودة التجربة للطرفين.`,
    videoUrl: "https://youtu.be/v6E-NKtYLRg?si=nCCCOoyOfkELc9kx",
    guarantees: [
        '10 سنوات هيكل إنشائي',
        '2 سنة كهرباء وسباكة',
    ],
    details: {
        area: { name: 'المساحة', value: '362' },
        district: { name: 'الحي', value: 'الزمرد' },
        plan_number: { name: 'رقم المخطط', value: '0' },
        plot_number: { name: 'رقم القطعة', value: '0' },
        street_width: { name: 'عرض الشارع', value: '32' },
        built_area: { name: 'المساحة المبنية', value: '650' },
        direction: { name: 'الاتجاه', value: 'شمالية' },
        saudi_code: { name: 'الكود السعودي', value: 'مطابق' },
        ownership_dispute: { name: 'نزاع الملكية', value: 'لا يوجد' },
        smart_home: { name: 'سمارت هوم', value: 'نعم' },
        elevator: { name: 'مصعد', value: 'إيطالي' }
    }
};

const similarProjects = [
    {
        imageLink: '/main/projects/property-1.webp',
        type: 'فيلا',
        title: 'فيلا فاخرة – جدة | أبحر الشمالية',
        link: '/projects/obhur-villa',
        rooms: '5 غرف نوم',
        beds: '5 حمامات',
        area: '800 متر مربع',
    },
    {
        imageLink: '/main/projects/property-2.webp',
        type: 'فيلا',
        title: 'فيلا نموذج لايت',
        link: '/projects/light-villa',
        rooms: '5 غرف نوم',
        beds: '6 حمامات',
        area: '480 متر مربع',
    },
    {
        imageLink: '/main/projects/property-3.webp',
        type: 'فيلا',
        title: 'فيلا جوري',
        link: '/projects/jory-villa',
        rooms: '7 غرف نوم',
        beds: '6 حمامات',
        area: '460 متر مربع',
    },
    {
        imageLink: '/main/projects/property-4.webp',
        type: 'فيلا',
        title: 'فيلا جوري',
        link: '/projects/jory-villa',
        rooms: '7 غرف نوم',
        beds: '6 حمامات',
        area: '460 متر مربع',
    },
];

export default function ProjectDetailsPage() {
    return (
        <div className="container py-10 space-y-12">
            {/* Hero Section */}
            <ImageGallery images={projectImages} />

            <div className='flex flex-col md:flex-row gap-4 md:gap-6 '>

                <div className=''>
                    <ProjectBookingForm id={propertyInfo.id} />
                </div>

                <div className='flex-1 space-y-4 md:space-y-6'>

                    <PropertySummary
                        title={propertyInfo.title}
                        price={propertyInfo.price}
                        location={propertyInfo.location}
                        rooms={propertyInfo.rooms}
                        baths={propertyInfo.baths}
                        area={propertyInfo.area}
                    />

                    <PropertyDescriptionSection description={propertyInfo.description} />

                    <PropertyInfoSection details={propertyInfo.details} />
                    <GuaranteesSection guarantees={propertyInfo.guarantees} />
                    <div className='h-[500px]'>
                        <MapCard
                            title="موقعنا"
                            subTitle={propertyInfo.location}
                            lat={propertyInfo.lat}
                            lng={propertyInfo.lng}
                        />
                    </div>
                    <VideoSection videoUrl={propertyInfo.videoUrl} />
                    {/* <section className="max-w-screen-xl mx-auto px-4"> */}
                    <SimilarProjectsSection projects={similarProjects} title='مشاريع مشابهة' />
                    {/* </section> */}

                </div>
            </div>
        </div >
    );
}
