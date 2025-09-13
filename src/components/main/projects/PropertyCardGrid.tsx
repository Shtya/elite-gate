'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types/global';

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
                <button className="absolute top-4 right-4 z-10 bg-white p-2.5 rounded-full text-primary hover:bg-primary-light transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </button>
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
