
'use client';

import React, { useState } from 'react';
import Card from '@/components/shared/Card';
import TextInput from '@/components/shared/TextInput';
import PrimaryButton from '@/components/shared/Button';
import SoftActionButton from '@/components/shared/SoftActionButton';

type BasicInfo = {
    fullName: string;
    email: string;
    phone: string;
};

export default function BasicInfoForm() {
    const [info, setInfo] = useState<BasicInfo>({
        fullName: '',
        email: '',
        phone: '',
    });

    const [selectedImage, setSelectedImage] = useState<string>('/users/user-1.jpg');

    const handleChange =
        (key: keyof BasicInfo) =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setInfo((prev) => ({ ...prev, [key]: e.target.value }));
            };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('تم الإرسال:', info, selectedImage);
    };

    const handleCancel = () => {
        setInfo({ fullName: '', email: '', phone: '' });
        setSelectedImage('/users/user-1.jpg');
    };

    return (
        <Card title='المعلومات الاساسية'>
            {/* رفع الصورة */}
            <div className="relative mx-auto mb-6 w-[180px] h-[180px]">
                <div className="avatar-upload__edit">
                    <input
                        id="imageUpload"
                        accept=".png, .jpg, .jpeg"
                        className="hidden"
                        type="file"
                        onChange={handleImageChange}
                    />
                    <label
                        htmlFor="imageUpload"
                        className="avatar-upload__label absolute inset-0 cursor-pointer"
                    />
                </div>
                <img
                    alt="الصورة الشخصية"
                    loading="lazy"
                    width={180}
                    height={180}
                    className="rounded-full border-[6px] border-[#F5F5FE] shadow-md"
                    src={selectedImage}
                />
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