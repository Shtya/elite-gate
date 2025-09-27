'use client'
import Card from '@/components/shared/Card'
import CardInfo from '@/components/shared/infos/CardInfo'
import { FaCalendarAlt, FaProjectDiagram, FaUserTie, FaUserFriends } from 'react-icons/fa'

interface StatisticsCardsProps {
    data?: {
        totalAppointments: number
        totalProjects: number
        totalAgents: number
        totalUsers: number
    }
}

export default function StatisticsCards({
    data = {
        totalAppointments: 150,
        totalProjects: 60,
        totalAgents: 10,
        totalUsers: 65
    }
}: StatisticsCardsProps) {
    return (
        <Card title="إحصائيات عامة">
            <div className="grid grid-cols-12 gap-4 lg:gap-6">
                <CardInfo
                    icon={
                        <div className="rounded-full bg-primary p-4">
                            <FaCalendarAlt className="text-white text-3xl" />
                        </div>
                    }
                    value={data.totalAppointments}
                    title="المواعيد"
                    label='نسبة الاكتمال 70%'
                    className="!bg-primary-light col-span-12 sm:col-span-6 xl:col-span-4 2xl:col-span-3"
                />
                <CardInfo
                    icon={
                        <div className="rounded-full bg-secondary p-4">
                            <FaProjectDiagram className="text-white text-3xl " />
                        </div>
                    }
                    value={data.totalProjects}
                    title="المشاريع"
                    label='شقق: 20 | فلل: 35 | أراضي: 5'
                    className="!bg-secondary-light  col-span-12 sm:col-span-6 xl:col-span-4 2xl:col-span-3"
                />
                <CardInfo
                    icon={
                        <div className="rounded-full bg-tertiary p-4">
                            <FaUserTie className="text-white text-3xl" />
                        </div>
                    }
                    value={data.totalAgents}
                    title="الوسطاء العقاريين"
                    label='نشط: 8 (80%)'
                    className="!bg-tertiary-300  col-span-12 sm:col-span-6 xl:col-span-4 2xl:col-span-3"
                />
                <CardInfo
                    icon={
                        <div className="rounded-full bg-primary p-4">
                            <FaUserFriends className="text-white text-3xl" />
                        </div>
                    }
                    value={data.totalUsers}
                    title="المستخدمين"
                    label='نشط: 60 (92%)'
                    className="!bg-primary-light  col-span-12 sm:col-span-6 xl:col-span-4 2xl:col-span-3"
                />
            </div>
        </Card>
    )
}
