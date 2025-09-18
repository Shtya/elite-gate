
'use client';

import React, { useState } from 'react';
import Card from '@/components/shared/Card';
import TextInput from '@/components/shared/Forms/TextInput';
import PrimaryButton from '@/components/shared/Button';
import SoftActionButton from '@/components/shared/SoftActionButton';

type BasicInfo = {
    fullName: string;
    email: string;
    phone: string;
    image: string;
};



export default function BasicInfoForm() {
    const [info, setInfo] = useState<BasicInfo>({
        fullName: '',
        email: '',
        phone: '',
        image: '/users/user-1.jpg',
    });
    ;

    const handleChange =
        (key: keyof BasicInfo) =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setInfo((prev) => ({ ...prev, [key]: e.target.value }));
            };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setInfo((prev) => ({ ...prev, image: imageUrl }));
        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('تم الإرسال:', info);
    };

    const handleCancel = () => {
        setInfo({
            fullName: '',
            email: '',
            phone: '',
            image: '/users/user-1.jpg',
        });
    };


    return (
        <Card title='المعلومات الاساسية'>
            {/* رفع الصورة */}
            <div className="relative mx-auto mb-6 w-[180px] h-[180px]">
                <input
                    id="imageUpload"
                    accept=".png, .jpg, .jpeg"
                    className="hidden"
                    type="file"
                    onChange={handleImageChange}
                />
                <label htmlFor="imageUpload" className="cursor-pointer">
                    <img
                        alt="الصورة الشخصية"
                        loading="lazy"
                        width={180}
                        height={180}
                        className="rounded-full border-[6px] border-[#F5F5FE] shadow-md"
                        src={info.image}
                    />
                    <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 112.828 2.828L11.828 15H9v-2z" />
                        </svg>
                    </div>
                </label>
            </div>

            {/* النموذج */}
            <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
                <TextInput
                    id="full-name"
                    name="fullName"
                    label="الاسم الكامل"
                    placeholder="أدخل الاسم"
                    value={info.fullName}
                    onChange={handleChange('fullName')}
                    required
                />

                <TextInput
                    id="user-email"
                    name="email"
                    type="email"
                    label="البريد الإلكتروني"
                    placeholder="أدخل البريد الإلكتروني"
                    value={info.email}
                    onChange={handleChange('email')}
                    required
                />

                <TextInput
                    id="user-phone"
                    name="phone"
                    type="text"
                    label="رقم الهاتف"
                    placeholder="أدخل الرقم"
                    value={info.phone}
                    onChange={handleChange('phone')}
                />

                <div className="col-span-12 flex items-center gap-6 flex-wrap">
                    <PrimaryButton
                        type="submit"
                    >
                        حفظ التغييرات
                    </PrimaryButton>
                    <SoftActionButton onClick={handleCancel}>
                        إلغاء
                    </SoftActionButton>
                </div>
            </form>
        </Card>
    );
}