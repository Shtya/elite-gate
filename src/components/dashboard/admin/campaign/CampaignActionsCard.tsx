'use client';

import { useMemo, useState } from 'react';
import Card from '@/components/shared/Card';
import Link from 'next/link';
import Popup from '@/components/shared/Popup';
import { Campaign } from '@/types/campaign';
import { FaPause, FaStop, FaEdit, FaSave, FaPlay } from 'react-icons/fa';
import CampaignActionConfirmModal from './CampaignActionConfirmModal';

interface CampaignActionsCardProps {
    campaign: Campaign;
}

export default function CampaignActionsCard({
    campaign,
}: CampaignActionsCardProps) {
    const [confirmAction, setConfirmAction] = useState<null | 'pause' | 'cancel' | 'draft' | 'resume'>(null);


    const actions = useMemo(() => {
        switch (campaign.status) {
            case 'draft':
                return [
                    {
                        icon: <FaEdit className="w-4 h-4" />,
                        label: 'تحرير الحملة',
                        href: `/dashboard/admin/campaigns/${campaign.id}/edit`,
                        className: 'bg-primary text-white hover:bg-primary-600'
                    }
                ];
            case 'scheduled':
            case 'running':
                return [
                    {
                        icon: <FaPause className="w-4 h-4" />,
                        label: 'إيقاف مؤقت',
                        action: () => setConfirmAction('pause'),
                        className: 'bg-yellow-500 text-white hover:bg-yellow-600'
                    },
                    {
                        icon: <FaStop className="w-4 h-4" />,
                        label: 'إلغاء',
                        action: () => setConfirmAction('cancel'),
                        className: 'bg-red-500 text-white hover:bg-red-600'
                    },
                    {
                        icon: <FaEdit className="w-4 h-4" />,
                        label: 'تحرير',
                        href: `/dashboard/admin/campaigns/${campaign.id}/edit`,
                        className: 'bg-primary text-white hover:bg-primary-600'
                    }
                ];
            case 'paused':
                return [
                    {
                        icon: <FaPlay className="w-4 h-4" />,
                        label: 'استئناف',
                        action: () => setConfirmAction('resume'),
                        className: 'bg-green-500 text-white hover:bg-green-600'
                    },
                    {
                        icon: <FaStop className="w-4 h-4" />,
                        label: 'إلغاء',
                        action: () => setConfirmAction('cancel'),
                        className: 'bg-red-500 text-white hover:bg-red-600'
                    },
                    {
                        icon: <FaEdit className="w-4 h-4" />,
                        label: 'تحرير',
                        href: `/dashboard/admin/campaigns/${campaign.id}/edit`,
                        className: 'bg-primary text-white hover:bg-primary-600'
                    }
                ];
            case 'completed':
            case 'Cancelled':
                return [
                    {
                        icon: <FaEdit className="w-4 h-4" />,
                        label: 'تحرير',
                        href: `/dashboard/admin/campaigns/${campaign.id}/edit`,
                        className: 'bg-primary text-white hover:bg-primary-600'
                    }
                ];
            default:
                return [];
        }
    }, [campaign.status, campaign.id, setConfirmAction]);



    return (
        <>
            <Card title="إجراءات الحملة" className="h-full flex flex-col justify-between">
                <div className="flex flex-col gap-4 flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {actions.map((action, index) =>
                            action.href ? (
                                <Link
                                    key={index}
                                    href={action.href}
                                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${action.className}`}
                                >
                                    {action.icon}
                                    <span className="text-sm font-medium">{action.label}</span>
                                </Link>
                            ) : (
                                <button
                                    key={index}
                                    onClick={action.action}
                                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${action.className}`}
                                >
                                    {action.icon}
                                    <span className="text-sm font-medium">{action.label}</span>
                                </button>
                            )
                        )}
                    </div>

                    {/* Additional Actions */}
                    {campaign.status !== 'draft' && <div className="pt-4 border-t border-gray-200">
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setConfirmAction('draft')}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                <FaSave className="w-4 h-4" />
                                حفظ كمسودة
                            </button>
                        </div>
                    </div>}

                    {/* Status Info */}
                    <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg mt-auto">
                        <p className="font-medium mb-1">ملاحظة:</p>
                        <ul className="space-y-1 text-xs">
                            <li>• يمكن تحرير الحملة في أي وقت</li>
                            <li>• الحملات المجدولة يمكن إلغاؤها قبل بدء التشغيل</li>
                            <li>• الحملات المتوقفة يمكن استئنافها</li>
                        </ul>
                    </div>
                </div>
            </Card>

            <Popup show={!!confirmAction} onClose={() => setConfirmAction(null)}>
                <CampaignActionConfirmModal
                    confirmAction={confirmAction}
                    campaignId={campaign.id}
                    onClose={() => setConfirmAction(null)}
                    onConfirm={() => console.log('Parent side effect')}
                    onCancel={() => console.log('Cancelled by user')}
                />
            </Popup>

        </>
    );
}
