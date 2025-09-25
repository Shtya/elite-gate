'use client'
import DataView from "@/components/shared/DateViewTable/DataView";
import { agents, appointmentColumns, appointmentFilters, appointmentSortConfig } from "@/constants/dashboard/admin/appointment/contants";
import useAppointments from "@/hooks/dashboard/admin/appointments/useAppointments";
import { AppointmentRow } from "@/types/dashboard/appointment";
import { FaExchangeAlt, FaEye, FaUserEdit } from "react-icons/fa";
import AppointmentStatusToggle from "./AppointmentStatusToggle";
import AgentAssignmentToggle from "../UserAssignmentToggle";
import { ActionType, MenuActionItem } from "@/components/shared/Header/MenuActionList";
import AppointmentProofUploadToggle from "./AppointmentProofUploadToggle";
import { useRoleFromPath } from "@/hooks/dashboard/admin/useRoleFromPath";
import { useMemo } from "react";

type AppointmentsDataViewProps = {
    agentId?: number;
    clientId?: number;
};

export default function AppointmentsDataView({ agentId, clientId }: AppointmentsDataViewProps) {
    const getRows = useAppointments({ agentId, clientId });

    const role = useRoleFromPath();

    // ✅ Filter columns by context
    const filteredColumns = useMemo(
        () =>
            appointmentColumns.filter((col) => {
                if (clientId && col.key === "client") return false;
                if (agentId && col.key === "agent") return false;
                return true;
            }),
        [appointmentColumns, clientId, agentId]
    );

    // ✅ Role-based filters
    const roleBasedFilters = useMemo(() => {
        if (role === "admin") return appointmentFilters;
        // remove agentId filter for non-admins
        return appointmentFilters.filter((f) => f.key !== "agentId");
    }, [role]);

    // ✅ Role-based sort config
    const roleBasedSortConfig = useMemo(() => {
        if (role === "admin") return appointmentSortConfig;
        // remove "اسم الوسيط" sort for non-admins
        return {
            ...appointmentSortConfig,
            sortFields: appointmentSortConfig.sortFields.filter(
                (f) => f.value !== "agentName"
            ),
        };
    }, [role]);

    // ✅ Role-based actions
    const getActionsMenu = useMemo(
        () =>
            (row: AppointmentRow, onClose?: () => void): MenuActionItem[] => {
                const base: MenuActionItem[] = [
                    {
                        label: "عرض التفاصيل",
                        icon: <FaEye />,
                        link: `/dashboard/${role}/appointments/${row.id}`,
                    },
                    {
                        label: "تغيير الحالة",
                        type: "primary" as ActionType,
                        icon: <FaExchangeAlt />,
                        child: (
                            <AppointmentStatusToggle
                                appointmentId={row.id}
                                currentStatus={row.status}
                                onConfirm={() => {
                                    onClose?.();
                                }}
                                onCancel={() => { }}
                            />
                        ),
                    },
                ];

                if (role === "admin") {
                    base.splice(1, 0, {
                        label: row.agent ? "تغيير الوسيط" : "تعيين وسيط",
                        type: "primary" as ActionType,
                        icon: <FaUserEdit />,
                        child: (
                            <AgentAssignmentToggle
                                users={agents}
                                label="وسيط"
                                appointmentId={row.id}
                                selectedUser={row.agent}
                                onConfirm={(agent) => {
                                    onClose?.();
                                }}
                            />
                        ),
                    });

                    if (row.status === "completed" && !row.isPaid) {
                        base.push({
                            label: "إرفاق إثبات الدفع",
                            type: "primary" as ActionType,
                            icon: <FaExchangeAlt />,
                            child: (
                                <AppointmentProofUploadToggle
                                    appointmentId={row.id}
                                    onConfirm={() => {
                                        onClose?.();
                                    }}
                                    onCancel={() => { }}
                                />
                            ),
                        });
                    }
                }

                return base;
            },
        [role]
    );

    return (
        <DataView<AppointmentRow>
            columns={filteredColumns}
            filters={roleBasedFilters}
            sortConfig={roleBasedSortConfig}
            showSearch={false}
            showSort
            getRows={getRows}
            showActions
            actionsMenuItems={getActionsMenu}
        />
    );
}

