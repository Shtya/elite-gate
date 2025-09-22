import { properties } from "@/constants/projects";
import ProjectsFilterPanel from "./ProjectsFilterPanel";
import PropertyCardsDisplay from "./PropertyCardsDisplay";
import PropertyPagination from "./PropertyPagination";
import PropertyToolbar from "./PropertyToolbar";


export default function PropertiesDataView() {
    return (
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
                        <div className="col-span-12 space-y-4 xl:space-y-6">
                            <PropertyCardsDisplay properties={properties} />
                            <PropertyPagination pageCount={20} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}