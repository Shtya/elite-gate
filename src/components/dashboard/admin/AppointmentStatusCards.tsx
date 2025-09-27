'use client'
import StatCard from '@/components/shared/charts/StatChart'

interface AppointmentStatusCardsProps {
    data?: {
        pending: number
        assigned: number
        confirmed: number
        inProgress: number
        completed: number
        cancelled: number
    }
}

export default function AppointmentStatusCards({
    data = {
        pending: 12,
        assigned: 13,
        confirmed: 22,
        inProgress: 32,
        completed: 12,
        cancelled: 10
    }
}: AppointmentStatusCardsProps) {
    return (
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
            <StatCard
                displayValue={data.pending.toString()}
                label="قيد الانتظار"
                ringColorClass="border-[#FFD600]" // vivid yellow
                className="col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-2"
            />
            <StatCard
                displayValue={data.assigned.toString()}
                label="تم التعيين"
                ringColorClass="border-[#03A9F4]" // strong blue
                className="col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-2"
            />
            <StatCard
                displayValue={data.confirmed.toString()}
                label="مؤكد"
                ringColorClass="border-[#4CAF50]" // bold green
                className="col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-2"
            />
            <StatCard
                displayValue={data.inProgress.toString()}
                label="قيد التنفيذ"
                ringColorClass="border-[#3F51B5]" // deep indigo
                className="col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-2"
            />
            <StatCard
                displayValue={data.completed.toString()}
                label="مكتمل"
                ringColorClass="border-[#009688]" // teal
                className="col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-2"
            />
            <StatCard
                displayValue={data.cancelled.toString()}
                label="ملغي | لم يحضر"
                ringColorClass="border-[#F44336]" // solid red
                className="col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-2"
            />
        </div>
    )
}
