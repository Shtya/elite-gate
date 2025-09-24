import { Control, Controller } from "react-hook-form";
import Card from "@/components/shared/Card";
import TextInput from "@/components/shared/Forms/TextInput";
import TextareaInput from "@/components/shared/Forms/TextareaInput";
import { AboutContentForm } from "./AboutForm";

type WhyChooseUsSectionFormProps = {
    control: Control<AboutContentForm>;
};

export default function WhyChooseUsSectionForm({ control }: WhyChooseUsSectionFormProps) {
    return (
        <Card title="لماذا تختارنا" collapsible>
            <Controller
                name="whyTitle"
                control={control}
                render={({ field }) => (
                    <TextInput
                        {...field}
                        id="why-title"
                        label="العنوان"
                        placeholder="مثال: ارتقِ بتجربة السكن.."
                    />
                )}
            />
            <Controller
                name="whySubtitle"
                control={control}
                render={({ field }) => (
                    <TextareaInput
                        {...field}
                        id="why-subtitle"
                        label="الوصف"
                        placeholder="مثال: دائما يتم ترديد عبارة لسنا الوحيدين ولكن نحن الأفضل..."
                    />
                )}
            />
            <Controller
                name="developerDescription"
                control={control}
                render={({ field }) => (
                    <TextareaInput
                        {...field}
                        id="why-developer-description"
                        label="لو كنت مطور أو مالك عقار"
                        placeholder="اشرح كيف تساعد المطور أو المالك (مثال: تسويق العقار، تصوير احترافي...)"
                    />
                )}
            />
            <Controller
                name="clientDescription"
                control={control}
                render={({ field }) => (
                    <TextareaInput
                        {...field}
                        id="why-client-description"
                        label="أما لو كنت العميل"
                        placeholder="اشرح كيف تهتم بالعميل (مثال: تقديم استشارات، تجربة شراء فريدة...)"
                    />
                )}
            />
        </Card>
    );
}


