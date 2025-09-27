'use client'
import { useState } from 'react'
import Popup from '@/components/shared/Popup'
import ConfirmActionToggle from '@/components/shared/ConfirmActionToggle'
import { Campaign, CampaignStatus } from '@/types/campaign'

interface CampaignActionTogglesProps {
    campaign: Campaign
    onStatusChange?: (campaignId: string, newStatus: CampaignStatus) => void
}

export default function CampaignActionToggles({
    campaign,
    onStatusChange
}: CampaignActionTogglesProps) {
    const [confirmAction, setConfirmAction] = useState<null | 'pause' | 'cancel' | 'draft'>('cancel')

    const handlePause = async () => {
        console.log('Pausing campaign:', campaign.id)
        onStatusChange?.(campaign.id, 'paused')
        setConfirmAction(null)
    }

    const handleCancel = async () => {
        console.log('Cancelling campaign:', campaign.id)
        onStatusChange?.(campaign.id, 'Cancelled')
        setConfirmAction(null)
    }

    const handleDraft = async () => {
        console.log('Moving campaign to draft:', campaign.id)
        onStatusChange?.(campaign.id, 'draft')
        setConfirmAction(null)
    }

    const handleResume = async () => {
        console.log('Resuming campaign:', campaign.id)
        onStatusChange?.(campaign.id, 'running')
    }

    const getAvailableActions = () => {
        switch (campaign.status) {
            case 'draft':
                return []
            case 'scheduled':
            case 'running':
                return [
                    {
                        action: 'pause',
                        label: 'إيقاف مؤقت',
                        handler: () => setConfirmAction('pause')
                    },
                    {
                        action: 'cancel',
                        label: 'إلغاء',
                        handler: () => setConfirmAction('cancel')
                    }
                ]
            case 'paused':
                return [
                    {
                        action: 'resume',
                        label: 'استئناف',
                        handler: handleResume
                    },
                    {
                        action: 'cancel',
                        label: 'إلغاء',
                        handler: () => setConfirmAction('cancel')
                    }
                ]
            case 'completed':
            case 'Cancelled':
                return []
            default:
                return []
        }
    }

    const actions = getAvailableActions()

    return (
        <>
            {/* <div className="flex flex-wrap gap-2">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        onClick={action.handler}
                        className={`px-3 py-1 text-xs rounded-full transition-colors ${action.action === 'pause'
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : action.action === 'cancel'
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : action.action === 'resume'
                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {action.label}
                    </button>
                ))}

                
                {campaign.status !== 'draft' && (
                    <button
                        onClick={() => setConfirmAction('draft')}
                        className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                        حفظ كمسودة
                    </button>
                )}
            </div> */}

            {/* Confirmation Popups */}
            <Popup show={!!confirmAction} onClose={() => setConfirmAction(null)}>
                {confirmAction === 'pause' && (
                    <ConfirmActionToggle
                        title="تأكيد إيقاف الحملة مؤقتًا"
                        message="هل أنت متأكد أنك تريد إيقاف الحملة مؤقتًا؟ يمكن استئنافها لاحقًا."
                        onConfirm={handlePause}
                        onCancel={() => setConfirmAction(null)}
                    />
                )}
                {confirmAction === 'cancel' && (
                    <ConfirmActionToggle
                        title="تأكيد إلغاء الحملة"
                        message="هل أنت متأكد أنك تريد إلغاء هذه الحملة؟ لا يمكن التراجع بعد الإلغاء."
                        onConfirm={handleCancel}
                        onCancel={() => setConfirmAction(null)}
                    />
                )}
                {confirmAction === 'draft' && (
                    <ConfirmActionToggle
                        title="تأكيد حفظ كمسودة"
                        message="هل تريد حفظ هذه الحملة كمسودة؟"
                        onConfirm={handleDraft}
                        onCancel={() => setConfirmAction(null)}
                    />
                )}
            </Popup>
        </>
    )
}
