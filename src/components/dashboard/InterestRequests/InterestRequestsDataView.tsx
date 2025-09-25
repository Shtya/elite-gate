'use client';

import DataView from "@/components/shared/DateViewTable/DataView";
import { InterestRequestRow } from "@/types/dashboard/interest-requests";
import { FaExchangeAlt, FaEye } from "react-icons/fa";
import { ActionType, MenuActionItem } from "@/components/shared/Header/MenuActionList";
import InterestRequestStatusToggle from "./InterestRequestStatusToggle";
import { interestRequestColumns, interestRequestFilters, interestRequestSortConfig } from "@/constants/dashboard/interestRequests/constants";
import useInterestRequests from "@/hooks/dashboard/interestRequests/useInterestRequests";


export default function InterestRequestsDataView() {
    const getRows = useInterestRequests();

    return (
        <DataView<InterestRequestRow>
            columns={interestRequestColumns}
            filters={interestRequestFilters}
            sortConfig={interestRequestSortConfig}
            showSearch
            showSort
            getRows={getRows}
            showActions
            actionsMenuItems={getInterestRequestActionsMenu}
        />
    );
}

function getInterestRequestActionsMenu(row: InterestRequestRow, onClose?: () => void): MenuActionItem[] {
    return [
        {
            label: 'عرض التفاصيل',
            icon: <FaEye />,
            link: `/dashboard/admin/interest-requests/${row.id}`,
        },
        {
            label: 'تغيير الحالة',
            type: 'primary' as ActionType,
            icon: <FaExchangeAlt />,
            child: (
                <InterestRequestStatusToggle
                    requestId={row.id}
                    currentStatus={row.status}
                    onConfirm={() => { onClose?.(); }}
                    onCancel={() => { }}
                />
            ),
        },
    ];
}
