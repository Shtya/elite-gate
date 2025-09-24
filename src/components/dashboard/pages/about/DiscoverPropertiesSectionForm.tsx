import { Control, Controller } from "react-hook-form";
import Card from "@/components/shared/Card";
import TextInput from "@/components/shared/Forms/TextInput";
import TextareaInput from "@/components/shared/Forms/TextareaInput";
import { BsAward, BsCheckSquare, BsHandThumbsUp, BsPersonCircle } from "react-icons/bs";
import { AboutContentForm } from "./AboutForm";

const discoverStats = [
    {
        icon: <BsCheckSquare className="w-6 h-6 text-white" />,
        value: "15k",
        label: "عقار مكتمل",
        bg: "bg-primary",
    },
    {
        icon: <BsHandThumbsUp className="w-6 h-6 text-white" />,
        value: "14k",
        label: "رضا العملاء",
        bg: "bg-[#22804A]",
    },
    {
        icon: <BsPersonCircle className="w-6 h-6 text-white" />,
        value: "457+",
        label: "وكلاء خبراء",
        bg: "bg-[#9C742B]",
    },
    {
        icon: <BsAward className="w-6 h-6 text-white" />,
        value: "78+",
        label: "جوائز محققة",
        bg: "bg-primary",
    },
];

type DiscoverPropertiesSectionFormProps = {
    control: Control<AboutContentForm>;
};

export default function DiscoverPropertiesSectionForm({ control }: DiscoverPropertiesSectionFormProps) {
    return (
        <Card title="استكشاف العقارات" collapsible>
            <Controller
                name="exploreTitle"
                control={control}
                render={({ field }) => (
                    <TextInput
                        {...field}
                        id="discover-title"
                        label="العنوان"
                        placeholder="مثال: استكشاف العقارات"
                    />
                )}
            />
            <Controller
                name="exploreSubtitle"
                control={control}
                render={({ field }) => (
                    <TextareaInput
                        {...field}
                        id="discover-subtitle"
                        label="الوصف"
                        placeholder="مثال: نظرة تفصيلية داخل عقاراتنا"
                    />
                )}
            />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {discoverStats.map((stat, i) => (
                    <div
                        key={i}
                        className="flex flex-col items-center justify-center border rounded-md p-4 text-center"
                    >
                        <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-2 ${stat.bg}`}>
                            {stat.icon}
                        </div>
                        <p className="font-semibold text-gray-700">{stat.label}</p>
                        <Controller
                            name={`stats.${i}.value`}
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    id={`discover-stat-${i + 1}`}
                                    label="القيمة"
                                    placeholder={`مثال: ${stat.value}`}
                                />
                            )}
                        />
                    </div>
                ))}
            </div>
        </Card>
    );
}


