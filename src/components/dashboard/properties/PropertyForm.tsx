'use client';

import { useForm } from 'react-hook-form';
import GeneralInfoSection from './FormSections/GeneralInfoSection';
import { AccessType, PropertyType } from '@/types/property';
import InfoSection from './FormSections/InfoSection';
import OwnerContactSection from './FormSections/OwnerContactSection';
import MediaLocationSection from './FormSections/MediaLocationSection';
import { FileItem } from '@/utils/upload';

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

        <form onSubmit={handleSubmit(onSubmit)} className="property-info-form space-y-6">
            <GeneralInfoSection control={control} />
            <InfoSection<PropertyFormValues> control={control} name="details" title="تفاصيل العقار" />
            <InfoSection<PropertyFormValues> control={control} name="warranties" title="الضمانات" />
            <OwnerContactSection control={control} />
            <MediaLocationSection control={control} />

            <button
                type="submit"
                className="btn-primary px-6 py-3 rounded-full font-semibold"
            >
                {initialData ? 'تعديل معلومات العقار' : 'إضافة عقار جديد'}
            </button>
        </form>

    );
}
