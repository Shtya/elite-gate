'use client';

import { ClientRow } from '@/types/dashboard/client';
import { useState } from 'react';

type Props = {
    client: ClientRow;
    currentStatus: 'active' | 'suspended';
    onConfirm?: () => void;
    onCancel?: () => void;
};

export default function ClientStatusToggle({
    client,
    currentStatus,
    onConfirm,
    onCancel,
}: Props) {
    const [loading, setLoading] = useState(false);
    const isSuspended = currentStatus === 'suspended';

    const handleToggle = async () => {
        setLoading(true);
        try {
            await fetch(`/api/clients/${client.id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: isSuspended ? 'active' : 'suspended' }),
            });

            if (onConfirm) onConfirm();
        } catch (error) {
            console.error('Failed to update client status:', error);
        } finally {
            setLoading(false);
        }
    };

    const title = isSuspended ? 'تفعيل حساب العميل' : 'تعليق حساب العميل';
    const message = isSuspended
        ? `هل أنت متأكد أنك تريد تفعيل حساب العميل "${client.name}" (رقم ${client.id})؟`
        : `هل أنت متأكد أنك تريد تعليق حساب العميل "${client.name}" (رقم ${client.id})؟`;

    return (
        <div className="rounded-lg bg-white max-w-md mx-auto">
            <h3 className="text-lg font-bold text-gray-800 text-center">{title}</h3>
            <p className="text-sm text-gray-600 text-center">{message}</p>

            <div className="flex justify-end gap-3 pt-4">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                    إلغاء
                </button>
                <button
                    onClick={handleToggle}
                    disabled={loading}
                    className={`px-4 py-2 rounded-md text-white ${isSuspended
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-red-600 hover:bg-red-700'
                        }`}
                >
                    {loading
                        ? 'جارٍ التنفيذ...'
                        : isSuspended
                            ? 'تأكيد التفعيل'
                            : 'تأكيد التعليق'}
                </button>
            </div>
        </div>
    );
}
