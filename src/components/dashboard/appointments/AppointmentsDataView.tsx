'use client'
import DataView from "@/components/shared/DateViewTable/DataView";
import { agents, appointmentColumns, appointmentFilters, appointmentSortConfig } from "@/constants/dashboard/appointment/contants";
import useAppointments from "@/hooks/dashboard/appointments/useAppointments";
import { AppointmentRow } from "@/types/dashboard/appointment";
import { FaExchangeAlt, FaEye, FaUserEdit } from "react-icons/fa";
import AppointmentStatusToggle from "./AppointmentStatusToggle";
import AgentAssignmentToggle from "../UserAssignmentToggle";
import { ActionType, MenuActionItem } from "@/components/shared/Header/MenuActionList";
import AppointmentProofUploadToggle from "./AppointmentProofUploadToggle";

type AppointmentsDataViewProps = {
    agentId?: number;
    clientId?: number;
};

export default function AppointmentsDataView({ agentId, clientId }: AppointmentsDataViewProps) {
    const getRows = useAppointments({ agentId, clientId });

    const filteredColumns = appointmentColumns.filter((col) => {
        if (clientId && col.key === 'client') return false;
        if (agentId && col.key === 'agent') return false;
        return true;
    });

    return (
        <DataView<AppointmentRow>
            columns={filteredColumns}
            filters={appointmentFilters}
            sortConfig={appointmentSortConfig}
            showSearch={false}
            showSort
            getRows={getRows}
            showActions
            actionsMenuItems={getAppointmentActionsMenu}
        />
    );
}



function getAppointmentActionsMenu(row: AppointmentRow, onClose?: () => void): MenuActionItem[] {

    return [
        {
            label: 'عرض التفاصيل',
            icon: <FaEye />,
            link: `/dashboard/appointments/${row.id}`,
        },
        {
            label: row.agent ? 'تغيير الوسيط' : 'تعيين وسيط',
            type: 'primary' as ActionType,
            icon: <FaUserEdit />,
            child: (
                <AgentAssignmentToggle
                    users={agents}
                    label="وسيط"
                    appointmentId={row.id}
                    selectedUser={row.agent} // ✅ بدلًا من currentAgent
                    onConfirm={(agent) => {
                        onClose?.();
                    }}
                />
            ),
        },
        {
            label: 'تغيير الحالة',
            type: 'primary' as ActionType, // ✅ تحديد النوع بشكل صريح
            icon: <FaExchangeAlt />,
            child: (
                <AppointmentStatusToggle
                    appointmentId={row.id}
                    currentStatus={row.status}
                    onConfirm={() => { onClose?.(); }}
                    onCancel={() => { }}
                />
            ),
        },
        ...(row.status === 'completed' && !row.isPaid ? [{
            label: 'إرفاق إثبات الدفع',
            type: 'primary' as ActionType,
            icon: <FaExchangeAlt />,
            child: (
                <AppointmentProofUploadToggle
                    appointmentId={row.id}
                    onConfirm={() => { onClose?.(); }}
                    onCancel={() => { }}
                />
            ),
        } as MenuActionItem] : []),
    ];
}