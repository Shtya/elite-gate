'use client';

import DataView from "@/components/shared/DateViewTable/DataView";
import { propertySubmissionRow } from "@/types/dashboard/property-submissions";
import { FaEdit, FaExchangeAlt, FaEye } from "react-icons/fa";
import { ActionType, MenuActionItem } from "@/components/shared/Header/MenuActionList";
import PropertySubmissionStatusToggle from "./PropertySubmissionStatusToggle";
import { propertySubmissionColumns, propertySubmissionFilters, propertySubmissionSortConfig } from "@/constants/dashboard/admin/propertySubmissions/constants";
import usePropertySubmissions from "@/hooks/dashboard/admin/propertySubmissions/usePropertySubmissions";


export default function PropertySubmissionsDataView() {
    const getRows = usePropertySubmissions();

    return (
        <DataView<propertySubmissionRow>
            columns={propertySubmissionColumns}
            filters={propertySubmissionFilters}
            sortConfig={propertySubmissionSortConfig}
            showSearch
            showSort
            getRows={getRows}
            showActions
            actionsMenuItems={getPropertySubmissionActionsMenu}
        />
    );
}

function getPropertySubmissionActionsMenu(row: propertySubmissionRow, onClose?: () => void): MenuActionItem[] {
    return [
        {
            label: 'عرض التفاصيل',
            icon: <FaEye />,
            link: `/dashboard/admin/property-submissions/${row.id}`,
        },
        {
            label: 'تعديل الطلب',
            icon: <FaEdit />,
            link: `/dashboard/admin/property-submissions/edit/${row.id}`,
        },
        {
            label: 'تغيير الحالة',
            type: 'primary' as ActionType,
            icon: <FaExchangeAlt />,
            child: (
                <PropertySubmissionStatusToggle
                    requestId={row.id}
                    currentStatus={row.status}
                    onConfirm={() => { onClose?.(); }}
                    onCancel={() => { }}
                />
            ),
        },
    ];
}
