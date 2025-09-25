
import BecomeAgentForm from '@/components/main/becomeAgent/BecomeAgentForm';
import CenteredContainer from '@/components/shared/CenteredContainer';
import { FileItem } from '@/utils/upload';





export default function BecomeAgentPage() {

    return (
        <section className="py-[30px] lg:py-[60px] bg-[var(--bg-2)]">
            <CenteredContainer>
                <BecomeAgentForm />
            </CenteredContainer>
        </section>
    );
}


