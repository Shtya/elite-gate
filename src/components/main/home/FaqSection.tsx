import FaqList from "@/components/shared/FaqList";
import SectionTitle from "@/components/shared/SectionTitle";
import Image from "next/image";


const faqs = [
    {
        question: "ما هو العقار؟",
        answer:
            "العقار هو ممتلكات تشمل الأرض والمباني، ويمكن شراؤه أو بيعه أو تأجيره كفرصة استثمارية.",
    },
    {
        question: "كيف أشتري منزلًا؟",
        answer:
            "ابدأ بالبحث عن وكيل عقاري يساعدك في تحديد السعر المناسب والعثور على العقار المثالي.",
    },
    {
        question: "كيف أبيع منزلًا؟",
        answer:
            "تواصل مع وكيل عقاري يساعدك في تسعير المنزل وتسويقه للمشترين المحتملين.",
    },
    {
        question: "ما هو الرهن العقاري؟",
        answer:
            "الرهن العقاري هو قرض يُستخدم لشراء عقار، ويتم سداده على مدى فترة زمنية محددة.",
    },
    {
        question: "ما هي ضمانات المنزل؟",
        answer:
            "ضمان المنزل هو عقد يغطي إصلاحات معينة في المنزل لفترة محددة بعد الشراء.",
    },
];
export default function FaqSection() {


    return (
        <section className="relative bg-white py-[60px] lg:py-[120px]">
            {/* Decorative Images */}
            <Image
                alt="faq el"
                width={79}
                height={85}
                className="hidden lg:block absolute top-10 right-10 -scale-[1] -rotate-90"
                src="/main/home/side.png"
            />
            <Image
                alt="faq el"
                width={207}
                height={164}
                className="hidden lg:block absolute bottom-0 left-0 -scale-[1]"
                src="/main/home/side-2.png"
            />

            <div className="container ">

                <SectionTitle
                    arrowTitle="الأسئلة الشائعة"
                    title="إذا كان لديك أي سؤال، نحن لدينا الإجابة"
                    description="يمكن شراء العقارات أو بيعها أو تأجيرها، وهي فرصة استثمارية قيّمة. وتعتمد قيمة العقار على الموقع والاستخدام."
                    bgColor="var(--primary-light)" />

                <div className="max-w-[856px]  mx-auto">

                    <FaqList faqs={faqs} />
                </div>
            </div>
        </section>
    );
}
