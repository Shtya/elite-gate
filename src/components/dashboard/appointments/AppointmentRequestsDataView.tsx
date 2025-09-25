'use client'

import { useCallback } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { appointmentRequestColumns, appointmentRequestFilters, AppointmentRequestRow, appointmentRequestSortConfig } from "@/constants/dashboard/agent/appointment-requests/constants";
import useAppointmentRequests from "@/hooks/dashboard/agent/appointments/useAppointmentRequests";
import { MenuActionItem } from "@/components/shared/Header/MenuActionList";
import { ActionType } from "@/components/shared/Header/MenuActionList";
import ConfirmActionToggle from "@/components/shared/ConfirmActionToggle";
import DataView from "@/components/shared/DateViewTable/DataView";

export default function AppointmentRequestsDataView() {
    const getRows = useAppointmentRequests();

    const getActionsMenu = useCallback(
        (row: AppointmentRequestRow, onClose?: () => void): MenuActionItem[] => [
            {
                label: "قبول الطلب",
                type: "primary" as ActionType,
                icon: <FaCheck />,
                child: (
                    <ConfirmActionToggle
                        title="تأكيد قبول الطلب"
                        message="هل أنت متأكد أنك تريد قبول هذا الطلب؟"
                        confirmLabel="قبول"
                        cancelLabel="إلغاء"
                        onConfirm={async () => {
                            await new Promise((r) => setTimeout(r, 200));
                            onClose?.();
                        }}
                        onCancel={onClose}
                    />
                ),
            },
            {
                label: "رفض الطلب",
                type: "danger" as ActionType,
                icon: <FaTimes />,
                child: (
                    <ConfirmActionToggle
                        title="تأكيد رفض الطلب"
                        message="هل أنت متأكد أنك تريد رفض هذا الطلب؟"
                        confirmLabel="رفض"
                        cancelLabel="إلغاء"
                        onConfirm={async () => {
                            await new Promise((r) => setTimeout(r, 200));
                            onClose?.();
                        }}
                        onCancel={onClose}
                    />
                ),
            },
        ],
        []
    );

    return (
        <DataView<AppointmentRequestRow>
            columns={appointmentRequestColumns}
            filters={appointmentRequestFilters}
            sortConfig={appointmentRequestSortConfig}
            showSearch={false}
            showSort
            getRows={getRows}
            showActions
            actionsMenuItems={getActionsMenu}
        />
    );
}
