import { useState } from "react";
import FavoritePropertiesChooser, { fevorateProperty } from "@/components/dashboard/Property Filter/FavoritePropertiesChooser";
import { properties } from "@/constants/projects";
import PrimaryButton from "@/components/shared/Button";
import SoftActionButton from "@/components/shared/SoftActionButton";
const favoritProperties: fevorateProperty[] = [
    { id: "1", title: "شقة فاخرة", imageLink: "/images/apt1.jpg", type: "apartment" },
    { id: "2", title: "فيلا حديثة", imageLink: "/images/villa.jpg", type: "villa" },
    { id: "3", title: "مكتب إداري", imageLink: "/images/office.jpg", type: "office" },
    { id: "4", title: "أرض سكنية", imageLink: "/images/land.jpg", type: "office" },
];

export default function FavoritePropertiesForm() {
    const [saving, setSaving] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>(favoritProperties.map(p => p.id));

    const handleSave = async () => {
        setSaving(true);
        try {
            // TODO: call API to persist selectedIds
            console.log("Saving favorite property IDs:", selectedIds);
            await new Promise(r => setTimeout(r, 500));
        } finally {
            setSaving(false);
        }
    };

    return <div>
        <FavoritePropertiesChooser
            properties={properties}
            label="العقار"
            max={5}
            defaultValue={favoritProperties}
            onChange={(list) => {
                // list is Property[]
                setSelectedIds(list.map(p => p.id));
            }}
        />

        <div className="col-span-12 flex items-center gap-6 flex-wrap mt-4">
            <PrimaryButton type="button" onClick={handleSave}>
                {saving ? "جاري الحفظ..." : "حفظ الإعدادات"}
            </PrimaryButton>
            <SoftActionButton>
                إلغاء
            </SoftActionButton>
        </div>
    </div>
}