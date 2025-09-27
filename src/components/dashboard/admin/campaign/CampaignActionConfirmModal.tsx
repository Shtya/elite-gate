'use client';

import { useMemo, useState } from 'react';
import Popup from '@/components/shared/Popup';
import ConfirmActionToggle from '@/components/shared/ConfirmActionToggle';

export type ActionType = 'pause' | 'cancel' | 'draft' | 'resume' | null;

interface CampaignActionConfirmModalProps {
    confirmAction: ActionType;
    campaignId: string;

    onClose: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
}

export default function CampaignActionConfirmModal({
    confirmAction,
    campaignId,
    onClose,
    onConfirm,
    onCancel
}: CampaignActionConfirmModalProps) {
    const [loading, setLoading] = useState(false);

    async function handleAction(endpoint: string) {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise((r) => setTimeout(r, 500));
            console.log(`Action '${confirmAction}' executed for campaign ${campaignId} via ${endpoint}`);
            if (onConfirm) onConfirm();
        } catch (error) {
            console.error('Error executing campaign action:', error);
        } finally {
            setLoading(false);
            onClose();
        }
    }

    const getConfig = () => {
        switch (confirmAction) {
            case 'pause':
                return {
                    title: 'تأكيد إيقاف الحملة مؤقتًا',
                    message: 'هل أنت متأكد أنك تريد إيقاف الحملة مؤقتًا؟ يمكن استئنافها لاحقًا.',
                    endpoint: `/api/campaigns/${campaignId}/pause`
                };
            case 'cancel':
                return {
                    title: 'تأكيد إلغاء الحملة',
                    message: 'هل أنت متأكد أنك تريد إلغاء هذه الحملة؟ لا يمكن التراجع بعد الإلغاء.',
                    endpoint: `/api/campaigns/${campaignId}/cancel`
                };
            case 'draft':
                return {
                    title: 'تأكيد حفظ كمسودة',
                    message: 'هل تريد حفظ هذه الحملة كمسودة؟',
                    endpoint: `/api/campaigns/${campaignId}/draft`
                };
            case 'resume':
                return {
                    title: 'تأكيد استئناف الحملة',
                    message: 'هل تريد استئناف هذه الحملة؟ سيتم إعادة تشغيلها حسب الجدول المحدد.',
                    endpoint: `/api/campaigns/${campaignId}/resume`
                };
            default:
                return null;
        }
    };

    const config = useMemo(() => getConfig(), [confirmAction, campaignId]);

    if (!config) return null;

    return (
        <ConfirmActionToggle
            title={config.title}
            message={config.message}
            confirmLabel="نعم، متابعة"
            cancelLabel="إلغاء"
            onConfirm={() => handleAction(config.endpoint)}
            onCancel={() => {
                if (onCancel) onCancel();
                onClose();
            }}
        />
    );
}
