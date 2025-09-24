
import PolicyGroup from "@/components/main/privacy/PolicyGroup";
import PageHeader from "@/components/shared/PageHeader";
import { PrivacyGroups } from "@/constants/pages/aboutUs";


export const metadata = {
    title: 'سياسة الخصوصية',
    description: 'تعرف على كيفية تعامل مراسل جدة العقاري مع بياناتك الشخصية، والتزامنا الكامل بحمايتها واحترام خصوصيتك.',
};

export default function PrivacyPage() {
    return (
        <div className="bg-bg-2">
            <PageHeader title="سياسة الخصوصية" description="نحن نحترم خصوصيتك وملتزمون بحماية بياناتك الشخصية." />
            <div className="bg-bg-2 relative before:absolute before:w-full before:h-[150px] before:top-0 before:left-0 before:bg-dark">
                <div className="container px-3 relative z-[1] lg:mb-[60px] space-y-4 lg:space-y-6">
                    {PrivacyGroups.map((group, idx) => (
                        <PolicyGroup key={idx} policies={group} />
                    ))}
                </div>
            </div>
        </div>
    );
}