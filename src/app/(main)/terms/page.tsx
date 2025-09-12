import TermsTabs from "@/components/main/terms/TermsTabs";
import PageHeader from "@/components/shared/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "الشروط والأحكام",
};


export default function TermsPage() {
    return (
        <div className="bg-bg-2">
            <PageHeader title="الشروط والأحكام" description="يرجى قراءة شروط الخدمة هذه بعناية قبل حجز خدمتنا." />
            <div className="bg-bg-2 relative before:absolute before:w-full before:h-[150px] before:top-0 before:left-0 before:bg-dark">
                <TermsTabs />
            </div>
        </div>
    );
}