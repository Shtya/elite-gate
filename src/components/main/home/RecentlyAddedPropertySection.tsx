import PrimaryButton from "@/components/shared/Button";
import SectionTitle from "@/components/shared/SectionTitle";
import SelectInput from "@/components/shared/SelectInput";
import { BsArrowRight } from "react-icons/bs";
import ListPropertyFilterBar from "./ListPropertyFilterBar";
import ListProperty from "./ListProperty";
import { Property } from "@/types/global";
import { properties } from "@/constants/projects";



export default function RecentlyAddedPropertySection() {
    return (
        <section className="bg-[var(--bg-2)] py-[60px] lg:py-[120px] relative">
            <div className="container">
                <SectionTitle
                    arrowTitle="المشاريع"
                    title="أحدث المشاريع"
                    description="اكتشف أحدث الوحدات العقارية المضافة حديثًا — فرص سكنية واستثمارية مختارة بعناية لتناسب تطلعاتك."
                />
                <ListProperty properties={properties} max={4} />
            </div>
        </section>
    );
}
