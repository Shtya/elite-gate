'use client';

import DashboardHeaderTitle from '@/components/dashboard/DashboardHeaderTitle';
import PrimaryButton from '@/components/shared/Button';
import Card from '@/components/shared/Card';
import CenteredContainer from '@/components/shared/CenteredContainer';
import { LocationInputType } from '@/components/shared/Forms/LocationInput';
import SoftActionButton from '@/components/shared/SoftActionButton';

import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';

const LocationInput = dynamic(() => import('@/components/shared/Forms/LocationInput'), {
    ssr: false,
    loading: () => (
        <div className="text-center py-10 text-gray-500 animate-pulse">
            جاري تحميل الخريطة...
        </div>
    ),
}) as unknown as LocationInputType;

export type PropertyFormValues = {
    position: {
        lat: number,
        lng: number
    }
}
export default function IntroLocationPage() {
    const { control, handleSubmit } = useForm<PropertyFormValues>({
        defaultValues: {
            position: { lat: 21.2854, lng: 39.2376 }
        }
    })

    const onSubmit = (data: PropertyFormValues) => {

        console.log('save location...', data);

    };
    return (
        <div>
            <DashboardHeaderTitle path={['الموقع']} />

            <CenteredContainer className="space-y-6">
                <Card title=''>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 '>
                        <LocationInput<PropertyFormValues> control={control} name='position' />
                        <div className='space-x-4 flex items-center justify-start'>
                            <PrimaryButton type="submit">
                                حفظ الموقع
                            </PrimaryButton>
                            <SoftActionButton onClick={() => { }}>إلغاء</SoftActionButton>
                        </div>
                    </form>
                </Card>
            </CenteredContainer>
        </div >
    );
}
