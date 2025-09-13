import ProjectsFilterPanel from "@/components/main/projects/ProjectsFilterPanel";
import PropertyCardsDisplay from "@/components/main/projects/PropertyCardsDisplay";
import PropertyPagination from "@/components/main/projects/PropertyPagination";
import PropertyToolbar from "@/components/main/projects/PropertyToolbar";
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

export default function ProjectsPage() {
    return (
        <div className="py-[30px] lg:py-[60px] bg-[var(--bg-2)] px-3">
            <div className="container">
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 ">
                    <div className="flex-1">
                        <ProjectsFilterPanel />
                    </div>
                    <div className="flex-2">
                        <div className="grid grid-cols-12 gap-4 xl:gap-6">
                            <div className="col-span-12">
                                <PropertyToolbar total={20} shown={5} />
                            </div>
                            <div className="col-span-12">
                                <PropertyCardsDisplay properties={properties} />
                                <PropertyPagination pageCount={20} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}