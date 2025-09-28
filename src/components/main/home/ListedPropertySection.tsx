import SectionTitle from "@/components/shared/SectionTitle";
import ListPropertyFilterBar from "./ListPropertyFilterBar";
import ListProperty from "./ListProperty";
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