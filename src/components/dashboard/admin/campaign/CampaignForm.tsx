'use client'
import { FieldErrors, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { campaignSchema, CampaignFormData } from '@/types/campaign'
import Card from '@/components/shared/Card'
import TextInput from '@/components/shared/Forms/TextInput'
import TextareaInput from '@/components/shared/Forms/TextareaInput'
import Uploader from '@/components/shared/Forms/Uploader'
import PrimaryButton from '@/components/shared/Button'
import SoftActionButton from '@/components/shared/SoftActionButton'
import RunSettings from './RunSettings'
import TargetSettings from './TargetSettings'
import { useState } from 'react'


interface CampaignFormProps {
    initialData?: Partial<CampaignFormData>
}


export default function CampaignForm({ initialData }: CampaignFormProps) {
    const [isLoading, setIsLoading] = useState(false)

    const {

        handleSubmit,
        watch,
        control,
        setValue,
        formState: { errors }
    } = useForm<CampaignFormData>({
        resolver: zodResolver(campaignSchema),
        defaultValues: initialData || {
            campaignName: '',
            campaignTitle: '',
            campaignDescription: '',
            campaignImages: [],
            targetChannel: 'email',
            targetAudience: 'all_users',
            runType: 'once',
            runOnceDateTime: '',
            startDate: '',
            endDate: '',
            isDraft: false,
            runFrequency: 'daily',
            runTime: '',
        }
    })


    function onSubmit(data: CampaignFormData) {
        // Pass data to parent component or handle it here
        console.log('Form Data:', data)
    }

    function onError(errors: FieldErrors<CampaignFormData>) {
        console.log('Form Errors:', errors)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
            {/* Basic Information */}
            <Card title="المعلومات الأساسية">
                <div className="space-y-4">
                    <TextInput
                        id="campaignName"
                        label="اسم الحملة (للمديرين)"
                        placeholder="أدخل اسم الحملة"
                        name="campaignName"
                        value={watch('campaignName')}
                        onChange={(e) => setValue('campaignName', e.target.value)}
                        error={errors.campaignName?.message}
                    />

                    <TextInput
                        id="campaignTitle"
                        label="عنوان الحملة"
                        placeholder="أدخل عنوان الحملة"
                        name="campaignTitle"
                        value={watch('campaignTitle')}
                        onChange={(e) => setValue('campaignTitle', e.target.value)}
                        error={errors.campaignTitle?.message}
                    />

                    <TextareaInput
                        id="campaignDescription"
                        label="وصف الحملة"
                        placeholder="أدخل وصف الحملة"
                        name="campaignDescription"
                        value={watch('campaignDescription')}
                        onChange={(e) => setValue('campaignDescription', e.target.value)}
                        error={errors.campaignDescription?.message}
                    />
                </div>
            </Card>

            {/* Campaign Images */}
            <Card title="صور الحملة">
                <div className="space-y-4">
                    <Uploader
                        control={control}
                        name="campaignImages"
                        accept="image/jpeg,image/png,image/webp"
                        allowMultiple={true}
                        allowPrimary={false}
                        maxFiles={2}
                        maxSizeMB={9}
                        rules={[
                            'يمكن رفع صورتين كحد أقصى',
                            'الأنواع المدعومة: JPG, PNG, WebP',
                            'الحد الأقصى لحجم الملف 5MB'
                        ]}
                    />
                    {errors.campaignImages && (
                        <p className="mt-2 text-sm text-red-600 font-medium">
                            {errors.campaignImages.message}
                        </p>
                    )}
                </div>
            </Card>

            <Card title="إرفاق ملفات اكسل">
                <div className="space-y-4">
                    <Uploader
                        control={control}
                        name="campaignExcel"
                        accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        allowMultiple={true}
                        allowPrimary={false}
                        maxFiles={2}
                        maxSizeMB={9}
                        rules={[
                            'يمكن رفع ملفين كحد أقصى',
                            'الحد الأقصى لحجم الملف 9MB'
                        ]}
                    />
                    {errors.campaignExcel && (
                        <p className="mt-2 text-sm text-red-600 font-medium">
                            {errors.campaignExcel.message}
                        </p>
                    )}
                </div>
            </Card>


            <RunSettings control={control} watch={watch} setValue={setValue} errors={errors} />
            <TargetSettings control={control} errors={errors} />

            {/* Submit Button */}
            <div className="col-span-12 flex items-center gap-6 flex-wrap">
                <PrimaryButton type="submit">
                    {isLoading ? 'جاري الحفظ...' : 'حفظ الحملة'}
                </PrimaryButton>
                <SoftActionButton onClick={() => { }}>إلغاء</SoftActionButton>
            </div>
        </form>
    )
}
