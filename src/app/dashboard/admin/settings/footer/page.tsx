'use client';

import WebsiteFooterForm from '@/components/dashboard/admin/settings/WebsiteFooterForm';
import DashboardHeaderTitle from '@/components/dashboard/DashboardHeaderTitle';
import CenteredContainer from '@/components/shared/CenteredContainer';

export default function SiteFooterPage() {
    const defaultValues = {
        footerParagraph: 'مرحبًا بكر، عبر منصتنا يمكنك استكشاف وشراء وحدات عقارية بكل سهولة وشفافية، حيث نوفر لك عروضًا متنوعة تناسب احتياجاتك. كما نتيح لأصحاب العقارات فرصة عرض وحداتهم للبيع، وإدارتها من خلال نظام ذكي يضمن وصولها إلى المهتمين، مع دعم فريق متخصص لضمان جودة التجربة للطرفين.',
        newsletterTitle: 'النشرة البريدية',
        newsletterParagraph: 'اشترك في النشرة البريدية للحصول على آخر التحديثات والأخبار',
    };


    return (
        <div>
            <DashboardHeaderTitle path={['الفوتر']} />

            <CenteredContainer className="space-y-6">
                <WebsiteFooterForm defaultValues={defaultValues} />
            </CenteredContainer>
        </div>
    );
}
