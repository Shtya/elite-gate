'use client';

import { useForm } from 'react-hook-form';
import GeneralInfoSection from './FormSections/GeneralInfoSection';
import { AccessType, PropertyType } from '@/types/property';
import InfoSection from './FormSections/InfoSection';
import OwnerContactSection from './FormSections/OwnerContactSection';
import MediaLocationSection from './FormSections/MediaLocationSection';
import { FileItem } from '@/utils/upload';
import PrimaryButton from '@/components/shared/Button';
import SoftActionButton from '@/components/shared/SoftActionButton';

export type PropertyDetail = {
    name: string;
    value: string | string[];
};

export type PropertyFormValues = {
    title: string;
    description: string;
    price: number;
    propertyType: PropertyType;
    accessType: AccessType;
    rooms: number;
    bathrooms: number;
    area: number;
    details: Record<string, PropertyDetail>;
    warranties: Record<string, PropertyDetail>;
    ownerName: string;
    ownerPhone: string;
    ownerEmail: string;
    images: FileItem[];
    video: string;
    address: string;
};

type PropertyFormProps = {
    initialData?: PropertyFormValues; // 👈 بيانات العقار لو في وضع تعديل
};

export default function PropertyForm({ initialData }: PropertyFormProps) {
    const { control, handleSubmit } = useForm<PropertyFormValues>({
        defaultValues: initialData || {
            title: '',
            description: '',
            price: 0,
            propertyType: 'apartment',
            accessType: 'direct',
            rooms: 0,
            bathrooms: 0,
            area: 0,
            details: {},
            warranties: {},
            ownerName: '',
            ownerPhone: '',
            ownerEmail: '',
            images: [],
            video: '',
            address: '',
        },
    });

    const onSubmit = (data: PropertyFormValues) => {
        if (initialData) {
            // 👇 وضع التعديل
            console.log('Updating property...', data);
        } else {
            // 👇 وضع الإضافة
            console.log('Creating new property...', data);
        }
    };

    return (

        <form onSubmit={handleSubmit(onSubmit)} className="property-info-form space-y-6 grid xl:grid-cols-2 gap-4 xl:gap-6">
            <div className='max-xl:order-2 space-y-4 xl:space-y-6'>
                <InfoSection<PropertyFormValues> control={control} name="details" title="تفاصيل العقار" />
                <InfoSection<PropertyFormValues> control={control} name="warranties" title="الضمانات" />
                <OwnerContactSection control={control} />
                <MediaLocationSection control={control} />
            </div>
            <div className='max-xl:order-1'>
                <GeneralInfoSection control={control} />
            </div>

            <div className='max-xl:order-3 space-x-4 flex items-center justify-center xl:justify-end'>

                <PrimaryButton type="submit">
                    {initialData ? 'تعديل معلومات العقار' : 'إضافة عقار جديد'}
                </PrimaryButton>
                <SoftActionButton onClick={() => { }}>إلغاء</SoftActionButton>
            </div>

        </form>

    );
}
