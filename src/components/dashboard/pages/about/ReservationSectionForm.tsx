import { Control, Controller } from "react-hook-form";
import Card from "@/components/shared/Card";
import TextInput from "@/components/shared/Forms/TextInput";
import TextareaInput from "@/components/shared/Forms/TextareaInput";
import Image from "next/image";
import { AboutContentForm } from "./AboutForm";

const reservationCards = [
    {
        step: 1,
        title: "اختيار البحث",
        description: "ابدأ بتحديد نوع العقار الذي يناسب احتياجاتك، مثل السكني أو التجاري.",
        imageSrc: "/main/about/work-process-icon-1.png",
    },
    {
        step: 2,
        title: "تحديد الوجهة",
        description: "اختر المدينة أو الحي الذي ترغب في السكن أو الاستثمار فيه.",
        imageSrc: "/main/about/work-process-icon-2.png",
    },
    {
        step: 3,
        title: "سهولة الحجز",
        description: "أكمل عملية الحجز بسهولة عبر خطوات واضحة وسريعة.",
        imageSrc: "/main/about/work-process-icon-3.png",
    },
];

type ReservationSectionFormProps = {
    control: Control<AboutContentForm>;
};

export default function ReservationSectionForm({ control }: ReservationSectionFormProps) {
    return (
        <Card title="عملية الحجز" collapsible>
            <Controller
                name="bookingTitle"
                control={control}
                render={({ field }) => (
                    <TextInput
                        {...field}
                        id="booking-title"
                        label="العنوان"
                        placeholder="مثال: كيفية حجز تذاكر الطيران: دليل خطوة بخطوة"
                    />
                )}
            />
            <Controller
                name="bookingSubtitle"
                control={control}
                render={({ field }) => (
                    <TextareaInput
                        {...field}
                        id="booking-subtitle"
                        label="الوصف"
                        placeholder="اشرح بإيجاز خطوات الحجز (مثال: يمكن شراء العقارات أو بيعها أو تأجيرها...)"
                    />
                )}
            />

            <div className="grid lg:grid-cols-3 gap-4 mt-2">
                {reservationCards.map((card, i) => (
                    <div key={i} className="border p-3 rounded-md">
                        <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="font-semibold text-[var(--primary)]">
                                {`الخطوة ${card.step}`}
                            </span>
                            <Image
                                src={card.imageSrc}
                                width={32}
                                height={32}
                                alt={card.title}
                                className="w-8 h-8 object-contain"
                            />
                        </div>

                        <Controller
                            name={`bookingSteps.${i}.title`}
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    id={`booking-step-${i + 1}-title`}
                                    placeholder={`مثال: ${card.title}`}
                                    label={`عنوان الخطوة ${i + 1}`}
                                />
                            )}
                        />

                        <Controller
                            name={`bookingSteps.${i}.description`}
                            control={control}
                            render={({ field }) => (
                                <TextareaInput
                                    {...field}
                                    id={`booking-step-${i + 1}-description`}
                                    label="الوصف"
                                    placeholder={`مثال: ${card.description}`}
                                />
                            )}
                        />
                    </div>
                ))}
            </div>
        </Card>
    );
}


