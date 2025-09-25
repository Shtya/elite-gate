
import DashboardHeaderTitle from '@/components/dashboard/DashboardHeaderTitle';
import CenteredContainer from '@/components/shared/CenteredContainer';
import WebsiteInfoForm from '@/components/dashboard/settings/WebsiteInfoForm';

export default function SiteInfoPage() {

    const defaultValues = {
        email: 'ali@albarakati.net',
        phone: '966 54 364 0639+',
        twitter: 'https://x.com/jeddah_reporter?s=09',
        youtube: 'https://www.youtube.com/@JeddahReporterAliAlbarakati',
        instagram: 'https://www.instagram.com/ali_n_albarakati',
        snapchat: 'https://www.snapchat.com/@jeddahrepor2019',
        tiktok: 'https://www.tiktok.com/@ali.n.albarakati',
        clients: 880,
        experienceYears: 10,
        projects: 251,
    };

    return (
        <div>
            <DashboardHeaderTitle path={['معلومات الموقع']} />

            <CenteredContainer className="space-y-6">
                <WebsiteInfoForm defaultValues={defaultValues} />
            </CenteredContainer>
        </div>
    );
}
