import { PropertyRequestFormValues } from "@/app/(main)/add-property/page";
import Uploader from "@/components/shared/Forms/Uploader";
import Card from "@/components/shared/Card";
import SelectDropdown from "@/components/shared/Forms/SelectDropdown";
import { propertyTypeLabels } from "@/types/property";
import { Control, Controller } from "react-hook-form";
import PriceInput from "@/components/shared/Forms/PriceInput";

export default function RequertPropertyInfoSection({ control }: { control: Control<PropertyRequestFormValues> }) {
    return (
        <Card title="معلومات العقار">
            <div className="grid grid-cols-12 gap-6">
                {/* نوع العقار */}
                <Uploader control={control} name="attachments" accept="*/*" label='الملحقات' />
                <Controller
                    name="propertyType"
                    control={control}
                    render={({ field }) => (
                        <div className='col-span-12'>
                            <label htmlFor='propertyType' className="text-xl font-medium block mb-3">
                                نوع العقار
                            </label>
                            <SelectDropdown
                                value={field.value}
                                onChange={field.onChange}
                                options={Object.entries(propertyTypeLabels).map(([value, label]) => ({
                                    value,
                                    label,
                                }))}
                            />
                        </div>
                    )}
                />

                <PriceInput<PropertyRequestFormValues> control={control} name="askedPrice" />

                {/* العنوان */}
                <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                        <div className="col-span-12">
                            <label className="block text-xl font-medium mb-3">العنوان</label>
                            <input
                                type="text"
                                placeholder="أدخل العنوان"
                                {...field}
                                className="w-full border p-2 rounded-md"
                            />
                        </div>
                    )}
                />
            </div>
        </Card>
    );
}
