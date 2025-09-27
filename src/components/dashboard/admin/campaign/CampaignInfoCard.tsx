'use client'
import Card from '@/components/shared/Card'
import { Campaign } from '@/types/campaign'
import { FaUsers, FaCalendarAlt, FaClock, FaRedo } from 'react-icons/fa'
import {
    getTargetChannelIcon,
    getTargetAudienceText,
    getRunTypeText,
    getFrequencyText,
    getStatusColor,
    getStatusText,
} from '@/constants/dashboard/admin/campaign/contants'

interface CampaignInfoCardProps {
    campaign: Campaign
}


export default function CampaignInfoCard({ campaign }: CampaignInfoCardProps) {
    return (
        <Card title={campaign.campaignName}>
            <div className="space-y-4">
                {/* Campaign Name and Title */}
                <div>
                    <p className="text-gray-600 mb-3">{campaign.campaignTitle}</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{campaign.campaignDescription}</p>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">الحالة:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {getStatusText(campaign.status)}
                    </span>
                </div>

                {/* Target Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                        {getTargetChannelIcon(campaign.targetChannel)}
                        <span className="text-sm text-gray-600">قناة الهدف:</span>
                        <span className="text-sm font-medium text-gray-800">
                            {campaign.targetChannel === 'email' ? 'البريد الإلكتروني' : 'واتساب'}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <FaUsers className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">الجمهور المستهدف:</span>
                        <span className="text-sm font-medium text-gray-800">
                            {getTargetAudienceText(campaign.targetAudience)}
                        </span>
                    </div>
                </div>

                {/* Run Settings */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <FaRedo className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">نوع التشغيل:</span>
                        <span className="text-sm font-medium text-gray-800">
                            {getRunTypeText(campaign.runType)}
                        </span>
                    </div>

                    {campaign.runType === 'once' && campaign.runOnceDateTime && (
                        <div className="flex items-center gap-2">
                            <FaCalendarAlt className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">تاريخ التشغيل:</span>
                            <span className="text-sm font-medium text-gray-800">
                                {new Date(campaign.runOnceDateTime).toLocaleDateString('ar-SA')}
                            </span>
                            <FaClock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-800">
                                {new Date(campaign.runOnceDateTime).toLocaleTimeString('ar-SA', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>
                    )}

                    {campaign.runType === 'recurring' && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <FaCalendarAlt className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600">فترة التشغيل:</span>
                                <span className="text-sm font-medium text-gray-800">
                                    {campaign.startDate && new Date(campaign.startDate).toLocaleDateString('ar-SA')} -
                                    {campaign.endDate && new Date(campaign.endDate).toLocaleDateString('ar-SA')}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <FaRedo className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600">التكرار:</span>
                                <span className="text-sm font-medium text-gray-800">
                                    {campaign.runFrequency && getFrequencyText(campaign.runFrequency)}
                                </span>
                                <FaClock className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-800">
                                    {campaign.runTime}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Created/Updated Dates */}
                <div className="pt-3 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500">
                        <div>
                            <span className="font-medium">تاريخ الإنشاء:</span>
                            <span className="mr-2">
                                {new Date(campaign.createdAt).toLocaleDateString('ar-SA')} -
                                {new Date(campaign.createdAt).toLocaleTimeString('ar-SA', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>
                        <div>
                            <span className="font-medium">آخر تحديث:</span>
                            <span className="mr-2">
                                {new Date(campaign.updatedAt).toLocaleDateString('ar-SA')} -
                                {new Date(campaign.updatedAt).toLocaleTimeString('ar-SA', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
