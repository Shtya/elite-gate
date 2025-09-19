'use client'
import DataView from "@/components/shared/DateViewTable/DataView";
import { appointmentColumns, appointmentFilters, appointmentSortConfig } from "@/constants/dashboard/appointment/contants";
import useAppointments from "@/hooks/dashboard/appointments/useAppointments";
import { AppointmentRow } from "@/types/dashboard/appointment";
import { FaExchangeAlt, FaEye } from "react-icons/fa";
import AppointmentStatusToggle from "./AppointmentStatusToggle";

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
            actionsMenuItems={(row: AppointmentRow) => [
                {
                    label: 'عرض التفاصيل',
                    icon: <FaEye />,
                    link: `/dashboard/appointments/${row.id}`,
                },
                {
                    label: 'تغيير الحالة',
                    type: 'primary',
                    icon: <FaExchangeAlt />,
                    child: (
                        <AppointmentStatusToggle
                            appointmentId={row.id}
                            currentStatus={row.status}
                            onConfirm={() => {
                                // Optional: toast
                            }}
                        />
                    ),
                },
            ]}
        />
    );
}
