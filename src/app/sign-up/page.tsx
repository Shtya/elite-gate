import PrimaryButton from '@/components/shared/Button';
import LogoLink from '@/components/shared/LogoLink';
import TextInput from '@/components/shared/TextInput';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata = {
    title: 'إنشاء حساب',
    description: 'أنشئ حسابك الجديد على منصة مراسل جدة العقاري وابدأ رحلتك في استكشاف وامتلاك العقارات بكل سهولة وأمان.',
};


export default function SignUpPage() {
    return (
        <section className="py-20 bg-[var(--bg-1)]">
            <div className="container max-w-[1200px] mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-stretch justify-between  rounded-tr-2xl rounded-br-2xl custom-shadow ">

                    {/* Form Section */}
                    <div className="w-full lg:w-[50%] bg-white rounded-tr-2xl rounded-br-2xl p-8 ">
                        <LogoLink />
                        <form>

                            <h3 className="text-3xl font-bold mb-4 text-[var(--primary-dark)] text-center">لنبدأ الآن!</h3>
                            <p className="text-[var(--neutral-600)] mb-8 text-center">يرجى إدخال بياناتك للانضمام إلينا</p>

                            <div className="grid grid-cols-12 gap-4">
                                <TextInput
                                    id="name"
                                    name="name"
                                    label="الاسم"
                                    placeholder="أدخل الاسم"
                                />
                                <TextInput
                                    id="enter-email"
                                    name="email"
                                    label="البريد الإلكتروني"
                                    placeholder="أدخل بريدك الإلكتروني"
                                    type="email"
                                />
                                <TextInput
                                    id="enter-phone"
                                    name="phone"
                                    label="الهاتف"
                                    placeholder="أدخل الهاتف"
                                    type="text"
                                />
                                <TextInput
                                    id="enter-password"
                                    name="password"
                                    label="كلمة المرور"
                                    placeholder="أدخل كلمة المرور"
                                    type="password"
                                />

                                <div className="col-span-12">
                                    <PrimaryButton
                                        type="submit"
                                        className="w-full py-3 px-6 rounded-full bg-primary text-white hover:bg-primary/90 font-semibold transition"
                                    >
                                        إنشاء حساب
                                    </PrimaryButton>

                                    <div className="col-span-12 text-center text-sm text-[var(--neutral-600)] mt-4">
                                        لديك حساب بالفعل؟{' '}
                                        <Link href="/sign-in" className="text-primary font-semibold underline">
                                            تسجيل الدخول
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* Image Section */}
                    <div className="w-full lg:w-[50%] bg-primary-light flex items-center justify-center rounded-tl-2xl rounded-bl-2xl">

                        <Image
                            src="/main/admin-signin.png"
                            alt="تسجيل الدخول"
                            width={667}
                            height={639}
                            className="max-w-full lg:max-w-[500px] xl:max-w-[550px] rounded-xl"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
