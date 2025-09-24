"use client";

import { useEffect, useMemo, useState } from "react";
import { Control, Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import Card from "@/components/shared/Card";
import TextInput from "@/components/shared/Forms/TextInput";
import PrimaryButton from "@/components/shared/Button";
import SoftActionButton from "@/components/shared/SoftActionButton";
import EditPolicyItemsSection from "./EditPolicyItemsSection";
import SidebarTabs from "../../../shared/SidebarTabs";
import { PrivacyGroups } from "@/constants/pages/aboutUs";

export type PrivacyPolicy = { title: string; items: string[] };
export type PrivacyFormValues = {
    pageTitle: string;
    pageSubtitle: string;
    policies: PrivacyPolicy[];
};

function flattenDefaultPolicies(): PrivacyPolicy[] {
    return PrivacyGroups.flatMap(group => group.map(p => ({ title: p.title, items: [...p.items] })));
}

export default function PrivacyTabsForm() {
    const { control, handleSubmit } = useForm<PrivacyFormValues>({
        defaultValues: {
            pageTitle: "سياسة الخصوصية",
            pageSubtitle: "نحن نحترم خصوصيتك وملتزمون بحماية بياناتك الشخصية.",
            policies: flattenDefaultPolicies(),
        },
    });

    const { fields, append, remove } = useFieldArray({ control: control as unknown as Control<any>, name: "policies" });
    const watchedPolicies = useWatch({ control, name: "policies" }) as PrivacyPolicy[] | undefined;
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const total = watchedPolicies?.length ?? fields.length;
        if (!total) {
            setActiveIndex(0);
            return;
        }
        if (activeIndex > total - 1) setActiveIndex(total - 1);
    }, [watchedPolicies?.length]);

    const titles = useMemo(() => {
        const list = watchedPolicies ?? (fields as Array<{ title?: string }>).map(f => ({ title: (f as any).title ?? "" }));
        return list.map((p, i) => `${String(i + 1).padStart(2, "0")}. ${p.title || "سياسة جديدة"}`);
    }, [watchedPolicies, fields]);

    const onSubmit = (values: PrivacyFormValues) => {
        console.log("Save Privacy content", values);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-6">
            <Card title="بيانات الصفحة" className="mb-2 col-span-12">
                <div className="grid grid-cols-12 gap-4">
                    <Controller
                        control={control}
                        name="pageTitle"
                        render={({ field }) => (
                            <TextInput id="privacy-page-title" label="عنوان الصفحة" placeholder="عنوان الصفحة" {...field} />
                        )}
                    />
                    <Controller
                        control={control}
                        name="pageSubtitle"
                        render={({ field }) => (
                            <TextInput id="privacy-page-subtitle" label="وصف الصفحة" placeholder="وصف مختصر" {...field} />
                        )}
                    />
                </div>
            </Card>
            {/* Left: Sidebar tabs */}
            <div className="col-span-12 xl:!col-span-4">
                <aside className="sticky top-24">
                    <Card>
                        <SidebarTabs
                            titles={titles}
                            activeIndex={activeIndex}
                            onSelect={(i) => setActiveIndex(i)}
                            onRemove={(i) => {
                                const total = watchedPolicies?.length ?? fields.length;
                                if (total <= 1) return;
                                let nextActive = activeIndex;
                                if (i < activeIndex) nextActive = activeIndex - 1;
                                else if (i === activeIndex) nextActive = activeIndex > 0 ? activeIndex - 1 : 0;
                                remove(i);
                                const newTotal = total - 1;
                                if (nextActive > newTotal - 1) nextActive = Math.max(0, newTotal - 1);
                                setActiveIndex(nextActive);
                            }}
                            canRemove={(i, total) => total > 1}
                            getKey={(t, i) => `${t}-${i}`}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                const next = (watchedPolicies?.length ?? fields.length) + 1;
                                const padded = String(next).padStart(2, "0");
                                append({ title: `سياسة جديدة (${padded})`, items: [] } as any);
                                setActiveIndex((watchedPolicies?.length ?? fields.length));
                            }}
                            className="mt-3 text-right focus:outline-none flex gap-2 items-center font-semibold py-3 px-5 rounded-full transition bg-white text-primary border border-primary hover:bg-primary hover:text-white"
                        >
                            + إضافة سياسة جديدة
                        </button>
                    </Card>
                </aside>
            </div>

            {/* Right: Page title/subtitle and selected policy editor */}
            <div className="col-span-12 xl:!col-span-8 space-y-4">

                <Card title="عنوان السياسة" className="mb-2">
                    <Controller
                        control={control}
                        key={activeIndex}
                        name={`policies.${activeIndex}.title`}
                        render={({ field }) => (
                            <TextInput id="policy-title" label="العنوان" placeholder="عنوان السياسة" {...field} />
                        )}
                    />
                </Card>

                <Card title="نصوص السياسة">
                    <EditPolicyItemsSection control={control as unknown as Control<any>} name={`policies.${activeIndex}.items`} />
                </Card>

            </div>
            <div className="col-span-12 flex items-center gap-6 flex-wrap mt-1">
                <PrimaryButton type="submit">حفظ التغييرات</PrimaryButton>
                <SoftActionButton onClick={() => { }}>إلغاء</SoftActionButton>
            </div>
        </form>
    );
}


