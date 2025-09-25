'use client'
import DataView from "@/components/shared/DateViewTable/DataView";
import { MenuActionItem } from "@/components/shared/Header/MenuActionList";
import { agentColumns, agentFilters, agentSortConfig } from "@/constants/dashboard/admin/agent/contants";
import useAgents from "@/hooks/dashboard/admin/agent/useAgents";
import { AgentRow } from "@/types/dashboard/agent";
import { FaCheck, FaEdit, FaPencilAlt, FaRegTrashAlt, FaUndo } from "react-icons/fa";
import AgentStatusToggle from "./AgentStatusToggle";

export default function AgentsDataView() {
    const getRows = useAgents();

    return (
        <DataView<AgentRow>
            columns={agentColumns}
            filters={agentFilters}
            sortConfig={agentSortConfig}
            showSearch
            showSort
            getRows={getRows}
            showActions
            actionsMenuItems={getAgentActionsMenu}
        />
    );
}

function getAgentActionsMenu(row: AgentRow, onClose?: () => void): MenuActionItem[] {
    const { status } = row;

    const baseActions: MenuActionItem[] = [
        {
            label: 'عرض التفاصيل',
            icon: <FaPencilAlt />,
            link: `/dashboard/admin/agents/${row.id}`,
        },
        {
            label: 'تعديل الوسيط',
            icon: <FaEdit />,
            link: `/dashboard/admin/agents/${row.id}/edit`,
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
                    <AgentStatusToggle
                        agent={row}
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
                    <AgentStatusToggle
                        agent={row}
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
                    <AgentStatusToggle
                        agent={row}
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
                    <AgentStatusToggle
                        agent={row}
                        currentStatus="rejected"
                        nextStatus="pending"
                        onConfirm={() => onClose?.()}
                    />
                ),
            }
        );
    }
    else {
        const isSuspended = status === 'suspended';
        statusActions.push({
            label: isSuspended ? 'تفعيل الحساب' : 'تعليق الحساب',
            type: isSuspended ? 'primary' : 'delete',
            icon: isSuspended ? <FaCheck /> : <FaRegTrashAlt />,
            child: (
                <AgentStatusToggle
                    agent={row}
                    currentStatus={status}
                    nextStatus={isSuspended ? 'active' : 'suspended'}
                    onConfirm={() => onClose?.()}
                />
            ),
        });
    }

    return [...baseActions, ...statusActions];
}
