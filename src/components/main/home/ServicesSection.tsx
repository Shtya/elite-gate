import SectionTitle from "@/components/shared/SectionTitle";
import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
    const services = [
        {
            title: "شراء عقار",
            description: "الشراء هو خطوة استثمارية مهمة تتيح لك امتلاك منزل أو أرض.",
            buttonText: "ابحث عن منزل",
            imageUrl: "/main/home/service-img-1.webp",
            link: "#",
        },
        {
            title: "بيع عقار",
            description: "البيع يتيح لك تحقيق عائد من ممتلكاتك العقارية.",
            buttonText: "أنشئ إعلانًا",
            imageUrl: "/main/home/service-img-2.png",
            link: "#",
        },

    ];

    return (
        <section className="bg-bg-2 py-[60px] lg:py-[120px]">
            <div className="container">
                <div className="max-w-[630px] mx-auto flex flex-col items-center text-center px-3">
                    <SectionTitle
                        title="شاهد كيف يمكن ان نساعدك"
                        arrowTitle="الخدمات"
                        bgColor="var(--primary-light)"
                        description="يمكن شراء العقارات أو بيعها أو تأجيرها أو استئجارها، وهي تُعد فرصة استثمارية قيّمة. وتعتمد قيمة العقار على الموقع والاستخدام."
                    />
                </div>

                <div className="grid grid-cols-1 md:!grid-cols-2 xl:!grid-cols-3  gap-4 px-3 px-xl-0 mt-10">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
}
