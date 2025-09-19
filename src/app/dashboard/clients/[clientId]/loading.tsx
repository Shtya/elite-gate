'use client';

import Skeleton from '@/components/shared/Skelatons/Skeleton';
import { BiGroup } from 'react-icons/bi';
import Link from 'next/link';
import DashboardHeaderTitleSkeleton from '@/components/shared/Skelatons/DashboardHeaderTitleSkeleton';

export default function LoadingClientDetailsPage() {
    return (
        <div>
            <DashboardHeaderTitleSkeleton />

            {/* Grid Layout */}
            <div className="grid grid-cols-12 gap-4 lg:gap-6">
                {/* Left Column */}
                <div className="col-span-12 xl:col-span-4 ">
                    <div className="relative rounded-2xl bg-white p-6 shadow-sm">
                        {/* Edit Icon */}
                        <div className="absolute top-4 right-4 w-9 h-9 bg-gray-200 rounded-full animate-pulse" />

                        {/* Avatar */}
                        <div className="relative w-fit mx-auto">
                            <Skeleton className="w-20 h-20 rounded-full" />
                            <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-gray-300 border-2 border-white animate-pulse" />
                        </div>

                        {/* Name */}
                        <Skeleton className="h-5 w-32 mt-5 mx-auto" />

                        {/* Contact Info */}
                        <div className="mt-6 space-y-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="col-span-12 xl:col-span-8 ">
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <Skeleton className="h-6 w-48 mb-6" />

                        {/* Booking Cards */}
                        <div className="flex flex-wrap gap-6 border-b pb-8 border-dashed">
                            <Skeleton className="h-20 w-40 rounded-xl" />
                            <Skeleton className="h-20 w-40 rounded-xl" />
                        </div>

                        {/* Info Blocks */}
                        <div className="grid grid-cols-12 gap-4 mt-6">
                            {[...Array(3)].map((_, colIdx) => (
                                <div key={colIdx} className="col-span-12 sm:col-span-6 xl:col-span-4 flex flex-col gap-3">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-4 w-48" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
