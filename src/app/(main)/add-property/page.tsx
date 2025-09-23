'use client';

import { useForm } from 'react-hook-form';
import RequesterInfoSection from '@/components/main/addProperty/RequesterInfoSection';
import SpecificationsSection from '@/components/main/addProperty/SpecificationsSection';
import CenteredContainer from '@/components/shared/CenteredContainer';
import RequertPropertyInfoSection from '@/components/main/addProperty/RequertPropertyInfoSection';
import Uploader from '@/components/shared/Forms/Uploader';
import { FileItem } from '@/utils/upload';
import Card from '@/components/shared/Card';
import { PropertyType } from '@/types/property';

export type PropertyRequestFormValues = {
    requesterName: string; // اسم مقدم الطلب
    relationshipType: 'owner' | 'authorized_representative'; // نوع العلاقة
    askedPrice: number;
    attachments: FileItem[]; // روابط الصور أو المستندات
    propertyType: PropertyType; // نوع العقار (شقة، فيلا، أرض...)
    address: string;
    specifications: Record<string, { name: string; value: string | string[] }>; // مواصفات العقار
    authorizationDoc?: FileItem;

};

export default function AddPropertyRequestPage() {
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
        <CenteredContainer className='py-[30px] lg:py-[60px] bg-[var(--bg-2)] px-3'>
            {/* <Card title="طلب إضافة عقار"> */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <RequesterInfoSection control={control} />

                <RequertPropertyInfoSection control={control} />
                <SpecificationsSection control={control} />

                <Card title='وثيقة التفويض (إن وجدت)'>
                    <Uploader control={control} name="authorizationDoc" accept="*/*" label='وثيقة التفويض' allowMultiple={false} allowPrimary={false} />
                </Card>

                <button
                    type="submit"
                    className="btn-primary px-6 py-3 rounded-full font-semibold"
                >
                    إرسال الطلب
                </button>
            </form>
            {/* </Card> */}
        </CenteredContainer>
    );
}
