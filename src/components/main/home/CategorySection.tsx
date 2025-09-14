import Image from "next/image";
import CategoryCard from "./CategoryCard";
import Link from "next/link";
import { IconType } from "react-icons";

import {
    FaCity,
    FaBuilding,
    FaIndustry,
    FaStore,
    FaLandmark,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
} from "react-icons/fa";
import { BsArrowUpRight } from "react-icons/bs";
import SectionTitle from "@/components/shared/SectionTitle";

export type Category = {
    title: string;
    description: string;
    href: string;
    icon: IconType;
    color?: string;
}

export const categories: Category[] = [
    {
        title: "فلل",
        description: "الفيلا هي منزل فاخر كبير عادةً في منطقة راقية.",
        href: "/projects?type=villas",
        icon: FaLandmark,
        color: "var(--secondary)"
    },
    {
        title: "شقق",
        description: "الشقة هي وحدة سكنية مستقلة داخل مبنى.",
        href: "/projects?type=apartments",
        icon: FaCity,
        color: "var(--primary)"
    },
    {
        title: "أراضي سكنية",
        description: "أراضي مخصصة للبناء السكني وتطوير المجتمعات.",
        href: "/projects?type=residential-land",
        icon: FaMapMarkedAlt,
        color: "var(--tertiary)"
    },
    {
        title: "أراضي تجارية",
        description: "أراضي مخصصة للمشاريع التجارية والاستثمارية.",
        href: "/projects?type=commercial-land",
        icon: FaMapMarkerAlt,
        color: "var(--tertiary)"
    },
    {
        title: "مكاتب إدارية",
        description: "مساحات مكتبية مخصصة للأعمال والإدارة.",
        href: "/projects?type=offices",
        icon: FaBuilding,
        color: "var(--secondary)"
    },
    {
        title: "صناعي",
        description: "الصناعي يشير إلى المباني المخصصة للأعمال الصناعية.",
        href: "/projects?type=industrial",
        icon: FaIndustry,
    },
    {
        title: "تجاري",
        description: "التجاري يشير إلى الأنشطة أو المباني التجارية.",
        href: "/projects?type=commercial",
        icon: FaStore, color: "var(--tertiary)"
    },
];


export default function CategorySection() {
    return (
        <section className="bg-white py-[60px] lg:py-[120px] relative px-3">
            <Image
                alt="عنصر زخرفي"
                src="/main/home/category-section-el.png"
                width={232}
                height={207}
                className="absolute hidden lg:block top-12 left-12"
                style={{ color: "transparent" }}
            />

            <div className="container">
                <SectionTitle title="اختر الفئة المناسبة" bgColor="var(--primary-light)" arrowTitle="الفئات" description="يمكن شراء العقارات أو بيعها، وهي فرصة استثمارية قيّمة. قيمة العقار تعتمد على الموقع والاستخدام." />

                <div className="flex flex-wrap justify-center gap-6">
                    {categories.map((cat, idx) => (
                        <CategoryCard
                            key={idx}
                            title={cat.title}
                            description={cat.description}
                            href={cat.href}
                            icon={<cat.icon className={`text-7xl group-hover:!text-white`} style={{ color: cat?.color || "var(--primary)" }} />}
                        />
                    ))}


                    {/* Highlighted Circle */}
                    <div className="flex justify-center items-center relative group">
                        <div className="w-[290px] h-[290px] rounded-full bg-secondary-300 duration-300 group-hover:bg-secondary-500 group-hover:text-white flex items-center justify-center p-5 cursor-pointer relative overflow-hidden">
                            <div className="text-center">
                                <h2 className="mb-2 group-hover:text-white">25+</h2>
                                <p >استكشف العقارات <br /> واستثمر بثقة</p>
                                <Link
                                    href="/projects"
                                    className="rounded-full bg-white group-hover:bg-tertiary mt-4 p-6 inline-block text-black"
                                >
                                    <BsArrowUpRight size={20} />
                                </Link>
                            </div>
                            <div className="h-[197px] w-[197px] rounded-full absolute -right-20 -bottom-16 bg-secondary-400" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
