'use client'
import { Campaign } from '@/types/campaign'
import CampaignStatsCard from './CampaignStatsCard'
import CampaignInfoCard from './CampaignInfoCard'
import CampaignActionsCard from './CampaignActionsCard'
import CampaignImagesCard from './CampaignImagesCard'
import AttachmentsCard from '@/components/shared/AttachmentsCard'

type Props = {
    campaign: Campaign;
};

// Mock stats data - in real app, this would come from API
const mockStats = {
    targetRecipients: 1250,
    actualRecipients: 1180,
    views: 890,
    responses: 45
}

export default function CampaignDetails({ campaign }: Props) {
    return (
        <div className='space-y-4 lg:space-y-6'>
            {/* Campaign Statistics */}
            <CampaignStatsCard stats={mockStats} />

            <div className='flex flex-col lg:flex-row h-full gap-4 lg:gap-6 items-stretch'>
                <div className='flex-1'>
                    <CampaignInfoCard campaign={campaign} />
                </div>
                <div className='flex-1'>
                    <CampaignActionsCard campaign={campaign} />
                </div>
            </div>
            <AttachmentsCard attachments={campaign.campaignExcel || []} title='ملفات الاكسل' />
            <div className='h-full 2xl:col-span-4 flex flex-col gap-4 lg:gap-6'>
                <CampaignImagesCard campaign={campaign} />
            </div>
        </div>
    )
}