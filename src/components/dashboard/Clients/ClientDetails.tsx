import CardInfo from '@/components/shared/infos/CardInfo';
import IconDetail from '@/components/shared/infos/IconDetail';
import { InfoBlock } from '@/components/shared/infos/InfoBlock';
import { ClientRow, statusMap } from '@/types/dashboard/client';
import Link from 'next/link';
import { BiEdit } from 'react-icons/bi';
import { FaCalendarAlt, FaClipboardList } from 'react-icons/fa';
import DashboardSectionCard from '../DashboardSectionCard';
import { formatDate } from '@/utils/date';
import ClientStatusControl from './ClientStatusControl';
import Image from 'next/image';


type Props = {
    client: ClientRow;
};
const mockActivationDate = '2025-09-01';
export default function ClientDetails({ client }: Props) {

    return (
        <div className="grid grid-cols-1 2xl:grid-cols-6 gap-4 lg:gap-6 items-stretch">

            {/* Left Column */}
            <div className="h-full xl:col-span-2">
                <DashboardSectionCard className=' h-full'>

                    <div className="relative rounded-2xl bg-white p-6">

                        {/* ✏️ Edit Icon at Card Corner */}
                        <Link
                            href={`/dashboard/admin/clients/${client.id}/edit`}
                            className="absolute top-4 right-4 bg-white border border-gray-200 p-2 rounded-full shadow-sm hover:bg-gray-50 transition z-10"
                            title="تعديل العميل"
                        >
                            <BiEdit className="w-5 h-5 text-gray-600" />
                        </Link>

                        {/* Avatar */}
                        <div className="relative w-fit mx-auto">
                            <Image
                                src={client.image || '/users/default-user.png'}
                                alt={client.name}
                                width={80}
                                height={80}
                                className="rounded-full w-20 h-20 object-cover border"
                            />

                        </div>

                        {/* Name */}
                        <h5 className="text-xl font-semibold mt-5 text-center">{client.name}</h5>
                        {/* Status Ball */}
                        <div className='flex items-center justify-center border-b border-dashed py-2'>
                            <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-gray-200 shadow-sm">
                                <span
                                    className={`w-3 h-3 rounded-full border border-white ${client.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                                        }`}
                                    title={client.status === 'active' ? 'نشط' : 'موقوف'}
                                />
                                <span className="text-[10px] font-medium text-gray-700">
                                    {client.status === 'active' ? 'نشط' : 'موقوف'}
                                </span>
                            </div>
                        </div>
                    </div>

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
                    <ClientStatusControl currentStatus={client.status} client={client} />

                </DashboardSectionCard>
            </div>

            {/* Right Column */}
            <div className="h-full xl:col-span-4">
                <DashboardSectionCard className=' h-full'>
                    <h3 className="text-xl font-semibold mb-6">معلومات العميل</h3>

                    {/* Cards */}
                    <div className="flex flex-wrap gap-6 border-b pb-8 border-dashed">
                        <CardInfo
                            icon={<FaClipboardList className="text-[var(--primary)] w-10 h-10" />}
                            value={53}
                            label="إجمالي الحجوزات"
                        />
                        <CardInfo
                            icon={<FaCalendarAlt className="text-[var(--secondary-500)] w-10 h-10" />}
                            value={5}
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
                            <InfoBlock label="تاريخ الانضمام" value={formatDate(client.joinedAt)} />
                        </div>
                        <div className="col-span-12 sm:col-span-6 xl:col-span-4 flex flex-col gap-3">
                            <InfoBlock label="الحالة" value={statusMap[client.status]} />
                            {client.status === 'suspended' && (
                                <InfoBlock label="تاريخ التعليق" value={formatDate(mockActivationDate)} />
                            )}
                        </div>


                    </div>
                </DashboardSectionCard>
            </div>

        </div >
    );
}

