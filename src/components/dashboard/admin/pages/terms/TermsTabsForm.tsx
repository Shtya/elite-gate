"use client";

import { useEffect, useMemo, useState } from "react";
import { Control, Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import Card from "@/components/shared/Card";
import TextInput from "@/components/shared/Forms/TextInput";
import TextareaInput from "@/components/shared/Forms/TextareaInput";
import PrimaryButton from "@/components/shared/Button";
import SoftActionButton from "@/components/shared/SoftActionButton";
import { realEstateContent } from "@/components/main/terms/TermsTabs";
import SidebarTabs from "@/components/shared/SidebarTabs";


export type Term = { title: string; description: string };
export type TermsFormValues = {
    pageTitle: string;
    pageSubtitle: string;
    terms: Term[];
};

export default function TermsTabsForm() {
    const { control, handleSubmit } = useForm<TermsFormValues>({
        defaultValues: {
            pageTitle: "الشروط والأحكام",
            pageSubtitle: "يرجى قراءة شروط الخدمة هذه بعناية قبل حجز خدمتنا.",
            terms: realEstateContent.map((t) => ({ title: t.title, description: t.description })),
        },
    });

    const { fields, append, remove } = useFieldArray({ control: control as unknown as Control<any>, name: "terms" });
    const watchedTerms = useWatch({ control, name: "terms" }) as Term[] | undefined;
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const total = watchedTerms?.length ?? fields.length;
        if (!total) { setActiveIndex(0); return; }
        if (activeIndex > total - 1) setActiveIndex(total - 1);
    }, [watchedTerms?.length]);

    const titles = useMemo(() => {
        const list = watchedTerms ?? (fields as Array<{ title?: string }>).map(f => ({ title: (f as any).title ?? "" }));
        return list.map((t, i) => `${String(i + 1).padStart(2, "0")}. ${t.title || "بند جديد"}`);
    }, [watchedTerms, fields]);

    const onSubmit = (values: TermsFormValues) => {
        console.log("Save Terms content", values);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-6">
            <Card title="بيانات الصفحة" className="mb-2 col-span-12"  >
                <div className="grid grid-cols-12 gap-4">
                    <Controller control={control} name="pageTitle" render={({ field }) => (
                        <TextInput id="terms-page-title" label="عنوان الصفحة" placeholder="عنوان الصفحة" {...field} />
                    )} />
                    <Controller control={control} name="pageSubtitle" render={({ field }) => (
                        <TextInput id="terms-page-subtitle" label="وصف الصفحة" placeholder="وصف مختصر" {...field} />
                    )} />
                </div>
            </Card>

            {/* Sidebar tabs */}
            <div className="col-span-12 xl:!col-span-4">
                <aside className="sticky top-24">
                    <Card>
                        <SidebarTabs
                            titles={titles}
                            activeIndex={activeIndex}
                            onSelect={(i) => setActiveIndex(i)}
                            onRemove={(i) => {
                                const total = watchedTerms?.length ?? fields.length;
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
                                const next = (watchedTerms?.length ?? fields.length) + 1;
                                const padded = String(next).padStart(2, "0");
                                append({ title: `بند جديد (${padded})`, description: "" } as any);
                                setActiveIndex((watchedTerms?.length ?? fields.length));
                            }}
                            className="mt-3 text-right focus:outline-none flex gap-2 items-center font-semibold py-3 px-5 rounded-full transition bg-white text-primary border border-primary hover:bg-primary hover:text-white"
                        >
                            + إضافة بند جديد
                        </button>
                    </Card>
                </aside>
            </div>

            {/* Right side: page title/subtitle and current term */}
            <div className="col-span-12 xl:!col-span-8 space-y-4">


                <Card title="عنوان البند" className="mb-2">
                    <Controller control={control} key={activeIndex} name={`terms.${activeIndex}.title`} render={({ field }) => (
                        <TextInput id="term-title" label="العنوان" placeholder="عنوان البند" {...field} />
                    )} />
                </Card>

                <Card title="نص البند">
                    <Controller control={control} key={`desc-${activeIndex}`} name={`terms.${activeIndex}.description`} render={({ field }) => (
                        <TextareaInput id="term-description" placeholder="اكتب وصف البند هنا" {...field} />
                    )} />
                </Card>

            </div>
            <div className="col-span-12 flex items-center gap-6 flex-wrap mt-1">
                <PrimaryButton type="submit">حفظ التغييرات</PrimaryButton>
                <SoftActionButton onClick={() => { }}>إلغاء</SoftActionButton>
            </div>
        </form>
    );
}


