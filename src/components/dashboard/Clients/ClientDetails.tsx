'use client';

import CardInfo from '@/components/shared/infos/CardInfo';
import IconDetail from '@/components/shared/infos/IconDetail';
import { InfoBlock } from '@/components/shared/infos/InfoBlock';
import { ClientRow, statusMap } from '@/types/dashboard/client';
import { format } from 'date-fns';
import Link from 'next/link';
import { BiEdit } from 'react-icons/bi';
import { FaCalendarAlt, FaClipboardList } from 'react-icons/fa';

type Props = {
    client: ClientRow;
    bookingsThisMonth: number;
    totalBookings: number;
};

export default function ClientDetails({ client, bookingsThisMonth, totalBookings }: Props) {
    return (
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
            {/* Left Column */}
            <div className="col-span-12 xl:col-span-4 ">
                <div className="relative rounded-2xl bg-white p-6 shadow-sm">

                    {/* ✏️ Edit Icon at Card Corner */}
                    <Link
                        href={`/dashboard/clients/${client.id}/edit`}
                        className="absolute top-4 right-4 bg-white border border-gray-200 p-2 rounded-full shadow-sm hover:bg-gray-50 transition z-10"
                        title="تعديل العميل"
                    >
                        <BiEdit className="w-5 h-5 text-gray-600" />
                    </Link>

                    {/* Avatar */}
                    <div className="relative w-fit mx-auto">
                        <img
                            src={client.image || '/users/default-user.png'}
                            alt={client.name}
                            className="rounded-full w-20 h-20 object-cover border"
                            onError={(e) => {
                                e.currentTarget.src = '/users/default-user.png';
                            }}
                        />

                        {/* Status Ball */}
                        <span
                            className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${client.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                                }`}
                            title={client.status === 'active' ? 'نشط' : 'موقوف'}
                        />
                    </div>

                    {/* Name */}
                    <h5 className="text-xl font-semibold mt-5 text-center">{client.name}</h5>

                    {/* Contact Info */}
                    <div className="mt-6 space-y-4">
                        <IconDetail
                            icon={<FaClipboardList className="text-[var(--primary)] w-6 h-6" />}
                            label="رقم الهاتف"
                            value={client.phone}
                            href={`tel:${client.phone}`}
                            className='ltr-data block'
                        />
                        <IconDetail
                            icon={<FaCalendarAlt className="text-[var(--secondary-500)] w-6 h-6" />}
                            label="البريد الإلكتروني"
                            value={client.email}
                            href={`mailto:${client.email}`}
                        />
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="col-span-12 xl:col-span-8 ">
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-6">معلومات العميل</h3>

                    {/* Cards */}
                    <div className="flex flex-wrap gap-6 border-b pb-8 border-dashed">
                        <CardInfo
                            icon={<FaClipboardList className="text-[var(--primary)] w-10 h-10" />}
                            value={totalBookings}
                            label="إجمالي الحجوزات"
                        />
                        <CardInfo
                            icon={<FaCalendarAlt className="text-[var(--secondary-500)] w-10 h-10" />}
                            value={bookingsThisMonth}
                            label="حجوزات هذا الشهر"
                        />
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-12 gap-4 mt-6">
                        <div className="col-span-12 sm:col-span-6 xl:col-span-4 flex flex-col gap-3">
                            <InfoBlock label="الاسم الكامل" value={client.name} />
                            <InfoBlock label="رقم الهاتف" value={client.phone} valueClassName='ltr-data block' />
                        </div>
                        <div className="col-span-12 sm:col-span-6 xl:col-span-4 flex flex-col gap-3">
                            <InfoBlock label="البريد الإلكتروني" value={client.email} />
                            <InfoBlock label="تاريخ الانضمام" value={format(new Date(client.joinedAt), 'yyyy-MM-dd')} />
                        </div>
                        <div className="col-span-12 sm:col-span-6 xl:col-span-4 flex flex-col gap-3">
                            <InfoBlock label="الحالة" value={statusMap[client.status]} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
