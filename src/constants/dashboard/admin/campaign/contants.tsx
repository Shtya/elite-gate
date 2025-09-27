import { FilterConfig, SortConfig, TableColumn } from '@/types/components/table'
import { Campaign, CampaignStatus } from '@/types/campaign'
import { formatDate } from '@/utils/date'

import { FaEnvelope, FaWhatsapp } from "react-icons/fa"

export const getTargetChannelIcon = (channel: string) => {
    switch (channel) {
        case 'email':
            return <FaEnvelope className="w-4 h-4" />
        case 'whatsapp':
            return <FaWhatsapp className="w-4 h-4" />
        default:
            return <FaEnvelope className="w-4 h-4" />
    }
}

export const getTargetAudienceText = (audience: string) => {
    switch (audience) {
        case 'all_users':
            return 'جميع المستخدمين'
        case 'agents':
            return 'الوسطاء العقاريين'
        case 'marketers':
            return 'المسوقين'
        case 'clients':
            return 'العملاء'
        case 'new_clients':
            return 'العملاء الجدد'
        default:
            return audience
    }
}

export const getRunTypeText = (runType: string) => {
    switch (runType) {
        case 'once':
            return 'مرة واحدة'
        case 'recurring':
            return 'متكرر'
        default:
            return runType
    }
}

export const getFrequencyText = (frequency: string) => {
    switch (frequency) {
        case 'daily':
            return 'يومياً'
        case 'every_2_days':
            return 'كل يومين'
        case 'weekly':
            return 'أسبوعياً'
        case 'every_2_weeks':
            return 'كل أسبوعين'
        case 'monthly':
            return 'شهرياً'
        default:
            return frequency
    }
}

export const getStatusColor = (status: string) => {
    switch (status) {
        case 'draft':
            return 'text-gray-600 bg-gray-100'
        case 'scheduled':
            return 'text-blue-600 bg-blue-100'
        case 'running':
            return 'text-green-600 bg-green-100'
        case 'completed':
            return 'text-purple-600 bg-purple-100'
        case 'paused':
            return 'text-yellow-600 bg-yellow-100'
        case 'Cancelled':
            return 'text-red-600 bg-red-100'
        default:
            return 'text-gray-600 bg-gray-100'
    }
}

export const getStatusText = (status: string) => {
    switch (status) {
        case 'draft':
            return 'مسودة'
        case 'scheduled':
            return 'مجدولة'
        case 'running':
            return 'قيد التشغيل'
        case 'completed':
            return 'مكتملة'
        case 'paused':
            return 'متوقفة'
        case 'Cancelled':
            return 'ملغية'
        default:
            return status
    }
}

// Campaign Status Map
export const campaignStatusMap: Record<CampaignStatus, string> = {
    draft: 'مسودة',
    scheduled: 'مجدولة',
    running: 'قيد التشغيل',
    completed: 'مكتملة',
    paused: 'متوقفة',
    Cancelled: 'ملغية'
}

// Campaign Status Class Map
export const campaignStatusClassMap: Record<CampaignStatus, string> = {
    draft: 'bg-gray-100 text-gray-600',
    scheduled: 'bg-blue-100 text-blue-600',
    running: 'bg-green-100 text-green-600',
    completed: 'bg-purple-100 text-purple-600',
    paused: 'bg-yellow-100 text-yellow-600',
    Cancelled: 'bg-red-100 text-red-600'
}

// Sort Configuration
export const campaignSortConfig: SortConfig = {
    sortFields: [
        { label: 'اسم الحملة', value: 'campaignName' },
        { label: 'الحالة', value: 'status' },
        { label: 'تاريخ الإنشاء', value: 'createdAt' },
        { label: 'المستقبلون الفعليون', value: 'actualRecipients' },
        { label: 'المشاهدات', value: 'views' }
    ],
    defaultSort: 'createdAt'
}

// Filter Configuration
export const campaignFilters: FilterConfig[] = [
    {
        type: 'select',
        label: 'الحالة',
        key: 'status',
        options: [
            { label: 'الكل', value: 'all' },
            { label: 'مسودة', value: 'draft' },
            { label: 'مجدولة', value: 'scheduled' },
            { label: 'قيد التشغيل', value: 'running' },
            { label: 'متوقفة', value: 'paused' },
            { label: 'مكتملة', value: 'completed' },
            { label: 'ملغية', value: 'Cancelled' }
        ],
        default: 'all'
    },
    {
        type: 'select',
        label: 'الجمهور المستهدف',
        key: 'targetAudience',
        options: [
            { label: 'الكل', value: 'all' },
            { label: 'جميع المستخدمين', value: 'all_users' },
            { label: 'الوسطاء العقاريين', value: 'agents' },
            { label: 'المسوقين', value: 'marketers' },
            { label: 'العملاء', value: 'clients' },
            { label: 'العملاء الجدد', value: 'new_clients' }
        ],
        default: 'all'
    },
    {
        type: 'dateRange',
        label: 'تاريخ الإنشاء',
        key: 'createdAt'
    }
]

// Table Columns
export const campaignColumns: TableColumn<Campaign>[] = [
    {
        key: 'campaignName',
        label: 'اسم الحملة',
        cell: (val) => (
            <span className="font-medium text-gray-800">{val}</span>
        )
    },
    {
        key: 'targetAudience',
        label: 'الجمهور المستهدف',
        cell: (val) => (
            <span className="text-sm text-gray-600">
                {getTargetAudienceText(val as string)}
            </span>
        )
    },
    {
        key: 'targetChannel',
        label: 'القناة',
        cell: (val) => (
            <div className="flex items-center gap-2">
                {getTargetChannelIcon(val as string)}
                <span className="text-sm text-gray-600">
                    {val === 'email' ? 'البريد الإلكتروني' : 'واتساب'}
                </span>
            </div>
        )
    },
    {
        key: 'actualRecipients',
        label: 'المستقبلون الفعليون',
        cell: (val) => (
            <span className="font-medium text-gray-800">
                {val?.toLocaleString() || '0'}
            </span>
        )
    },
    {
        key: 'views',
        label: 'المشاهدات',
        cell: (val) => (
            <span className="font-medium text-gray-800">
                {val?.toLocaleString() || '0'}
            </span>
        )
    },
    {
        key: 'responses',
        label: 'الردود',
        cell: (val) => (
            <span className="font-medium text-gray-800">
                {val?.toLocaleString() || '0'}
            </span>
        )
    },
    {
        key: 'runType',
        label: 'النوع',
        cell: (val) => (
            <span className="text-sm text-gray-600">
                {getRunTypeText(val as string)}
            </span>
        )
    },
    {
        key: 'startDate',
        label: 'مدة الحملة',
        cell: (val, row) => {
            const campaign = row as Campaign
            if (campaign.runType === 'once' && campaign.runOnceDateTime) {
                return (
                    <span className="text-sm text-gray-600">
                        {formatDate(campaign.runOnceDateTime)}
                    </span>
                )
            } else if (campaign.runType === 'recurring' && campaign.startDate && campaign.endDate) {
                return (
                    <div className="text-sm text-gray-600">
                        <div>{formatDate(campaign.startDate)}</div>
                        <div className="text-xs text-gray-400">إلى</div>
                        <div>{formatDate(campaign.endDate)}</div>
                    </div>
                )
            }
            return <span className="text-sm text-gray-400">غير محدد</span>
        }
    },
    {
        key: 'status',
        label: 'الحالة',
        cell: (val) => {
            const status = val as CampaignStatus
            return (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${campaignStatusClassMap[status]}`}>
                    {campaignStatusMap[status]}
                </span>
            )
        }
    }
]

// Mock Campaign Data
export const mockCampaigns: Campaign[] = [
    {
        id: '1',
        campaignName: 'حملة الصيف 2024',
        campaignTitle: 'عروض الصيف الحصرية',
        campaignDescription: 'احصل على أفضل العروض العقارية في الصيف',
        campaignImages: [],
        targetChannel: 'email',
        targetAudience: 'clients',
        runType: 'once',
        runOnceDateTime: '2024-07-15T10:00:00Z',
        status: 'scheduled',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        actualRecipients: 1250,
        views: 890,
        responses: 45
    },
    {
        id: '2',
        campaignName: 'ترحيب بالعملاء الجدد',
        campaignTitle: 'مرحباً بك في منصتنا',
        campaignDescription: 'رسالة ترحيب للعملاء الجدد',
        campaignImages: [],
        targetChannel: 'whatsapp',
        targetAudience: 'new_clients',
        runType: 'recurring',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        runFrequency: 'daily',
        runTime: '09:00',
        status: 'running',
        createdAt: '2023-12-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        actualRecipients: 850,
        views: 720,
        responses: 32
    },
    {
        id: '3',
        campaignName: 'تحديثات الوسطاء',
        campaignTitle: 'آخر التحديثات',
        campaignDescription: 'معلومات مهمة للوسطاء العقاريين',
        campaignImages: [],
        targetChannel: 'email',
        targetAudience: 'agents',
        runType: 'recurring',
        startDate: '2024-01-01',
        endDate: '2024-06-30',
        runFrequency: 'weekly',
        runTime: '08:00',
        status: 'paused',
        createdAt: '2023-11-20T00:00:00Z',
        updatedAt: '2024-01-10T00:00:00Z',
        actualRecipients: 320,
        views: 280,
        responses: 15
    }
]
