"use client"
import Image from "next/image";
import Link from "next/link";
import { FiPhoneCall, FiCopy } from "react-icons/fi";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoLocation } from "react-icons/io5";
import { useCallback, useState } from "react";
import PrimaryButton from "../Button";
import LogoIcon from "../LogoIcon";
import LogoWithoutText from "../LogoWithoutText";

export default function TopContactBar() {
  const [copied, setCopied] = useState<"phone" | "email" | null>(null);

  const copy = useCallback(async (text: string, key: "phone" | "email") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch { }
  }, []);

  const phone = "+966 54 364 063";
  const email = "ali@albarakati.net";

  return (
    <header aria-label="شريط التواصل العلوي" className="bg-bg-1 border-b">
      <div className="container mx-auto flex items-center justify-between py-3 lg:py-5 gap-2 px-3">
        {/* Logo (XL) */}
        <div className="flex items-center">
          <Link href="/">

            <div className="hidden xl:block">
              <LogoIcon className="w-[140px] max-md:w-[140px] text-black" />
            </div>
            {/* Favicon (sm) */}
            <div className="relative xl:hidden ml-3 ">
              <LogoWithoutText className="text-black" />
            </div>
          </Link>
        </div>

        {/* Contact Info */}
        <div className="hidden sm:flex items-stretch divide-x">
          {/* Phone */}
          <div className="flex items-center gap-4 px-3 xl:px-4">
            <span className="bg-primary text-white text-2xl p-2 rounded-full inline-flex">
              <FiPhoneCall size={20} aria-hidden />
            </span>
            <div className="hidden lg:flex flex-col">
              <span className="text-xs text-neutral-500">اتصال مجاني</span>
              <div className="flex items-center gap-2">
                <Link
                  aria-label={`الاتصال على ${phone}`}
                  className="text-base hover:underline"
                  href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                >
                  966&nbsp;54&nbsp;364&nbsp;0639+
                </Link>
                <button
                  onClick={() => copy(phone, "phone")}
                  className="p-1 rounded hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  aria-label="نسخ رقم الهاتف"
                  title="نسخ"
                >
                  <FiCopy className="text-sm" />
                </button>
                {copied === "phone" && (
                  <span className="text-xs text-primary">تم النسخ</span>
                )}
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 px-3 xl:px-4">
            <span className="bg-secondary text-neutral-700 text-2xl p-2 rounded-full inline-flex">
              <HiOutlineMailOpen size={20} aria-hidden />
            </span>
            <div className="hidden lg:flex flex-col">
              <span className="text-xs text-neutral-500">الدعم الإلكتروني</span>
              <div className="flex items-center gap-2">
                <Link
                  aria-label={`إرسال بريد إلى ${email}`}
                  className="text-base hover:underline break-all"
                  href={`mailto:${email}`}
                >
                  {email}
                </Link>
                <button
                  onClick={() => copy(email, "email")}
                  className="p-1 rounded hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  aria-label="نسخ البريد الإلكتروني"
                  title="نسخ"
                >
                  <FiCopy className="text-sm" />
                </button>
                {copied === "email" && (
                  <span className="text-xs text-primary">تم النسخ</span>
                )}
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="md:flex items-center gap-4 px-3 xl:px-4">
            <span className="bg-tertiary text-neutral-700 text-2xl p-2 rounded-full inline-flex">
              <IoLocation size={20} aria-hidden />
            </span>
            <div className="hidden lg:flex flex-col">
              <span className="text-xs text-neutral-500">موقعنا</span>
              <span className="text-base">طريق الملك عبدالعزيز، جدة</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <PrimaryButton
          href="/add-property"
          className="btn-primary-lg hidden md:inline-flex focus:outline-none focus:ring-2 focus:ring-primary/30"
          aria-label="أضف عقارك"
        >
          أضف عقارك
        </PrimaryButton>

      </div>
    </header>
  );
}
