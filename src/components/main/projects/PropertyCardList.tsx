'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types/global';
import FavoriteButton from '@/components/shared/FavoriteButton';

export default function PropertyCardList({ property }: { property: Property }) {
    const { imageLink, type, title, link, rooms, beds, area } = property;

    return (
        <div className="bg-white grid grid-cols-12 rounded-2xl shadow-md overflow-hidden p-2">
            {/* Image Section */}
            <div className="col-span-12 md:col-span-5 relative group rounded-2xl overflow-hidden">
                <Image
                    src={imageLink}
                    alt={title}
                    width={200}
                    height={205}
                    className="rounded-2xl object-cover w-full h-full"
                />

                {/* Type Tag */}
                <Link
                    href={`/projects?type=${type}`}
                    className="absolute top-4 left-4 z-10 bg-white text-primary rounded-full py-2 px-4 text-sm font-semibold hover:bg-primary-light transition-colors"
                >
                    {type}
                </Link>

                {/* Favorite Button */}
                <FavoriteButton property={property} />
            </div>

            {/* Content Section */}
            <div className="col-span-12 md:col-span-7 flex flex-col justify-between">
                <div className="px-4 pt-4">
                    <Link href={link} className="text-xl font-semibold text-neutral-700 block mb-4 truncate">
                        {title}
                    </Link>

                    <p className="text-lg font-semibold  mt-2">
                        {property.price?.toLocaleString() || 1704550555?.toLocaleString()} ريال
                    </p>

                    <ul className="flex flex-wrap divide-x divide-dashed justify-between mb-5 text-sm text-neutral-600">
                        {rooms && (
                            <li className="flex flex-col px-2 gap-1">
                                <i className="las la-city text-xl" />
                                <span>{rooms}</span>
                            </li>
                        )}
                        {beds && (
                            <li className="flex flex-col px-2 gap-1">
                                <i className="las la-bed text-xl" />
                                <span>{beds}</span>
                            </li>
                        )}
                        {area && (
                            <li className="flex flex-col px-2 gap-1">
                                <i className="las la-arrows-alt text-xl" />
                                <span>{area}</span>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="border-t border-dashed mx-4" />

                <div className="px-4 py-4 flex justify-between items-center">
                    <Link href={link} className="btn-outline">
                        اقرأ المزيد
                    </Link>
                </div>
            </div>
        </div>
    );
}
