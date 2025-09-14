import { BookingStatus } from "@/types/global";

export const bookingStatusMap: Record<BookingStatus, string> = {
    pending: 'قيد الانتظار',
    assigned: 'تم التعيين',
    confirmed: 'مؤكد',
    in_progress: 'قيد التنفيذ',
    completed: 'مكتمل',
    cancelled: 'ملغي',
    no_show: 'لم يحضر',
};
