import ListProperty from "@/components/main/home/ListProperty";
import PropertyPagination from "@/components/main/projects/PropertyPagination";
import Pagination from "@/components/shared/Pagination";
import { properties } from "@/constants/projects";


export default function FavoritesPage() {
    return (<div className="py-[30px] lg:py-[60px] bg-[var(--bg-2)] px-3">
        <div className="container ">

            <h2 className="h2 mt-4 mb-10">المشاريع المفضلة</h2>
            <ListProperty properties={properties} max={8} />
            <PropertyPagination pageCount={13} />
        </div>
    </div>)
}