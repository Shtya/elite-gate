'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyCardGrid from '@/components/main/projects/PropertyCardGrid';
import PropertyCardList from '@/components/main/projects/PropertyCardList';
import LoadingPropertyCardsDisplay from './LoadingPropertyCardsDisplay';
import useProperties from '@/hooks/dashboard/admin/properties/useProperties';

export default function PropertyCardsDisplay({ isAdmin = false }: { isAdmin?: boolean }) {
    const searchParams = useSearchParams();
    const view = searchParams.get('view') || 'grid';

    const { data, loading, error } = useProperties();

    if (loading) {
        return <LoadingPropertyCardsDisplay />;
    }

    if (error) {
        return (
            <div className="col-span-12 text-center py-10 text-red-500">
                <p className="text-lg font-medium">حدث خطأ أثناء تحميل العقارات.</p>
                <p className="text-sm mt-2">{error.message}</p>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="col-span-12 text-center py-10 text-[var(--neutral-500)]">
                <p className="text-lg font-medium">لا توجد عقارات مطابقة لخيارات البحث الحالية.</p>
                <p className="text-sm mt-2">جرّب تعديل الفلاتر أو إعادة تعيينها لعرض نتائج جديدة.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-12 gap-4 xl:gap-6">
            {data.map((property, index) => (
                <div
                    key={index}
                    className={
                        view === 'list'
                            ? 'col-span-12 2xl:!col-span-6'
                            : 'col-span-12 xs:col-span-6 xl:col-span-4'
                    }
                >
                    {view === 'list' ? (

                        <PropertyCardList property={property} isAdmin={isAdmin} />
                    ) : (
                        <PropertyCardGrid property={property} isAdmin={isAdmin} />
                    )}
                </div>
            ))}
        </div>
    );
}
