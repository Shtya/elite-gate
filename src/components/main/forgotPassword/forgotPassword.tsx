'use client';

import React, { useState } from 'react';
import TextInput from '@/components/shared/Forms/TextInput';
import PrimaryButton from '@/components/shared/Button';
import { FaCheckCircle } from 'react-icons/fa';

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setSubmitted(true);
    };

    return (
        <>
            {!submitted ? (
                <>
                    <p className="text-[var(--neutral-600)] mb-8 text-center">
                        أدخل بريدك الإلكتروني لإرسال رابط إعادة تعيين كلمة المرور
                    </p>
                    <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
                        <TextInput
                            id="email"
                            name="email"
                            label="البريد الإلكتروني"
                            placeholder="أدخل بريدك الإلكتروني"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="col-span-12">
                            <PrimaryButton
                                type="submit"
                                className="w-full py-3 px-6 rounded-full bg-primary text-white hover:bg-primary/90 font-semibold transition"
                            >
                                إرسال الرابط
                            </PrimaryButton>
                        </div>
                    </form>
                </>
            ) : (
                <div className="bg-[var(--secondary-light)] text-[var(--dark)] p-6 rounded-xl text-center border border-[var(--secondary-400)] shadow-sm">
                    <div className="flex flex-col items-center justify-center gap-3">
                        <FaCheckCircle className="text-[var(--secondary-400)] text-4xl" />
                        <h4 className="text-2xl font-bold">تم إرسال الرابط بنجاح</h4>
                        <p className="text-lg max-w-xl">
                            لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني{' '}
                            <span className="font-semibold text-[var(--secondary-500)] underline">{email}</span>. يرجى التحقق من صندوق الوارد واتبع التعليمات لتغيير كلمة المرور الخاصة بك.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
