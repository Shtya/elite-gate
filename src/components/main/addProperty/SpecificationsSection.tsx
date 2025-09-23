import { PropertyRequestFormValues } from "@/app/(main)/add-property/page";
import InfoSection from "@/components/dashboard/properties/FormSections/InfoSection";
import { Control } from "react-hook-form";

export default function SpecificationsSection({ control }: { control: Control<PropertyRequestFormValues> }) {
    return (
        <InfoSection<PropertyRequestFormValues>
            control={control}
            name="specifications"
            title="مواصفات العقار"
        />
    );
}
