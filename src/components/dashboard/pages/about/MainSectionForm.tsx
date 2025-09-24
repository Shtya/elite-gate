import { Control, Controller } from "react-hook-form";
import Card from "@/components/shared/Card";
import TextInput from "@/components/shared/Forms/TextInput";
import { AboutContentForm } from "./AboutForm";

type MainSectionFormProps = {
    control: Control<AboutContentForm>;
};

export default function MainSectionForm({ control }: MainSectionFormProps) {
    return (
        <Card title="القسم الرئيسي" collapsible>
            <Controller
                name="mainTitle"
                control={control}
                render={({ field }) => (
                    <TextInput
                        {...field}
                        id="main-title"
                        label="العنوان الرئيسي"
                        placeholder="مثال: نبني مساحات حديثة ونوفر عقارات للبيع والشراء"
                    />
                )}
            />

            <Controller
                name="mainSubtitle"
                control={control}
                render={({ field }) => (
                    <TextInput
                        {...field}
                        id="main-subtitle"
                        label="النص الفرعي"
                        placeholder="مثال: ابحث عن منزل أحلامك"
                    />
                )}
            />

            <div className="grid grid-cols-[repeat(24,_minmax(0,_1fr))] gap-4">
                {[0, 1, 2, 3].map((i) => (
                    <Controller
                        key={i}
                        name={`mainFeatures.${i}`}
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                {...field}
                                id={`main-feature-${i + 1}`}
                                label={`الميزة ${i + 1}`}
                                placeholder={
                                    i === 0
                                        ? "مثال: معاملات آمنة 100%"
                                        : i === 1
                                            ? "مثال: ضمان أفضل جودة"
                                            : i === 2
                                                ? "مثال: تكاليف ضريبية منخفضة جدًا"
                                                : "مثال: خدمة مستمرة 24/7"
                                }
                            />
                        )}
                    />
                ))}
            </div>
        </Card>
    );
}


