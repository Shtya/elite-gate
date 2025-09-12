
import FeqTaps from "@/components/main/faq/FeqTaps";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "الأسئلة الشائعة",
};


export default function FaqPage() {

    return (
        <div className="py-[60px] lg:py-[120px] bg-white px-3">
            <div className="container">
                <div className="grid grid-cols-12 gap-4 justify-content-xxl-between">
                    <FeqTaps />
                </div>
            </div>
        </div>
    );
}