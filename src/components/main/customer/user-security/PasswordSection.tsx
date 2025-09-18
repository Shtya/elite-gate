'use client';

import React, { useState } from 'react';
import { FaLock, FaArrowLeft } from 'react-icons/fa';
import Card from '@/components/shared/Card';
import TextInput from '@/components/shared/Forms/TextInput';
import PrimaryButton from '@/components/shared/Button';
import SoftActionButton from '@/components/shared/SoftActionButton';

export default function PasswordSection() {
    const [form, setForm] = useState({
        current: '',
        new: '',
        confirm: '',
    });

    const handleChange = (key: keyof typeof form) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // تنفيذ منطق التحديث هنا
        console.log('تم تحديث كلمة المرور:', form);
    };

    const handleCancel = () => {
        setForm({ current: '', new: '', confirm: '' });
    };

    return (
        <Card title='كلمة المرور' hasMinHeight={true}>

            {/* النموذج */}
            <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
                <TextInput
                    id="current-password"
                    name="current"
                    type="password"
                    label="كلمة المرور الحالية"
                    placeholder="أدخل كلمة المرور الحالية"
                    value={form.current}
                    onChange={handleChange('current')}
                    required
                />

                <TextInput
                    id="new-password"
                    name="new"
                    type="password"
                    label="كلمة المرور الجديدة"
                    placeholder="أدخل كلمة المرور الجديدة"
                    value={form.new}
                    onChange={handleChange('new')}
                    required
                />

                <TextInput
                    id="confirm-password"
                    name="confirm"
                    type="password"
                    label="تأكيد كلمة المرور"
                    placeholder="أعد إدخال كلمة المرور"
                    value={form.confirm}
                    onChange={handleChange('confirm')}
                    required
                />

                {/* متطلبات كلمة المرور */}
                <div className="col-span-12">
                    <h5 className="font-medium mb-4 text-gray-700">متطلبات كلمة المرور:</h5>
                    <ul className="list-disc pl-5 text-gray-600 space-y-2 mr-[18px]">
                        <li>يجب أن تحتوي على 8 أحرف على الأقل</li>
                        <li>حرف صغير واحد على الأقل</li>
                        <li>حرف كبير واحد على الأقل</li>
                        <li>رقم أو رمز أو مسافة واحدة على الأقل</li>
                    </ul>
                </div>

                {/* أزرار الإجراء */}
                <div className="col-span-12 flex items-center gap-4 flex-wrap">
                    <PrimaryButton type="submit" >
                        تحديث كلمة المرور
                    </PrimaryButton>

                    <SoftActionButton onClick={handleCancel}>
                        إلغاء
                    </SoftActionButton>
                </div>
            </form>
        </Card>
    );
}
