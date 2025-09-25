"use client";

import { useEffect, useMemo, useState } from "react";
import { Control, Controller, useForm, useFieldArray, useWatch } from "react-hook-form";
import Card from "@/components/shared/Card";
import TextInput from "@/components/shared/Forms/TextInput";
import EditFAQSection from "./EditFAQSection";
import { faqGroups } from "@/components/main/faq/FeqTaps";
import PrimaryButton from "@/components/shared/Button";
import SoftActionButton from "@/components/shared/SoftActionButton";
import SidebarTabs from "@/components/shared/SidebarTabs";

export type FAQGroup = {
    title: string;
    items: { question: string; answer: string }[];
};

export type FaqFormValues = {
    faqGroups: FAQGroup[];
};


export default function FaqTabsForm() {
    const { control, handleSubmit } = useForm<FaqFormValues>({
        defaultValues: { faqGroups: faqGroups },
    });

    const { fields, append, remove } = useFieldArray({ control: control as unknown as Control<any>, name: "faqGroups" });
    const watchedGroups = useWatch({ control, name: "faqGroups" }) as FAQGroup[] | undefined;
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!watchedGroups || watchedGroups.length === 0) {
            setActiveIndex(0);
            return;
        }
        if (activeIndex > watchedGroups.length - 1) {
            setActiveIndex(watchedGroups.length - 1);
        }
    }, [watchedGroups?.length]);

    const titles = useMemo(() => {
        const list = watchedGroups ?? fields.map(f => ({ title: (f as any).title ?? "" } as FAQGroup));
        return list.map((g, i) => `${String(i + 1).padStart(2, "0")}. ${g.title || "مجموعة جديدة"}`);
    }, [watchedGroups, fields]);

    const onSubmit = (values: FaqFormValues) => {
        console.log("Save FAQ groups", values);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-6">
            <div className="col-span-12 xl:!col-span-4">
                <aside className="sticky top-24">
                    <Card>
                        <SidebarTabs
                            titles={titles}
                            activeIndex={activeIndex}
                            onSelect={(i) => setActiveIndex(i)}
                            onRemove={(i) => {
                                const total = watchedGroups?.length ?? fields.length;
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
                                const next = (watchedGroups?.length ?? fields.length) + 1;
                                const padded = String(next).padStart(2, "0");
                                append({ title: `مجموعة جديدة (${padded})`, items: [] });
                                setActiveIndex((watchedGroups?.length ?? fields.length));
                            }}
                            className="mt-3 text-right focus:outline-none flex gap-2 items-center font-semibold py-3 px-5 rounded-full transition bg-white text-primary border border-primary hover:bg-primary hover:text-white"
                        >
                            + إضافة مجموعة جديدة
                        </button>
                    </Card>
                </aside>
            </div>

            <div className="col-span-12 xl:!col-span-8">
                <Card title="عنوان المجموعة" className="mb-4">
                    <Controller
                        control={control}
                        name={`faqGroups.${activeIndex}.title`}
                        render={({ field }) => (
                            <TextInput id="faq-group-title" label="العنوان" placeholder="العنوان" {...field} />
                        )}
                    />
                </Card>

                <Card title="الأسئلة">
                    <EditFAQSection key={activeIndex} control={control as unknown as Control<any>} name={`faqGroups.${activeIndex}.items`} />
                </Card>
            </div>
            <div className="col-span-12 flex items-center gap-6 flex-wrap mt-3">
                <PrimaryButton type="submit">
                    حفظ التغييرات
                </PrimaryButton>
                <SoftActionButton onClick={() => { }}>إلغاء</SoftActionButton>
            </div>
        </form>
    );
}


