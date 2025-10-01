import DashboardHeaderTitle from "@/components/dashboard/DashboardHeaderTitle";
import PropertyRequestForm, { PropertyRequestFormValues } from "@/components/main/addProperty/PropertyRequestForm";
import CenteredContainer from "@/components/shared/CenteredContainer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BiGroup, BiUser } from "react-icons/bi";



export const mockPropertyRequests: PropertyRequestFormValues[] = [
    {
        requesterName: 'أحمد علي',
        relationshipType: 'authorized_representative',
        askedPrice: 950000,
        attachments: [
            {
                url: "/uploads/request-301/property-requests-data.pdf",
                name: "بيانات_طلبات_العقار.dbf",
                type: "application/dbf",
            },
            {
                url: "/uploads/request-301/property-owners-list.pdf",
                name: "قائمة_ملاك_العقار.dbf",
                type: "application/dbf",
            },
            {
                url: "/uploads/request-301/property-financials.xlsx",
                name: "البيانات_المالية_للطلب.xlsx",
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            },
        ],
        propertyType: 'villa',
        address: 'شارع النصر، القاهرة',
        specifications: {
            rooms: { name: 'عدد الغرف', value: '4' },
            bathrooms: { name: 'عدد الحمامات', value: '3' },
            area: { name: 'المساحة', value: '250م²' },
        },
        authorizationDoc: {
            url: "/uploads/request-301/authorization.pdf",
            name: "تفويض رسمي.pdf",
            type: "application/pdf",
        },

    },
];



type Props = {
    params: { requestId: string };
};

export default async function EditPropertyRequestPage({ params }: Props) {
    // const requestId = Number(params.requestId);
    const request = mockPropertyRequests[0];

    await new Promise((r) => setTimeout(r, 300)); // simulate loading

    if (!request) {
        notFound();
    }

    return (
        <div>
            <DashboardHeaderTitle path={['طلبات الاهتمام', `تعديل بيانات طلب: ${request.requesterName}`]}>
                <div className="flex gap-4 flex-wrap">
                    <Link className="btn-primary" href={`/dashboard/admin/property-submissions/1`}>
                        <BiUser /> صفحة الطلب
                    </Link>
                    <Link className="btn-primary" href="/dashboard/admin/property-submissions">
                        <BiGroup /> عرض جميع الطلبات
                    </Link>
                </div>

            </DashboardHeaderTitle>
            <CenteredContainer>
                <PropertyRequestForm defaultValues={request} requestId={1} />
            </CenteredContainer>
        </div>
    );
}