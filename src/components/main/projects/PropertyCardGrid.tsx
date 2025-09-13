'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types/global';
import FavoriteButton from '@/components/shared/FavoriteButton';

interface PropertyCardGridProps {
    property: Property;
}

export default function PropertyCardGrid({ property }: PropertyCardGridProps) {
    return (
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden ">
            {/* Image Section */}
            <div className="relative min-h-[400px] group rounded-2xl overflow-hidden">
                <Image
                    src={property.imageLink}
                    alt={property.title}
                    width={400}
                    height={280}
                    className="rounded-2xl w-full object-cover min-h-[400px]"
                />

                {/* Type Tag */}
                <Link
                    href={`/projects?type=${property.type}`}
                    className="absolute top-4 left-4 z-10 bg-white text-primary rounded-full py-2 px-4 text-sm font-semibold hover:bg-primary-light transition-colors"
                >
                    {property.type}
                </Link>

                {/* Favorite Button */}
                <FavoriteButton property={property} />
            </div>

            {/* Content Section */}
            <div className="p-2 sm:p-5">
                <Link href={property.link} className="text-xl font-medium text-neutral-700 mb-4 block">
                    {property.title}
                </Link>

                <ul className="flex flex-wrap divide-x divide-dashed justify-between mt-5 text-sm text-neutral-600">
                    {property.rooms && (
                        <li className="flex flex-col px-1 sm:px-4 gap-2">
                            <i className="las la-city text-xl" />
                            <span>{property.rooms}</span>
                        </li>
                    )}
                    {property.beds && (
                        <li className="flex flex-col px-1 sm:px-4 gap-2">
                            <i className="las la-bed text-xl" />
                            <span>{property.beds}</span>
                        </li>
                    )}
                    {property.area && (
                        <li className="flex flex-col px-1 sm:px-4 gap-2">
                            <i className="las la-arrows-alt text-xl" />
                            <span>{property.area}</span>
                        </li>
                    )}
                </ul>

                <div className="border-t border-dashed my-4" />

                <div className="flex justify-end">
                    <Link href={property.link} className="btn-outline">
                        اقرأ المزيد
                    </Link>
                </div>
            </div>
        </div>

    );
}
