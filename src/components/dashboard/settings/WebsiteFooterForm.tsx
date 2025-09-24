'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Card from '@/components/shared/Card';
import TextareaInput from '@/components/shared/Forms/TextareaInput';
import PrimaryButton from '@/components/shared/Button';
import SoftActionButton from '@/components/shared/SoftActionButton';

type FormValues = {
    footerTitle?: string;
    footerParagraph?: string;
    newsletterTitle?: string;
    newsletterParagraph?: string;
};

type Props = {
    defaultValues?: Partial<FormValues>;

};

export default function WebsiteFooterForm({ defaultValues = {} }: Props) {
    const { handleSubmit, control } = useForm<FormValues>({
        defaultValues,
    });

    const submit = async (values: FormValues) => {
        console.log("save footer")
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="space-y-6">
            <Card title="الفوتر" className="space-y-4">


                <Controller
                    name="footerParagraph"
                    control={control}
                    render={({ field }) => (
                        <TextareaInput
                            id="footer-paragraph"
                            name={field.name}
                            label="فقرة الفوتر"
                            placeholder="أدخل نص الفوتر (فقرة تعريفية، حقوق الملكية، روابط قصيرة...)"
                            value={field.value ?? ''}
                            onChange={field.onChange}
                        />
                    )}
                />


                <Controller
                    name="newsletterTitle"
                    control={control}
                    render={({ field }) => (
                        <TextareaInput
                            id="newsletter-title"
                            name={field.name}
                            label="عنوان النشرة"
                            placeholder="مثال: اشترك لتصلك آخر العروض"
                            value={field.value ?? ''}
                            onChange={field.onChange}
                        />
                    )}
                />

                <Controller
                    name="newsletterParagraph"
                    control={control}
                    render={({ field }) => (
                        <TextareaInput
                            id="newsletter-paragraph"
                            name={field.name}
                            label="فقرة النشرة"
                            placeholder="نص يشرح ما سيحصل عليه المشتركون"
                            value={field.value ?? ''}
                            onChange={field.onChange}
                        />
                    )}
                />

            </Card>

            <div className='space-x-4 flex items-center justify-start'>
                <PrimaryButton type="submit">
                    حفظ الفوتر
                </PrimaryButton>
                <SoftActionButton onClick={() => { }}>إلغاء</SoftActionButton>
            </div>
        </form>
    );
}
