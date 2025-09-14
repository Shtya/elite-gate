'use client';

import React, { useState } from 'react';
import { Empty } from '@/components/shared/Empty';
import NotificationCard from '@/components/shared/NotificationCard';
import { NotificationType } from '@/types/global';


const initialNotifications = [
    {
        type: 'info' as NotificationType,
        title: 'تم استلام الحجز',
        description: 'لقد تلقينا طلب الحجز الخاص بك بنجاح. سيتم مراجعة التفاصيل والتواصل معك قريبًا.',
    },
    {
        type: 'done' as NotificationType,
        title: 'تم تأكيد الحجز',
        description: 'تم تأكيد الحجز الخاص بك. يمكنك الآن عرض تفاصيل الحجز من لوحة التحكم.',
    },
    {
        type: 'warn' as NotificationType,
        title: 'الملف الشخصي غير مكتمل',
        description: 'يرجى إكمال معلوماتك الشخصية لتتمكن من إجراء الحجوزات بشكل أسرع.',
    },
    {
        type: 'error' as NotificationType,
        title: 'فشل في تنفيذ الحجز',
        description: 'حدث خطأ أثناء محاولة تنفيذ الحجز. يرجى المحاولة مرة أخرى أو التواصل مع الدعم الفني.',
    },
];

export default function Notifications() {
    const [size, setSize] = useState(initialNotifications.length);

    const handleClose = () => {
        setSize((prev) => prev ? --prev : prev);
    };

    return (
        <>
            {size > 0 ?
                <div className='space-y-4'>

                    {initialNotifications.map((note, index) => (
                        <NotificationCard
                            key={index}
                            type={note.type}
                            title={note.title}
                            description={note.description}
                            onClose={() => handleClose()}
                        />
                    ))
                    }
                </div>
                : (
                    <Empty
                        className="mt-[20%]"
                        header="لا توجد إشعارات"
                        description="لم يتم العثور على أي إشعارات جديدة في الوقت الحالي. يرجى التحقق لاحقاً."
                    />
                )}
        </>
    );
}
