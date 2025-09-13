'use client';

import React, { useState } from 'react';
import TextInput from '@/components/shared/TextInput';
import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setSubmitted(true);
    };

    return (
        <section className="py-20 bg-[var(--bg-1)]">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center">
                    <div className="w-full lg:w-[60%] bg-white p-8 custom-shadow rounded-2xl">
                        <h3 className="text-3xl font-bold mb-4 text-[var(--primary-dark)]">
                            تغيير كلمة المرور
                        </h3>

                        {!submitted ? (
                            <>
                                <p className="text-[var(--neutral-600)] mb-8">
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
                                        <button
                                            type="submit"
                                            className="w-full py-3 px-6 rounded-full bg-primary text-white hover:bg-primary/90 font-semibold transition"
                                        >
                                            إرسال الرابط
                                        </button>
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
                        <Link
                            href="/sign-in"
                            className="mt-4 inline-block text-[var(--primary)] font-semibold underline hover:text-[var(--primary-dark)] transition"
                        >
                            العودة إلى صفحة تسجيل الدخول
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
