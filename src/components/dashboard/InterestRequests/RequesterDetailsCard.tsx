'use client';

import Card from '@/components/shared/Card';
import { InterestRequestFull } from '@/types/dashboard/interest-requests';

type Props = { request: InterestRequestFull };

export default function RequesterDetailsCard({ request }: Props) {
    return (
        <Card title="بيانات مقدم الطلب">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><span className="font-medium">الاسم:</span> {request.requesterName}</div>
                <div><span className="font-medium">نوع العلاقة:</span> {request.relationshipType}</div>
                <div><span className="font-medium">العنوان:</span> {request.address}</div>
            </div>
        </Card>
    );
}
