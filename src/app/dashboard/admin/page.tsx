
import DashboardHeaderTitle from '@/components/dashboard/DashboardHeaderTitle';
import Card from '@/components/shared/Card';
import StatisticsCards from '@/components/dashboard/admin/StatisticsCards';
import AppointmentStatusCards from '@/components/dashboard/admin/AppointmentStatusCards';
import AnalyticsCharts, { VisitsAnalyticsCharts } from '@/components/dashboard/admin/AnalyticsCharts';
import AgentPerformanceCard from '@/components/dashboard/admin/AgentPerformanceCard';
import AverageRatingsCard, { defaultRatings } from '@/components/dashboard/admin/AverageRatingsCard';
import NotificationsCard, { defaultNotifications } from '@/components/dashboard/admin/NotificationsCard';

export default function AdminDashboard() {
    // Mock data for agents
    const agents = [
        {
            id: '3',
            name: 'محمد علي',
            image: '/users/user-3.webp',
            totalAppointments: 30,
            completedAppointments: 28
        },
        {
            id: '2',
            name: 'فاطمة أحمد',
            image: '/users/user-2.webp',
            totalAppointments: 18,
            completedAppointments: 15
        },
        {
            id: '4',
            name: 'سارة حسن',
            image: '/users/user-4.webp',
            totalAppointments: 22,
            completedAppointments: 18
        },
        {
            id: '1',
            name: 'أحمد محمد',
            image: '/users/user-1.jpg',
            totalAppointments: 25,
            completedAppointments: 20
        },
    ]

    return (
        <div>
            <DashboardHeaderTitle path={['لوحة المعلومات']} />
            <div className='space-y-4 lg:pace-y-6'>
                {/* Statistics Cards */}
                <StatisticsCards />

                {/* Appointment Status Cards */}
                <AppointmentStatusCards />

                {/* Analytics Charts - Orders and Projects Distribution */}
                <AnalyticsCharts />

                {/* Visits and Registrations Analytics */}
                <VisitsAnalyticsCharts />

                {/* Project Sources and Types */}
                {/* <ProjectCharts /> */}

                {/* Notifications */}
                <div className='flex flex-col xl:flex-row gap-4 xl:gap-6'>
                    <Card title='متوسط التقييمات' className='xl:w-[calc(50%-12px)]' subTitle='حسب العملاء'>
                        <AverageRatingsCard ratings={defaultRatings} />
                    </Card>
                    <Card title='أداء الوسطاء العقاريين' className='xl:w-[calc(50%-12px)]' subTitle='اخر 30 يوم'>
                        <AgentPerformanceCard agents={agents} />
                    </Card>
                </div>

                {/* Ratings */}
                <div className='flex flex-col xl:flex-row gap-4 xl:gap-6'>

                    <div className='xl:w-[calc(50%-12px)]'></div>
                </div>
                <Card title='إشعارات المواعيد' >
                    <NotificationsCard notifications={defaultNotifications} />
                </Card>
            </div>
        </div>
    )
}
