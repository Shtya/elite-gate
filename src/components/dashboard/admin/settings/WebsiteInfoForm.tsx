// components/dashboard/settings/WebsiteInfoForm.tsx
'use client';

import React from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import AccomplishmentsCard from './AccomplishmentsCard';
import ContactInfoCard from './ContactInfoCard';
import PrimaryButton from '@/components/shared/Button';
import SoftActionButton from '@/components/shared/SoftActionButton';


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

            <div className='space-x-4 flex items-center justify-start'>
                <PrimaryButton type="submit">
                    حفظ التغييرات
                </PrimaryButton>
                <SoftActionButton onClick={() => { }}>إلغاء</SoftActionButton>
            </div>
        </form>
    );
}
