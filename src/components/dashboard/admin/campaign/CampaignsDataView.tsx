'use client'
import DataView from '@/components/shared/DateViewTable/DataView'
import { MenuActionItem } from '@/components/shared/Header/MenuActionList'
import {
    campaignColumns,
    campaignFilters,
    campaignSortConfig
} from '@/constants/dashboard/admin/campaign/contants'
import { Campaign, CampaignStatus } from '@/types/campaign'
import { FaEdit, FaEye, FaPause, FaStop, FaSave, FaPlay } from 'react-icons/fa'
import { JSX, useState } from 'react'
import CampaignActionConfirmModal, { ActionType } from './CampaignActionConfirmModal'

export default function CampaignsDataView() {
    const getRows = async () => {
        // Mock data - in real app, this would fetch from API
        const mockCampaigns = [
            {
                id: '1',
                campaignName: 'حملة الصيف 2024',
                campaignTitle: 'عروض الصيف الحصرية',
                campaignDescription: 'احصل على أفضل العروض العقارية في الصيف',
                campaignImages: [],
                targetChannel: 'email' as const,
                targetAudience: 'clients' as const,
                runType: 'once' as const,
                runOnceDateTime: '2024-07-15T10:00:00Z',
                status: 'scheduled' as CampaignStatus,
                createdAt: '2024-01-01T00:00:00Z',
                updatedAt: '2024-01-01T00:00:00Z',
                actualRecipients: 1250,
                views: 890,
                responses: 45
            },
            {
                id: '2',
                campaignName: 'ترحيب بالعملاء الجدد',
                campaignTitle: 'مرحباً بك في منصتنا',
                campaignDescription: 'رسالة ترحيب للعملاء الجدد',
                campaignImages: [],
                targetChannel: 'whatsapp' as const,
                targetAudience: 'new_clients' as const,
                runType: 'recurring' as const,
                startDate: '2024-01-01',
                endDate: '2024-12-31',
                runFrequency: 'daily' as const,
                runTime: '09:00',
                status: 'running' as CampaignStatus,
                createdAt: '2023-12-15T00:00:00Z',
                updatedAt: '2024-01-15T00:00:00Z',
                actualRecipients: 850,
                views: 720,
                responses: 32
            },
            {
                id: '3',
                campaignName: 'تحديثات الوسطاء',
                campaignTitle: 'آخر التحديثات',
                campaignDescription: 'معلومات مهمة للوسطاء العقاريين',
                campaignImages: [],
                targetChannel: 'email' as const,
                targetAudience: 'agents' as const,
                runType: 'recurring' as const,
                startDate: '2024-01-01',
                endDate: '2024-06-30',
                runFrequency: 'weekly' as const,
                runTime: '08:00',
                status: 'paused' as CampaignStatus,
                createdAt: '2023-11-20T00:00:00Z',
                updatedAt: '2024-01-10T00:00:00Z',
                actualRecipients: 320,
                views: 280,
                responses: 15
            }
        ]

        return {
            rows: mockCampaigns,
            totalCount: mockCampaigns.length
        }
    }

    return (
        <DataView<Campaign>
            columns={campaignColumns}
            filters={campaignFilters}
            sortConfig={campaignSortConfig}
            showSearch
            showSort
            getRows={getRows}
            showActions
            actionsMenuItems={getCampaignActionsMenu}
        />
    )
}
;
;

export function getCampaignActionsMenu(row: Campaign, onClose?: () => void): MenuActionItem[] {


    const baseActions: MenuActionItem[] = [
        {
            label: 'عرض التفاصيل',
            icon: <FaEye />,
            link: `/dashboard/admin/campaigns/${row.id}`,
        },
        {
            label: 'تحرير الحملة',
            icon: <FaEdit />,
            link: `/dashboard/admin/campaigns/${row.id}/edit`,
        }
    ];

    const statusActions: MenuActionItem[] = [];

    const statusToggle = (label: string, icon: JSX.Element, type: 'normal' | 'delete', actionType: ActionType) => ({
        label,
        icon,
        type,
        child: (
            <>
                <CampaignActionConfirmModal
                    confirmAction={actionType}
                    campaignId={row.id}
                    onClose={() => {
                        onClose?.();
                    }}
                    onConfirm={() => console.log(`Confirmed ${actionType} for campaign ${row.id}`)}
                    onCancel={() => console.log(`Cancelled ${actionType} for campaign ${row.id}`)}
                />
            </>
        )
    });

    switch (row.status) {
        case 'draft':
            break;

        case 'scheduled':
        case 'running':
            statusActions.push(
                statusToggle('إيقاف مؤقت', <FaPause />, 'delete', 'pause'),
                statusToggle('إلغاء الحملة', <FaStop />, 'delete', 'cancel'),
                statusToggle('حفظ كمسودة', <FaSave />, 'normal', 'draft')
            );
            break;

        case 'paused':
            statusActions.push(
                statusToggle('استئناف الحملة', <FaPlay />, 'normal', 'resume'),
                statusToggle('إلغاء الحملة', <FaStop />, 'delete', 'cancel'),
                statusToggle('حفظ كمسودة', <FaSave />, 'normal', 'draft')
            );
            break;

        case 'completed':
        case 'Cancelled':
            break;

        default:
            break;
    }

    return [...baseActions, ...statusActions];
}