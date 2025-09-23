'use client';

import SelectDropdown from "@/components/shared/Forms/SelectDropdown";
import { InterestRequestStatus, interestRequestStatusMap, interestRequestStatusStyle } from "@/constants/dashboard/interestRequests/constants";
import { useState } from "react";


type Props = {
    requestId: number;
    currentStatus: InterestRequestStatus;
    onConfirm?: () => void;
    onCancel?: () => void;
};

export default function InterestRequestStatusToggle({
    requestId,
    currentStatus,
    onConfirm,
    onCancel,
}: Props) {
    const [loading, setLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<InterestRequestStatus>(currentStatus);

    const handleChange = (value: string) => {
        setSelectedStatus(value as InterestRequestStatus);
    };

    const handleToggle = async () => {
        setLoading(true);
        try {
            await fetch(`/api/interest-requests/${requestId}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: selectedStatus }),
            });
            onConfirm?.();
        } catch (error) {
            console.error("Failed to update interest request status:", error);
        } finally {
            setLoading(false);
        }
    };

    const statusOptions = Object.entries(interestRequestStatusMap).map(([value, label]) => ({
        value,
        label,
    }));

    return (
        <div className="rounded-lg bg-white max-w-md mx-auto">
            <h3 className="text-lg font-bold text-gray-800 text-center">تغيير حالة الطلب</h3>
            <p className="text-sm text-gray-600 text-center mb-4">
                اختر الحالة الجديدة للطلب رقم {requestId}.
                <span className={`${interestRequestStatusStyle[currentStatus]} !bg-white`}>
                    الحالة الحالية هي {interestRequestStatusMap[currentStatus]}
                </span>
            </p>

            <SelectDropdown
                options={statusOptions}
                value={selectedStatus}
                onChange={handleChange}
                label="الحالة الجديدة"
            />

            <div className="flex justify-end gap-3 pt-6">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                    إلغاء
                </button>
                <button
                    onClick={handleToggle}
                    disabled={loading}
                    className="px-4 py-2 rounded-md text-white bg-[var(--primary)] hover:bg-[var(--primary-600)]"
                >
                    {loading ? "جارٍ التنفيذ..." : `تأكيد التغيير إلى "${interestRequestStatusMap[selectedStatus]}"`}
                </button>
            </div>
        </div>
    );
}
