import { Control, Controller } from "react-hook-form";
import Card from "@/components/shared/Card";
import TextInput from "@/components/shared/Forms/TextInput";
import TextareaInput from "@/components/shared/Forms/TextareaInput";
import EditTeamSection from "./EditTeamSection";
import { AboutContentForm } from "./AboutForm";

type TeamSectionFormProps = {
    control: Control<AboutContentForm>;
};

export default function TeamSectionForm({ control }: TeamSectionFormProps) {
    return (
        <Card className="space-y-4" title="الفريق" collapsible>
            <Controller
                name="teamTitle"
                control={control}
                render={({ field }) => (
                    <TextInput
                        {...field}
                        id="team-title"
                        label="العنوان"
                        placeholder="مثال: فريقنا المميز"
                    />
                )}
            />
            <Controller
                name="teamSubtitle"
                control={control}
                render={({ field }) => (
                    <TextareaInput
                        {...field}
                        id="team-subtitle"
                        label="الوصف"
                        placeholder="مثال: تعرف على أعضاء فريقنا الذين يقفون خلف نجاحنا..."
                    />
                )}
            />
            <EditTeamSection control={control} />
        </Card>
    );
}


