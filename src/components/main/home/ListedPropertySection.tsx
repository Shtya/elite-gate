import PrimaryButton from "@/components/shared/Button";
import SectionTitle from "@/components/shared/SectionTitle";
import SelectInput from "@/components/shared/SelectInput";
import { BsArrowRight } from "react-icons/bs";
import ListPropertyFilterBar from "./ListPropertyFilterBar";
import ListProperty from "./ListProperty";
import { Property } from "@/types/global";

const properties: Property[] = [
    {
        imageLink: '/ce9724a3-a985-44c0-b92a-acb35a1ca502.webp',
        type: 'فيلا',
        title: 'فيلا الزمرد 362',
        link: '/projects/emerald-362',
        rooms: '9 غرف نوم',
        beds: '7 حمامات',
        area: '650 متر مربع',
    },
    {
        imageLink: '/ce9724a3-a985-44c0-b92a-acb35a1ca502.webp',
        type: 'فيلا',
        title: 'فيلا الزمرد 362',
        link: '/projects/emerald-362',
        rooms: '9 غرف نوم',
        beds: '7 حمامات',
        area: '650 متر مربع',
    },
    {
        imageLink: '/ce9724a3-a985-44c0-b92a-acb35a1ca502.webp',
        type: 'فيلا',
        title: 'فيلا الزمرد 362',
        link: '/projects/emerald-362',
        rooms: '9 غرف نوم',
        beds: '7 حمامات',
        area: '650 متر مربع',
    },
    {
        imageLink: '/ce9724a3-a985-44c0-b92a-acb35a1ca502.webp',
        type: 'فيلا',
        title: 'فيلا الزمرد 362',
        link: '/projects/emerald-362',
        rooms: '9 غرف نوم',
        beds: '7 حمامات',
        area: '650 متر مربع',
    },
    {
        imageLink: '/ce9724a3-a985-44c0-b92a-acb35a1ca502.webp',
        type: 'فيلا',
        title: 'فيلا الزمرد 362',
        link: '/projects/emerald-362',
        rooms: '9 غرف نوم',
        beds: '7 حمامات',
        area: '650 متر مربع',
    },
    {
        imageLink: '/ce9724a3-a985-44c0-b92a-acb35a1ca502.webp',
        type: 'فيلا',
        title: 'فيلا الزمرد 362',
        link: '/projects/emerald-362',
        rooms: '9 غرف نوم',
        beds: '7 حمامات',
        area: '650 متر مربع',
    },
    {
        imageLink: '/ce9724a3-a985-44c0-b92a-acb35a1ca502.webp',
        type: 'فيلا',
        title: 'فيلا الزمرد 362',
        link: '/projects/emerald-362',
        rooms: '9 غرف نوم',
        beds: '7 حمامات',
        area: '650 متر مربع',
    },
    {
        imageLink: '/ce9724a3-a985-44c0-b92a-acb35a1ca502.webp',
        type: 'فيلا',
        title: 'فيلا الزمرد 362',
        link: '/projects/emerald-362',
        rooms: '9 غرف نوم',
        beds: '7 حمامات',
        area: '650 متر مربع',
    },
    // Add more properties here...
];

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