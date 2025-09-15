'use client';

import React, { useState } from 'react';
import TextInput from '@/components/shared/TextInput';
import TextareaInput from '@/components/shared/TextareaInput';
import SelectInput from '@/components/shared/SelectInput';
import PrimaryButton from '@/components/shared/Button';

const availableTimes = [
    { value: '', label: 'اختر موعد الزيارة' },
    { value: '07:00-09:00', label: '٠٧:٠٠ م - ٠٩:٠٠ م' },
    { value: '09:00-11:00', label: '٠٩:٠٠ م - ١١:٠٠ م' },
    { value: '06:30-08:30', label: '٠٦:٣٠ م - ٠٨:٣٠ م' },
];

export default function ProjectBookingForm({ id }: { id: string }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        message: '',
        timeSlot: '',
        id: id
    });

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Booking Data:', formData);
    };

    return (
        <section className="sticky top-24  bg-white rounded-xl shadow-md p-6 w-full">
            <h2 className="text-2xl font-bold mb-4">احجز موعد لزيارة المشروع</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <TextInput
                    id="fullName"
                    label="الاسم بالكامل"
                    name="fullName"
                    placeholder="أدخل اسمك"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    required
                />
                <TextInput
                    id="email"
                    label="البريد الإلكتروني"
                    name="email"
                    placeholder="example@mail.com"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                />
                <TextInput
                    id="phone"
                    label="رقم الهاتف"
                    name="phone"
                    placeholder="05xxxxxxxx"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    required
                />
                <SelectInput
                    label="اختر موعد الزيارة"
                    name="timeSlot"
                    options={availableTimes}
                    value={formData.timeSlot}
                    onChange={(val) => handleChange('timeSlot', val)}
                />
                <TextareaInput
                    id="message"
                    label="رسالة"
                    name="message"
                    placeholder="اكتب أي ملاحظات أو استفسارات هنا"
                />
                <PrimaryButton type="submit" className="mt-4 !w-full">
                    احجز الزيارة
                </PrimaryButton>
            </form>
        </section>
    );
}
