'use client';

import DashboardHeaderTitle from '@/components/dashboard/DashboardHeaderTitle';
import Card from '@/components/shared/Card';
import CenteredContainer from '@/components/shared/CenteredContainer';

import dynamic from 'next/dynamic';

const LocationInput = dynamic(() => import('@/components/shared/Forms/LocationInput'), {
    ssr: false,
    loading: () => (
        <div className="text-center py-10 text-gray-500 animate-pulse">
            جاري تحميل الخريطة...
        </div>
    ),
});

export default function IntroLocationPage() {

    return (
        <div>
            <DashboardHeaderTitle path={['الموقع']} />

            <CenteredContainer className="space-y-6">
                <Card title=''>
                    <LocationInput />
                </Card>
            </CenteredContainer>
        </div>
    );
}
