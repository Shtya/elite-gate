'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyCardGrid from '@/components/main/projects/PropertyCardGrid';
import PropertyCardList from '@/components/main/projects/PropertyCardList';
import { Property } from '@/types/global';

interface PropertyCardsDisplayProps {
    properties: Property[];
}

export default function PropertyCardsDisplay({ properties }: PropertyCardsDisplayProps) {
    const searchParams = useSearchParams();
    const view = searchParams.get('view') || 'grid';

    if (!properties || properties.length === 0) {
        return (
            <div className="col-span-12 text-center py-10 text-[var(--neutral-500)]">
                <p className="text-lg font-medium">لا توجد عقارات مطابقة لخيارات البحث الحالية.</p>
                <p className="text-sm mt-2">جرّب تعديل الفلاتر أو إعادة تعيينها لعرض نتائج جديدة.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-12 gap-4 xl:gap-6">
            {properties.map((property, index) => (
                <div
                    key={index}
                    className={
                        view === 'list'
                            ? 'col-span-12'
                            : 'col-span-12 lg:col-span-6'
                    }
                >
                    {view === 'list' ? (
                        <PropertyCardList property={property} />
                    ) : (
                        <PropertyCardGrid property={property} />
                    )}
                </div>
            ))}
        </div>
    );
}
