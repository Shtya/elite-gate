import PrimaryButton from "@/components/shared/Button";
import SectionTitle from "@/components/shared/SectionTitle";
import SelectInput from "@/components/shared/Forms/SelectInput";
import { BsArrowRight } from "react-icons/bs";
import ListPropertyFilterBar from "./ListPropertyFilterBar";
import ListProperty from "./ListProperty";
import { Property } from "@/types/global";
import { properties } from "@/constants/projects";



export default function ListedPropertySection() {
    return (
        <section className="bg-[var(--bg-2)] py-[60px] lg:py-[120px] relative">
            <div className="container">

                <SectionTitle arrowTitle="المشاريع" title="قائمة المشاريع" description="يمكن شراء العقارات ، ويمكن أن تكون فرصة استثمارية قيّمة." />
                <ListPropertyFilterBar />
                <ListProperty properties={properties} />
            </div>
        </section>

    )
}