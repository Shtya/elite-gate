"use client";

import DashboardHeaderTitle from "@/components/dashboard/DashboardHeaderTitle";
import DashboardSectionCard from "@/components/dashboard/DashboardSectionCard";
import FavoritePropertiesForm from "@/components/dashboard/Property Filter/FavoritePropertiesForm";
import CenteredContainer from "@/components/shared/CenteredContainer";


export default function FavoritPropertiesPage() {


    return (
        <div>
            <DashboardHeaderTitle path={["العقارات المفضلة"]} />
            <CenteredContainer>
                <DashboardSectionCard className="mt-4 lg:mt-6" title="العقارات المفضلة">
                    <FavoritePropertiesForm />
                </DashboardSectionCard>
            </CenteredContainer>
        </div>
    );
}
