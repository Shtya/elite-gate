
import PrimaryButton from "@/components/shared/Button";
import SectionTitle from "@/components/shared/SectionTitle";
import { BiLike } from "react-icons/bi";
import { BsArrowRight, BsBuilding, BsShop, BsBuildings } from "react-icons/bs";
const services =
    [
        {
            icon: <BsBuildings className="text-[40px] text-[#9C742B]" />,
            title: "لو كنت مطور أو مالك عقار",
            description: "فمراسل جدة العقاري هو الخيار الأمثل لتسويق عقارك بشكل مثالي تصوير العقارات عن طريق فريق تصوير احترافي إنشاء منشورات وملفات ومحتويات جذابة للتعريف عن مشروعك نقل التغطيات على وسائل التواصل الاجتماعي بمشاهدات عالية حملات ممولة إلكترونية لاستهداف عميلك المحتمل مرافقة عملائك أثناء معاينة العقار لتعزيز تجربة العميل تقديم خدمات تمويلية بالشراكة لتسهيل عملية تملك العميل",
        },
        {
            icon: <BsBuilding className="text-[40px] text-primary" />,
            title: "أما لو كنت العميل",
            description: "فأنت محل اهتمامنا ، و دائماً تجدني قريباً منك لتقديم أفضل الخيارات التي تلائمك ، وتحقيق مايتطلبه الأمر لك ، لتحظى بتجربة شراء فريدة من نوعها ، بكل مصداقية وتقديم استشارات عقارية تُسهل عليك اتخاذ القرار الأمثل باختيار مسكنك الملائم والأفضل",
        },
    ]

const WhyChooseSection = () => {
    return (
        <div className="py-[60px] md:py-[120px] bg-[var(--bg-2)] relative z-[1] px-3">
            <div className="container">
                <div className="grid grid-cols-12">
                    {/* Left Image Section */}
                    <div className="col-span-12 lg:col-span-6">
                        <div className="relative z-[1] text-center text-xxl-start pb-lg-0">
                            <img
                                alt="image"
                                width={526}
                                height={633}
                                className="z-[1] relative"
                                src="/main/about/why-choose-img.webp"
                            />

                            <div className="flex flex-col sm:flex-row items-center gap-4 rounded-xl p-6 bg-tertiary text-white z-10 absolute top-12 right-0 2xl:-right-24 shadow-lg">
                                <div className="w-14 h-14 rounded-full bg-white text-secondary  flex items-center justify-center">
                                    <BiLike className="text-[28px]" />
                                </div>
                                <div className="text-center sm:text-start">
                                    <h3 className="text-2xl font-bold mb-1">
                                        <span>10</span>+
                                    </h3>
                                    <p className="text-sm">سنوات من الخبرة</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right Content Section */}
                    <div className="col-span-12 lg:col-span-6">
                        <SectionTitle
                            arrowTitle="لماذا تختارنا"
                            title="ارتقِ بتجربة السكن مع أفضل العقارات لدينا"
                            description="دائما يتم ترديد عبارة لسنا الوحيدين ولكن نحن الأفضل هذه العبارة لا أرددها فقط بل ألتزم بها بمعنى الكلمة وذلك بتقديم منظومة من الخدمات العقارية الاستثنائية ، لجميع الأطراف المعنية بالمجال العقاري"
                            bgColor="white"
                            className="text-start"
                        />

                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            {services.map((service, index) => (
                                <li key={index} className="bg-[var(--bg-1)] rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300 text-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[var(--primary-light)] text-primary">
                                            {service.icon}
                                        </div>
                                        <h4 className="text-xl font-bold text-[var(--primary-dark)]">{service.title}</h4>
                                        <p className="text-sm text-[var(--neutral-600)] leading-relaxed max-w-[280px]">{service.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseSection;
