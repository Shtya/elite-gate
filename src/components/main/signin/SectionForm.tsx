'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TextInput from '@/components/shared/TextInput';
import OtpForm from './OtpForm';
import PasswordForm from './PasswordForm';
import Logo from '@/components/shared/Logo';

export default function SectionForm(
) {
    const [activeTab, setActiveTab] = useState<'password' | 'otp'>('password');
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpCooldown, setOtpCooldown] = useState(false);
    const [otp, setOtp] = useState('');

    const handleSendOtp = () => {
        if (!email) return;
        setOtpSent(true);
        setOtpCooldown(true);
        setTimeout(() => setOtpCooldown(false), 60000);
    };

    return (
        <div className="w-full lg:w-[50%] bg-white p-8 flex flex-col">
            <Logo />
            <h3 className="text-3xl font-bold mb-4 text-[var(--primary-dark)] text-center">مرحبًا بعودتك!</h3>
            <p className="text-[var(--neutral-600)] mb-8 text-center">
                {activeTab === 'password'
                    ? 'يرجى تسجيل الدخول باستخدام بياناتك'
                    : 'أدخل بريدك الإلكتروني لإرسال رمز التحقق'}
            </p>

            <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <form className="grid grid-cols-12 gap-4 flex-1">
                {(!otpSent || activeTab === 'password') && (
                    <TextInput
                        id="email"
                        name="email"
                        label="البريد الإلكتروني"
                        placeholder="أدخل بريدك الإلكتروني"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                )}

                {activeTab === 'password' && <PasswordForm />}
                {activeTab === 'otp' && (
                    <OtpForm
                        otpSent={otpSent}
                        otpCooldown={otpCooldown}
                        otp={otp}
                        setOtp={setOtp}
                        email={email}
                        handleSendOtp={handleSendOtp}
                    />
                )}

                <div className="col-span-12 text-center text-sm text-[var(--neutral-600)] mt-4">
                    ليس لديك حساب؟{' '}
                    <Link href="/sign-up" className="text-primary font-semibold underline">
                        إنشاء حساب
                    </Link>
                </div>
            </form>
        </div>
    );
}

function AuthTabs({ activeTab, setActiveTab }: any) {
    return (
        <div className="mb-6 flex gap-4">
            <button
                onClick={() => setActiveTab('password')}
                className={`px-4 py-2 rounded-full font-semibold transition ${activeTab === 'password'
                    ? 'bg-primary text-white'
                    : 'bg-[var(--bg-1)] text-[var(--neutral-700)]'
                    }`}
            >
                تسجيل بكلمة المرور
            </button>
            <button
                onClick={() => setActiveTab('otp')}
                className={`px-4 py-2 rounded-full font-semibold transition ${activeTab === 'otp'
                    ? 'bg-primary text-white'
                    : 'bg-[var(--bg-1)] text-[var(--neutral-700)]'
                    }`}
            >
                تسجيل برمز تحقق
            </button>
        </div>
    );
}


