import DashboardHeaderTitle from "@/components/dashboard/DashboardHeaderTitle";
import DashboardSectionCard from "@/components/dashboard/DashboardSectionCard";
import FavoritePropertiesChooser, { fevorateProperty } from "@/components/dashboard/Property Filter/FavoritePropertiesChooser";
import CenteredContainer from "@/components/shared/CenteredContainer";
import { properties } from "@/constants/projects";


const favoritProperties: fevorateProperty[] = [
    { id: "1", title: "شقة فاخرة", imageLink: "/images/apt1.jpg", type: "apartment" },
    { id: "2", title: "فيلا حديثة", imageLink: "/images/villa.jpg", type: "villa" },
    { id: "3", title: "مكتب إداري", imageLink: "/images/office.jpg", type: "office" },
    { id: "4", title: "أرض سكنية", imageLink: "/images/land.jpg", type: "office" },
]

export default function favoritPropertiesPage() {
    return (
        <div>
            <DashboardHeaderTitle path={["العقارات المفضلة"]} />
            <CenteredContainer>
                <DashboardSectionCard className="mt-4 lg:mt-6" title="العقارات المفضلة">
                    <FavoritePropertiesChooser properties={properties} label="العقار" max={5} defaultValue={favoritProperties} />
                </DashboardSectionCard>
            </CenteredContainer>
        </div>
    );
}