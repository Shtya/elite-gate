// components/dashboard/settings/WebsiteInfoForm.tsx
'use client';

import React from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import AccomplishmentsCard from './AccomplishmentsCard';
import ContactInfoCard from './ContactInfoCard';


type FormValues = {
    email?: string;
    phone?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    snapchat?: string;
    tiktok?: string;
    youtube?: string;

    clients?: number;
    experienceYears?: number;
    projects?: number
};

type Props = {
    defaultValues?: Partial<FormValues>;

};

export default function WebsiteInfoForm({ defaultValues = {} }: Props) {
    const { handleSubmit, control } = useForm<FormValues>({
        defaultValues,
    });

    const submit = async (values: FieldValues) => {
        console.log("save information")
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="space-y-6">
            <ContactInfoCard control={control} />

            <AccomplishmentsCard control={control} />

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="ml-auto px-4 py-2 rounded-md text-white bg-[var(--primary)] hover:bg-[var(--primary-600)]"
                >
                    حفظ التغييرات
                </button>
            </div>
        </form>
    );
}
