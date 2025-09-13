'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types/global';

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
                <button className="absolute top-4 right-4 z-10 bg-white p-2.5 rounded-full text-primary hover:bg-primary-light transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </button>
            </div>

            {/* Content Section */}
            <div className="col-span-12 md:col-span-7 flex flex-col justify-between">
                <div className="px-4 pt-4">
                    <Link href={link} className="text-xl font-semibold text-neutral-700 block mb-4">
                        {title}
                    </Link>

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
