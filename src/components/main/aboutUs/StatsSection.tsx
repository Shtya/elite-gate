// components/StatsSection.tsx
import { BsCheckSquare, BsHandThumbsUp, BsPersonCircle, BsAward } from "react-icons/bs";

const stats =
    [
        {
            icon: <BsCheckSquare />,
            value: "15k",
            label: "عقار مكتمل",
            bg: "bg-primary",
        },
        {
            icon: <BsHandThumbsUp />,
            value: "14k",
            label: "رضا العملاء",
            bg: "bg-[#22804A]",
        },
        {
            icon: <BsPersonCircle />,
            value: "457+",
            label: "وكلاء خبراء",
            bg: "bg-[#9C742B]",
        },
        {
            icon: <BsAward />,
            value: "78+",
            label: "جوائز محققة",
            bg: "bg-primary",
        },
    ]

export default function StatsSection() {

    return (
        <section className="py-[60px] lg:py-[120px]  relative mt-">
            {/* Decorative Image */}

            <div className="container">
                <div className="grid grid-cols-12 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="col-span-12 md:col-span-6 lg:col-span-3 text-white text-center"
                        >
                            <div
                                className={`text-4xl rounded-full mb-4 ${stat.bg} w-20 h-20 flex items-center justify-center mx-auto`}
                            >
                                {stat.icon}
                            </div>
                            <h2 className="h2 text-black mb-2">
                                <span>{stat.value}</span>
                            </h2>
                            <span className="text-black">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
