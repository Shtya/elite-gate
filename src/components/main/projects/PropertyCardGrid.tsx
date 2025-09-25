'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types/global';
import FavoriteButton from '@/components/shared/FavoriteButton';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { BiEdit } from 'react-icons/bi';
import { propertyTypeLabels } from '@/types/property';

interface PropertyCardGridProps {
    property: Property;
}
export default function PropertyCardGrid({ property, isAdmin = false }: PropertyCardGridProps & { isAdmin?: boolean }) {
    return (
        <div className="w-full max-[520px]:w-full min-[520px]:max-w-[480px] mx-auto bg-white shadow-lg rounded-xl overflow-hidden flex flex-col border border-gray-100 transition hover:shadow-2xl hover:-translate-y-1 hover:border-primary/30">
            <div className="relative h-[200px] sm:h-[240px] md:h-[260px] group overflow-hidden">
                <Image
                    src={property.imageLink}
                    alt={property.title}
                    fill
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-0" />
                <Link
                    href={`/projects?type=${property.type}`}
                    aria-label={`عرض مشاريع من نوع ${propertyTypeLabels[property.type]}`}
                    className="absolute top-3 left-3 z-10 bg-white text-primary rounded-full py-1.5 px-3 text-xs font-semibold shadow hover:bg-primary-light transition"
                >
                    {propertyTypeLabels[property.type]}
                </Link>
                <div className="absolute w-[100px] top-3 right-3 flex items-center gap-2 z-10">
                    <FavoriteButton property={property} />

                    {isAdmin && (
                        <Link
                            href={`/dashboard/admin/projects/${property.id}/edit`}
                            className="bg-white p-2 rounded-full shadow hover:bg-gray-300 transition"
                        >
                            <BiEdit className="w-5 h-5 text-gray-600" />
                        </Link>
                    )}
                </div>

            </div>

            <div className="p-4 sm:p-5 flex flex-col gap-3">
                {property.location && (
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <FaMapMarkerAlt className="text-primary" />
                        <span>{property.location}</span>
                    </div>
                )}

                <Link
                    href={property.link}
                    className="text-lg sm:text-xl font-bold text-neutral-800 hover:text-primary transition truncate"
                    title={property.title}
                >
                    {property.title}
                </Link>

                <ul className="flex justify-between text-sm text-neutral-600 mt-2">
                    {property.rooms && (
                        <li className="flex items-center gap-2">
                            <i className="las la-city text-lg text-primary" />
                            <span>{property.rooms}</span>
                        </li>
                    )}
                    {property.beds && (
                        <li className="flex items-center gap-2">
                            <i className="las la-bed text-lg text-primary" />
                            <span>{property.beds}</span>
                        </li>
                    )}
                    {property.area && (
                        <li className="flex items-center gap-2">
                            <i className="las la-arrows-alt text-lg text-primary" />
                            <span>{property.area}</span>
                        </li>
                    )}
                </ul>

                <div className="border-t border-dashed my-3" />

                <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-primary">
                        {property.price?.toLocaleString() || '1,704,550,555'} ريال
                    </p>

                    <Link
                        href={property.link}
                        className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-primary border border-primary px-2 py-2 rounded-full hover:bg-primary hover:text-white transition duration-200"
                        aria-label={`اقرأ المزيد عن ${property.title}`}
                    >
                        <span>اقرأ المزيد</span>
                        <i className="las la-arrow-left text-base" />
                    </Link>

                </div>
            </div>
        </div>
    );
}
