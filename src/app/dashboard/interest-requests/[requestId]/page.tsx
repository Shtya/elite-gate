import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BiListUl } from 'react-icons/bi';

import DashboardHeaderTitle from '@/components/dashboard/DashboardHeaderTitle';
import DownloadContent from '@/components/shared/DownloadContent';
import InterestRequestDetails from '@/components/dashboard/InterestRequests/InterestRequestDetails';
import { InterestRequestFull } from '@/types/dashboard/interest-requests';

;

export const mockInterestRequestFull: InterestRequestFull = {
    id: 301,
    requesterName: "Dana Bint Shakir",
    relationshipType: "مفوض",
    propertyType: "villa",
    price: 1200000,
    status: "published",
    address: "حي البساتين، جدة، المملكة العربية السعودية",
    createdAt: "2025-05-23T10:48:00Z",

    attachments: [
        {
            url: "/uploads/request-301/property-requests-data.pdf",
            name: "بيانات_طلبات_العقار.dbf",
            type: "application/dbf",
            isPrimary: true,
        },
        {
            url: "/uploads/request-301/property-owners-list.pdf",
            name: "قائمة_ملاك_العقار.dbf",
            type: "application/dbf",
            isPrimary: false,
        },
        {
            url: "/uploads/request-301/property-financials.xlsx",
            name: "البيانات_المالية_للطلب.xlsx",
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            isPrimary: false,
        },
    ],


    authorizationDoc: {
        url: "/uploads/request-301/authorization.pdf",
        name: "تفويض رسمي.pdf",
        type: "application/pdf",
        isPrimary: false,
    },

    specifications: {
        area: { name: "المساحة", value: "350 م²" },
        rooms: { name: "عدد الغرف", value: "5" },
        bathrooms: { name: "عدد الحمامات", value: "4" },
        features: { name: "المميزات", value: ["مسبح", "حديقة", "موقف سيارات"] },
    },

    publishedProperty: {
        id: 501,
        title: "فلل البستان – واجهات حجرية",
        type: "villa",
        image: "/main/projects/property-2.webp",
    },
};

type Props = {
    params: {
        requestId: string; // dynamic route params are always strings
    };
};

export default async function InterestRequestDetailsPage({ params }: Props) {
    const { requestId } = params;

    // simulate fetch delay
    await new Promise((r) => setTimeout(r, 300));



    return (
        <>
            <DashboardHeaderTitle path={['طلبات الاهتمام', `تفاصيل الطلب - ${mockInterestRequestFull.requesterName}`]}>
                <Link className="btn-primary" href="/dashboard/interest-requests">
                    <BiListUl /> عرض جميع الطلبات
                </Link>
            </DashboardHeaderTitle>

            <InterestRequestDetails request={mockInterestRequestFull} />
        </>
    );
}
