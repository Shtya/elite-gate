import DashboardSectionCard from '@/components/dashboard/DashboardSectionCard';
import CardInfo from '@/components/shared/infos/CardInfo';
import IconDetail from '@/components/shared/infos/IconDetail';
import { InfoBlock } from '@/components/shared/infos/InfoBlock';
import { AgentRow, agentStatusMap } from '@/types/dashboard/agent';
import Link from 'next/link';
import { BiEdit } from 'react-icons/bi';
import { FaCalendarAlt, FaClipboardList, FaDollarSign, FaCheckCircle } from 'react-icons/fa';
import { formatDate } from '@/utils/date';
import AgentStatusControl from './AgentStatusControl';
import FallbackImage from '@/components/shared/FallbackImage';

type Props = {
    agent: AgentRow;
};

export default function AgentDetails({ agent }: Props) {
    // Mocked stats (replace with real calculations later)
    const totalBookings = 120;
    const bookingsThisMonth = 12;
    const completedThisMonth = 9;
    const totalEarnings = 25000; // e.g. SAR

    return (
        <div className="grid grid-cols-1 2xl:grid-cols-6 gap-4 lg:gap-6 items-stretch">
            {/* Left Column */}
            <div className="h-full xl:col-span-2">
                <DashboardSectionCard className="h-full">
                    <div className="relative rounded-2xl bg-white p-6">
                        <Link
                            href={`/dashboard/admin/agents/${agent.id}/edit`}
                            className="absolute top-4 right-4 bg-white border border-gray-200 p-2 rounded-full shadow-sm hover:bg-gray-50 transition z-10"
                            title="تعديل الوسيط"
                        >
                            <BiEdit className="w-5 h-5 text-gray-600" />
                        </Link>

                        <div className="relative w-fit mx-auto">
                            <FallbackImage
                                src={agent.image}
                                alt={agent.name}
                                width={80}
                                height={80}
                                className="rounded-full w-20 h-20 object-cover border"
                            />
                        </div>

                        <h5 className="text-xl font-semibold mt-5 text-center">{agent.name}</h5>

                        <div className="flex items-center justify-center border-b border-dashed py-2">
                            <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-gray-200 shadow-sm">
                                <span
                                    className={`w-3 h-3 rounded-full border border-white ${agent.status === 'active'
                                        ? 'bg-green-500'
                                        : agent.status === 'pending'
                                            ? 'bg-yellow-500'
                                            : agent.status === 'rejected'
                                                ? 'bg-gray-500'
                                                : 'bg-red-500'
                                        }`}
                                    title={agentStatusMap[agent.status]}
                                />
                                <span className="text-[10px] font-medium text-gray-700">
                                    {agentStatusMap[agent.status]}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-6 space-y-4">
                        <IconDetail
                            icon={<FaClipboardList className="text-[var(--primary)] w-6 h-6" />}
                            label="رقم الهاتف"
                            value={agent.phone}
                            href={`tel:${agent.phone}`}
                            className="ltr-data block"
                        />
                        <IconDetail
                            icon={<FaCalendarAlt className="text-[var(--secondary-500)] w-6 h-6" />}
                            label="البريد الإلكتروني"
                            value={agent.email}
                            href={`mailto:${agent.email}`}
                        />
                    </div>

                    <AgentStatusControl currentStatus={agent.status} agent={agent} />
                </DashboardSectionCard>
            </div>

            {/* Right Column */}
            <div className="h-full xl:col-span-4">
                <DashboardSectionCard className="h-full">
                    <h3 className="text-xl font-semibold mb-6">إحصائيات الوسيط</h3>

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
                        <CardInfo
                            icon={<FaCheckCircle className="text-green-600 w-10 h-10" />}
                            value={completedThisMonth}
                            label="المكتملة هذا الشهر"
                        />
                        <CardInfo
                            icon={<FaDollarSign className="text-yellow-600 w-10 h-10" />}
                            value={`${totalEarnings.toLocaleString()} ر.س`}
                            label="إجمالي الأرباح"
                        />
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-12 gap-4 mt-6">
                        <div className="col-span-12 sm:col-span-6 xl:col-span-4 flex flex-col gap-3">
                            <InfoBlock label="الاسم الكامل" value={agent.name} />
                            <InfoBlock label="رقم الهاتف" value={agent.phone} valueClassName="ltr-data block" />
                        </div>
                        <div className="col-span-12 sm:col-span-6 xl:col-span-4 flex flex-col gap-3">
                            <InfoBlock label="البريد الإلكتروني" value={agent.email} />
                            <InfoBlock label="تاريخ الانضمام" value={formatDate(agent.joinedAt)} />
                        </div>
                        <div className="col-span-12 sm:col-span-6 xl:col-span-4 flex flex-col gap-3">
                            <InfoBlock label="الحالة" value={agentStatusMap[agent.status]} />
                        </div>
                    </div>
                </DashboardSectionCard>
            </div>
        </div>
    );
}
