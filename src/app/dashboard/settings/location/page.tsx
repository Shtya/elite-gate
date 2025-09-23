import DashboardHeaderTitle from '@/components/dashboard/DashboardHeaderTitle';
import Card from '@/components/shared/Card';
import CenteredContainer from '@/components/shared/CenteredContainer';
import LocationInput from '@/components/shared/Forms/LocationInput';

export default function IntroLocationPage() {

    return (
        <div>
            <DashboardHeaderTitle path={['الموقع']} />

            <CenteredContainer className="space-y-6">
                <Card title=''>
                    <LocationInput />
                </Card>
            </CenteredContainer>
        </div>
    );
}
