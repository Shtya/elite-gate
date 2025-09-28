'use client'
import { FaCalendarAlt, FaUser, FaUserTie, FaClock, FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaBellSlash } from 'react-icons/fa'

interface AppointmentNotification {
    id: string
    clientName: string
    agentName?: string
    status: 'confirmed' | 'pending' | 'cancelled' | 'completed'
    appointmentDate: string
    updatedAt: string
    appointmentNumber: string
}

interface NotificationsCardProps {
    notifications: AppointmentNotification[]
}

const getStatusText = (status: string) => {
    switch (status) {
        case 'confirmed':
            return 'مؤكد'
        case 'pending':
            return 'قيد الانتظار'
        case 'cancelled':
            return 'ملغي'
        case 'completed':
            return 'مكتمل'
        default:
            return 'غير محدد'
    }
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'confirmed':
            return 'text-green-600 bg-green-50'
        case 'pending':
            return 'text-yellow-600 bg-yellow-50'
        case 'cancelled':
            return 'text-red-600 bg-red-50'
        case 'completed':
            return 'text-blue-600 bg-blue-50'
        default:
            return 'text-gray-600 bg-gray-50'
    }
}

export default function NotificationsCard({ notifications }: NotificationsCardProps) {
    if (notifications.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <FaBellSlash className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-gray-500">لا توجد إشعارات</p>
            </div>
        );
    }

    return (
        <div className="space-y-3 max-h-[900px] overflow-y-auto">
            {notifications.map((notification) => (
                <div key={notification.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
                    {/* Header with appointment number and status */}
                    <div className="flex items-center justify-between mb-4">

                        <div className="flex items-center gap-2">
                            <FaCalendarAlt className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold text-gray-800">
                                موعد #{notification.appointmentNumber}
                            </span>
                        </div>
                        <div className={`px-3 py-1 w-fit  rounded-full text-xs font-medium ${getStatusColor(notification.status)}`}>
                            {getStatusText(notification.status)}
                        </div>
                    </div>

                    {/* Main content with left and right sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Left side - Client and Agent info */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <FaUser className="w-3 h-3 text-gray-500" />
                                <span className="text-sm text-gray-600">العميل:</span>
                                <span className="text-sm font-medium text-gray-800">{notification.clientName}</span>
                            </div>

                            {notification.agentName && <div className="flex items-center gap-2">
                                <FaUserTie className="w-3 h-3 text-gray-500" />
                                <span className="text-sm text-gray-600">الوسيط:</span>
                                <span className="text-sm font-medium text-gray-800">{notification.agentName}</span>
                            </div>}
                        </div>

                        {/* Right side - Date and update info */}
                        <div className="flex flex-col gap-3 justify-start">

                            <div className="flex items-center gap-2  md:justify-end">
                                <FaClock className="w-3 h-3 text-gray-500" />
                                <span className="text-sm text-gray-600">تاريخ الموعد:</span>
                                <span className="text-sm font-medium text-gray-800">{notification.appointmentDate}</span>
                            </div>

                            <div className="flex items-center gap-2 md:justify-end">
                                <span className="text-xs text-gray-500">تاريخ التحديث: {notification.updatedAt}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

// Default notifications data
export const defaultNotifications: AppointmentNotification[] = [
    {
        id: '1',
        clientName: 'أحمد محمد',
        agentName: 'فاطمة أحمد',
        status: 'confirmed',
        appointmentDate: '2024-01-15',
        updatedAt: '2024-01-10 14:30',
        appointmentNumber: 'APT-001'
    },
    {
        id: '2',
        clientName: 'سارة حسن',
        agentName: 'محمد علي',
        status: 'pending',
        appointmentDate: '2024-01-16',
        updatedAt: '2024-01-11 09:15',
        appointmentNumber: 'APT-002'
    },
    {
        id: '3',
        clientName: 'علي أحمد',
        agentName: 'نور الدين',
        status: 'completed',
        appointmentDate: '2024-01-14',
        updatedAt: '2024-01-14 16:45',
        appointmentNumber: 'APT-003'
    },
    {
        id: '4',
        clientName: 'مريم خالد',
        agentName: 'أحمد محمد',
        status: 'cancelled',
        appointmentDate: '2024-01-13',
        updatedAt: '2024-01-12 11:20',
        appointmentNumber: 'APT-004'
    }
]



export const agetnDefaultNotifications: AppointmentNotification[] = [
    {
        id: '1',
        clientName: 'أحمد محمد',
        status: 'confirmed',
        appointmentDate: '2024-01-15',
        updatedAt: '2024-01-10 14:30',
        appointmentNumber: 'APT-001'
    },
    {
        id: '2',
        clientName: 'سارة حسن',
        status: 'confirmed',
        appointmentDate: '2024-01-16',
        updatedAt: '2024-01-11 09:15',
        appointmentNumber: 'APT-002'
    },
    {
        id: '3',
        clientName: 'علي أحمد',
        status: 'completed',
        appointmentDate: '2024-01-14',
        updatedAt: '2024-01-14 16:45',
        appointmentNumber: 'APT-003'
    },
    {
        id: '4',
        clientName: 'مريم خالد',
        status: 'cancelled',
        appointmentDate: '2024-01-13',
        updatedAt: '2024-01-12 11:20',
        appointmentNumber: 'APT-004'
    }
]
