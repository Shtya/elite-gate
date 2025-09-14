import BasicInfoForm from "@/components/main/customer/personal-info/BasicInfoForm";
import DeleteAccountSection from "@/components/main/customer/personal-info/DeleteAccountSection";


export const metadata = {
    title: 'المعلومات الشخصية',
    description: 'قم بتحديث بياناتك الشخصية أو إدارة حسابك في مراسل جدة العقاري.',
};


export default function PersonalInfo() {
    return (
        <div className="space-y-4 lg:space-y-6">
            <BasicInfoForm />
            <DeleteAccountSection />
        </div>

    )
}