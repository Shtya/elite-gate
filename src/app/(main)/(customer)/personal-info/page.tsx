import BasicInfoForm from "@/components/main/customer/personal-info/BasicInfoForm";
import DeleteAccountSection from "@/components/main/customer/personal-info/DeleteAccountSection";
import { ClientRow } from "@/types/dashboard/client";


export const metadata = {
    title: 'المعلومات الشخصية',
    description: 'قم بتحديث بياناتك الشخصية أو إدارة حسابك في مراسل جدة العقاري.',
};


const currentClient: Omit<ClientRow, 'joinedAt'> = {
    id: 1,
    name: 'Peter Parker',
    email: 'info@example.com',
    phone: '+966 500 123 456',
    image: '/users/user-1.jpg',
    status: 'active',
};

export default function PersonalInfo() {
    return (
        <div className="space-y-4 lg:space-y-6">
            <BasicInfoForm client={currentClient} isCurentUser={true} />
            <DeleteAccountSection />
        </div>
    );
}