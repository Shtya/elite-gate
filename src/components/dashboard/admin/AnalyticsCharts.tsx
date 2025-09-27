'use client'
import Card from '@/components/shared/Card'
import { TwoLineChart } from '@/components/shared/charts/TwoLineChart'
import { BarChart } from '@/components/shared/charts/BarChart'
import VisitsRegistrationsChart from './VisitsRegistrationsChart'
import { DoughnutChart } from '@/components/shared/charts/DoughnutChart'

interface AnalyticsChartsProps {
    visitsData?: {
        visits: number[]
        registrations: number[]
        labels: string[]
    }
}

export default function AnalyticsCharts({
    visitsData = {
        visits: [1200, 1500, 1800, 1600, 2000, 2200],
        registrations: [45, 52, 68, 55, 78, 85],
        labels: ['يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
    }
}: AnalyticsChartsProps) {
    return (
        <div className='flex flex-col xl:flex-row gap-4 xl:gap-6'>
            <Card className='xl:w-[calc(50%-12px)]' title='عدد الطلبات' subTitle='اخر 6 شهور'>
                <TwoLineChart
                    labels={['يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']}
                    data1={[12, 17, 20, 22, 35, 50]}   // الخط الأول (أزرق)
                    data2={[5, 2, 15, 3, 4, 10]}   // الخط الثاني (أخضر)
                    tooltiTitle='عدد الطلبات'
                    data1Label='الطلبات المكتمله'
                    data2Label='الطلبات غير المكتمله'
                    line1Color="#363aed"
                    line2Color="#37d279"
                    line1Gradient={{
                        from: 'rgba(54, 58, 237, 0.1)',
                        to: 'rgba(54, 58, 237, 0.45)',
                    }}
                    line2Gradient={{
                        from: 'rgba(55, 210, 121, 0.1)',
                        to: 'rgba(55, 210, 121, 0.45)',
                    }}
                />
            </Card>
            <Card className='xl:w-[calc(50%-12px)]' title='توزيع المشاريع' subTitle='حسب المدن'>
                <BarChart
                    labels={['مكة', 'جدة', 'الرياض', 'أبها', 'الطائف', 'المدينة المنورة', 'الدمام', 'حائل']}
                    label='عدد المشاريع'
                    data={[10, 32, 30, 60, 50, 20, 45, 30,]}
                />
            </Card>
        </div>
    )
}

export function VisitsAnalyticsCharts({
    visitsData = {
        visits: [1200, 1500, 1800, 1600, 2000, 2200],
        registrations: [45, 52, 68, 55, 78, 85],
        labels: ['يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
    }
}: AnalyticsChartsProps) {
    return (
        <div className='flex flex-col xl:flex-row gap-4 xl:gap-6'>
            <Card className='xl:w-[calc(50%-12px)]' title='عدد الزيارات والتسجيلات' subTitle='اخر 6 شهور'>
                <VisitsRegistrationsChart data={visitsData} />
            </Card>
            <Card className='xl:w-[calc(50%-12px)]' title='مصادر الزيارات' subTitle='اخر 30 يوم'>
                <div className='flex justify-center items-center h-full'>
                    <DoughnutChart
                        data={[350, 500, 200, 150]}
                        labels={['مباشر', 'محركات البحث', 'وسائل التواصل', 'إحالات']}
                        colors={['rgba(59, 130, 246, 0.9)', 'rgba(16, 185, 129, 0.9)', 'rgba(245, 158, 11, 0.9)', 'rgba(239, 68, 68, 0.9)',]}
                    />
                </div>
            </Card>
        </div>
    )
}
