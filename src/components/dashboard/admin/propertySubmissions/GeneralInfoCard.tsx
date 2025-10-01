'use client';

import Card from '@/components/shared/Card';
import Popup from '@/components/shared/Popup';
import { propertySubmissionStatus, propertySubmissionStatusMap, propertySubmissionStatusStyle } from '@/constants/dashboard/admin/propertySubmissions/constants';
import { propertySubmissionFull } from '@/types/dashboard/property-submissions';
import { propertyTypeLabels } from '@/types/property';
import PropertySubmissionStatusToggle from './PropertySubmissionStatusToggle';
import { useState } from 'react';

type Props = { request: propertySubmissionFull };

export default function GeneralInfoCard({ request }: Props) {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <Card title="معلومات عامة">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><span className="font-medium">نوع العقار:</span> {propertyTypeLabels[request.propertyType]}</div>
                <div><span className="font-medium">سعر البيع:</span> {request.price.toLocaleString()} ريال</div>
                <div>
                    <span className="font-medium">الحالة:</span>{' '}
                    <span className={`px-3 py-1 rounded-full text-sm ${propertySubmissionStatusStyle[request.status]}`}>
                        {propertySubmissionStatusMap[request.status]}
                    </span>
                </div>
                <div><span className="font-medium">تاريخ الإنشاء:</span> {new Date(request.createdAt).toLocaleString('ar-EG')}</div>
            </div>
            <div className="mt-4">
                <button
                    onClick={() => setShowPopup(true)}
                    className="w-full px-4 py-2 rounded-md text-white bg-[var(--primary)] hover:bg-[var(--primary-600)]"
                >
                    تغيير حالة الطلب
                </button>
            </div>

            {/* ✅ Popup with PropertySubmissionStatusToggle */}
            <Popup show={showPopup} onClose={() => setShowPopup(false)}>
                <PropertySubmissionStatusToggle
                    requestId={request.id}
                    currentStatus={request.status as propertySubmissionStatus}
                    onConfirm={() => setShowPopup(false)}
                    onCancel={() => setShowPopup(false)}
                />
            </Popup>
        </Card>
    );
}
