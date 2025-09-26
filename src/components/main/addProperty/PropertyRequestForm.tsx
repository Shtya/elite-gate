'use client';

import { useForm } from 'react-hook-form';
import RequesterInfoSection from './RequesterInfoSection';
import SpecificationsSection from './SpecificationsSection';
import RequertPropertyInfoSection from './RequertPropertyInfoSection';
import Uploader from '@/components/shared/Forms/Uploader';
import Card from '@/components/shared/Card';
import PrimaryButton from '@/components/shared/Button';
import SoftActionButton from '@/components/shared/SoftActionButton';
import { FileItem } from '@/utils/upload';
import { PropertyType } from '@/types/property';

export type PropertyRequestFormValues = {
    requesterName: string;
    relationshipType: 'owner' | 'authorized_representative';
    askedPrice: number;
    attachments: FileItem[];
    propertyType: PropertyType;
    address: string;
    specifications: Record<string, { name: string; value: string | string[] }>;
    authorizationDoc?: FileItem;
};

export default function PropertyRequestForm() {
    const { control, handleSubmit } = useForm<PropertyRequestFormValues>({
        defaultValues: {
            requesterName: '',
            relationshipType: 'owner',
            attachments: [],
            propertyType: 'apartment',
            askedPrice: 0,
            address: '',
            specifications: {},
            authorizationDoc: undefined,
        },
    });

    const onSubmit = (data: PropertyRequestFormValues) => {
        console.log('Creating new property request...', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <RequesterInfoSection control={control} />
            <RequertPropertyInfoSection control={control} />
            <SpecificationsSection control={control} />

            <Card title="وثيقة التفويض (إن وجدت)">
                <Uploader
                    control={control}
                    name="authorizationDoc"
                    accept="*/*"
                    label="وثيقة التفويض"
                    allowMultiple={false}
                    allowPrimary={false}
                    rules={['الحد الأقصى لحجم الملف 9MB']}
                />
            </Card>

            <div className="space-x-4 flex items-center justify-start">
                <PrimaryButton type="submit">إرسال الطلب</PrimaryButton>
                <SoftActionButton onClick={() => { }}>إلغاء</SoftActionButton>
            </div>
        </form>
    );
}
