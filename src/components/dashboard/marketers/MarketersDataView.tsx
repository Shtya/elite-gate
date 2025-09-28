'use client';

import DataView from "@/components/shared/DateViewTable/DataView";
import { MenuActionItem } from "@/components/shared/Header/MenuActionList";
import { marketerColumns, marketerFilters, marketerSortConfig } from "@/constants/dashboard/admin/marketers/contants";
import { MarketerRow } from "@/types/dashboard/marketer";
import { FaCheck, FaEdit, FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import MarketerStatusToggle from "./MarketerStatusToggle";
import useMarketers from "@/hooks/dashboard/admin/marketer/useMarketers";


export default function MarketersDataView() {
    const getRows = useMarketers();

    return (
        <DataView<MarketerRow>
            columns={marketerColumns}
            filters={marketerFilters}
            sortConfig={marketerSortConfig}
            showSearch
            showSort
            getRows={getRows}
            showActions
            actionsMenuItems={getMarketerActionsMenu}
        />
    );
}

function getMarketerActionsMenu(row: MarketerRow, onClose?: () => void): MenuActionItem[] {
    const { status } = row;
    const isSuspended = status === 'suspended';
    const baseActions: MenuActionItem[] = [
        {
            label: 'عرض التفاصيل',
            icon: <FaPencilAlt />,
            link: `/dashboard/admin/marketers/${row.id}`,
        },
        {
            label: 'تعديل المسوق',
            icon: <FaEdit />,
            link: `/dashboard/admin/marketers/${row.id}/edit`,
        },
        {

            label: isSuspended ? 'تفعيل الحساب' : 'تعليق الحساب',
            type: isSuspended ? 'primary' : 'delete',
            icon: isSuspended ? <FaCheck /> : <FaRegTrashAlt />,
            child: (
                <MarketerStatusToggle
                    marketer={row}
                    currentStatus={status}
                    nextStatus={isSuspended ? 'active' : 'suspended'}
                    onConfirm={() => onClose?.()}
                />
            ),
        }
    ];

    const statusActions: MenuActionItem[] = [];


    return [...baseActions, ...statusActions];
}
