import InfoCell from "@/components/shared/InfoCell";
import { FilterConfig, SortConfig, TableColumn } from "@/types/components/Table";
import { InterestRequestRow } from "@/types/dashboard/interest-requests";
import { getDefaultProjectpath } from "@/utils/appointment";
import { projectTypeColors } from "../property.tsx/constants";
import { MiniProject, PropertyType, propertyTypeLabels } from "@/types/property";

// types/dashboard/interest-requests.ts
export type InterestRequestStatus =
    | 'pending_review'
    | 'pending_inspection'
    | 'inspected'
    | 'rejected'
    | 'published';

// constants/dashboard/interest-requests/constants.ts
export const interestRequestStatusMap: Record<InterestRequestStatus, string> = {
    pending_review: 'قيد المراجعة',
    pending_inspection: 'قيد المعاينة',
    inspected: 'تمت المعاينة',
    rejected: 'مرفوض',
    published: 'منشور',
};

export const interestRequestStatusStyle: Record<InterestRequestStatus, string> = {
    pending_review: 'bg-[#FFF8E1] text-[#9C6B00]',
    pending_inspection: 'bg-[#E6F4FF] text-[#0369A1]',
    inspected: 'bg-[#E9FBEA] text-[#1B7B3A]',
    rejected: 'bg-[#FFF0F0] text-[#BE6464]',
    published: 'bg-[#EBFBF2] text-[var(--secondary-500)]',
};

export const interestRequestFilters: FilterConfig[] = [
    {
        type: 'select',
        key: 'status',
        label: 'الحالة',
        options: [
            { label: 'الكل', value: 'all' },
            { label: 'قيد المراجعة', value: 'pending_review' },
            { label: 'قيد المعاينة', value: 'pending_inspection' },
            { label: 'تمت المعاينة', value: 'inspected' },
            { label: 'مرفوض', value: 'rejected' },
            { label: 'منشور', value: 'published' },
        ],
        default: 'all',
    },
    {
        type: 'dateRange',
        key: 'createdAt',
        label: 'تاريخ الإنشاء',
    },
    {
        type: 'select',
        key: 'propertyType',
        label: 'نوع العقار',
        default: 'all',
        options: [
            { label: 'الكل', value: 'all' },
            { label: 'شقة', value: 'شقة' },
            { label: 'فيلا', value: 'فيلا' },
            { label: 'أرض', value: 'أرض' },
        ],
    },
];


export const interestRequestSortConfig: SortConfig = {
    sortFields: [
        { label: 'اسم مقدم الطلب', value: 'requesterName' },
        { label: 'نوع العقار', value: 'propertyType' },
        { label: 'الحالة', value: 'status' },
        { label: 'تاريخ الإنشاء', value: 'createdAt' },
    ],
    defaultSort: 'createdAt',
};



export const interestRequestColumns: TableColumn<InterestRequestRow>[] = [
    { key: 'requesterName', label: 'اسم مقدم الطلب' },
    { key: 'relationshipType', label: 'نوع العلاقة' },
    { key: 'propertyType', label: 'نوع العقار', cell: (val: PropertyType) => <span>{propertyTypeLabels[val]}</ span > },
    {
        key: 'price',
        label: 'سعر البيع',
        cell: (val: number) => <span>{val.toLocaleString()} ريال</ span >,
    },
    {
        key: 'publishedProperty',
        label: 'العقار المنشور',
        cell: (val: MiniProject | undefined, row?: InterestRequestRow) => {
            if (row?.status !== 'published' || !val) {
                return <span className="text-xs text-gray-400">—</span>;
            }

            const imageSrc =
                typeof val.image === 'string' && val.image.trim() !== ''
                    ? val.image
                    : getDefaultProjectpath(val.type);

            return (
                <InfoCell
                    image={imageSrc}
                    title={val.title}
                    href={`/projects/${val.id}`}
                    subtitle={propertyTypeLabels[val.type]}
                    imageRounded="lg"
                    subtitleClass={projectTypeColors[val.type]}
                />
            );
        },
    },
    {
        key: 'status',
        label: 'الحالة',
        cell: (val: InterestRequestStatus) => {
            const style = interestRequestStatusStyle[val];
            const label = interestRequestStatusMap[val];
            return <span className={`px-3 py-1 rounded-full text-sm ${style}`}> {label} </span>;
        },
    },
    {
        key: 'createdAt',
        label: 'تاريخ ووقت الإنشاء',
        cell: (val: string) => {
            const d = new Date(val);
            return (
                <div className="flex flex-col" >
                    <span className="font-medium" > {d.toLocaleDateString('ar-EG')} </span>
                    < span className="text-xs text-gray-500" > {d.toLocaleTimeString('ar-EG')} </span>
                </div>
            );
        },
    },
];


export const mockInterestRequests: InterestRequestRow[] = [
    {
        id: 201,
        requesterName: "Ali Albarakati",
        relationshipType: "مالك",
        propertyType: "apartment",
        price: 550000,
        status: "pending_review",
        createdAt: "2025-05-22T10:54:00Z",
    },
    {
        id: 202,
        requesterName: "Shami Farraj",
        relationshipType: "مفوض",
        propertyType: "apartment",
        price: 720000,
        status: "pending_inspection",
        createdAt: "2025-05-22T20:41:00Z",
    },
    {
        id: 203,
        requesterName: "Ohood Mandeli",
        relationshipType: "مالك",
        propertyType: "apartment",
        price: 600000,
        status: "inspected",
        createdAt: "2025-05-23T01:05:00Z",
    },
    {
        id: 204,
        requesterName: "Dana Bint Shakir",
        relationshipType: "مفوض",
        propertyType: "villa",
        price: 1200000,
        status: "published",
        createdAt: "2025-05-23T10:48:00Z",
        publishedProperty: {
            id: 301,
            title: "فلل البستان – واجهات حجرية",
            type: "villa",
            image: "/main/projects/property-2.webp",
        },
    },
    {
        id: 205,
        requesterName: "Jana Suraihi",
        relationshipType: "مالك",
        propertyType: "villa",
        price: 950000,
        status: "rejected",
        createdAt: "2025-05-24T11:46:00Z",
    },
    {
        id: 206,
        requesterName: "Refal",
        relationshipType: "مفوض",
        propertyType: "office",
        price: 1500000,
        status: "pending_review",
        createdAt: "2025-05-23T22:14:00Z",
    },
    {
        id: 207,
        requesterName: "Jilan Khaja",
        relationshipType: "مالك",
        propertyType: "apartment",
        price: 800000,
        status: "pending_inspection",
        createdAt: "2025-05-23T12:30:00Z",
    },
    {
        id: 208,
        requesterName: "Saleh Al-Otaibi",
        relationshipType: "مفوض",
        propertyType: "villa",
        price: 1100000,
        status: "inspected",
        createdAt: "2025-05-25T07:29:00Z",
    },
    {
        id: 209,
        requesterName: "Ahmed Al-Aqqad",
        relationshipType: "مالك",
        propertyType: "apartment",
        price: 700000,
        status: "published",
        createdAt: "2025-05-28T13:45:00Z",
        publishedProperty: {
            id: 302,
            title: "شقق النخبة – إطلالة بحرية",
            type: "apartment",
            image: "/main/projects/property-3.webp",
        },
    },
];
