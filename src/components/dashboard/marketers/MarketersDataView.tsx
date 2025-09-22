'use client';

import DataView from "@/components/shared/DateViewTable/DataView";
import { MenuActionItem } from "@/components/shared/Header/MenuActionList";
import { marketerColumns, marketerFilters, marketerSortConfig } from "@/constants/dashboard/marketers/contants";
import { MarketerRow } from "@/types/dashboard/marketer";
import { FaCheck, FaEdit, FaPencilAlt, FaRegTrashAlt, FaUndo } from "react-icons/fa";
import MarketerStatusToggle from "./MarketerStatusToggle";
import useMarketers from "@/hooks/dashboard/marketer/useMarketers";


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

    const baseActions: MenuActionItem[] = [
        {
            label: 'عرض التفاصيل',
            icon: <FaPencilAlt />,
            link: `/dashboard/marketers/${row.id}`,
        },
        {
            label: 'تعديل المسوق',
            icon: <FaEdit />,
            link: `/dashboard/marketers/${row.id}/edit`,
        },
    ];

    const statusActions: MenuActionItem[] = [];

    if (status === 'pending') {
        statusActions.push(
            {
                label: 'قبول الطلب',
                type: 'primary',
                icon: <FaCheck />,
                child: (
                    <MarketerStatusToggle
                        marketer={row}
                        currentStatus="pending"
                        nextStatus="active"
                        onConfirm={() => onClose?.()}
                    />
                ),
            },
            {
                label: 'رفض الطلب',
                type: 'delete',
                icon: <FaRegTrashAlt />,
                child: (
                    <MarketerStatusToggle
                        marketer={row}
                        currentStatus="pending"
                        nextStatus="rejected"
                        onConfirm={() => onClose?.()}
                    />
                ),
            }
        );
    } else if (status === 'rejected') {
        statusActions.push(
            {
                label: 'إعادة النظر',
                type: 'primary',
                icon: <FaCheck />,
                child: (
                    <MarketerStatusToggle
                        marketer={row}
                        currentStatus="rejected"
                        nextStatus="active"
                        onConfirm={() => onClose?.()}
                    />
                ),
            },
            {
                label: 'تحويل إلى قيد الانتظار',
                type: 'primary',
                icon: <FaUndo />,
                child: (
                    <MarketerStatusToggle
                        marketer={row}
                        currentStatus="rejected"
                        nextStatus="pending"
                        onConfirm={() => onClose?.()}
                    />
                ),
            }
        );
    } else {
        const isSuspended = status === 'suspended';
        statusActions.push({
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
        });
    }

    return [...baseActions, ...statusActions];
}
