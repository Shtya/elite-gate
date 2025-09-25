'use client';

import Link from 'next/link';
import { FiPhoneCall, FiCopy } from 'react-icons/fi';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { IoLocation } from 'react-icons/io5';
import { useCallback, useState } from 'react';
import PrimaryButton from '../Button';
import LogoIcon from '../LogoIcon';
import ContactItem from './ContactItem';

export default function TopContactBar() {
  const [copied, setCopied] = useState<'phone' | 'email' | 'location' | null>(null);

  const copy = useCallback(async (text: string, key: 'phone' | 'email' | 'location') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch { }
  }, []);

  const phone = '966\u00A054\u00A0364\u00A00639+';
  const email = 'ali@albarakati.net';
  const location = 'طريق الملك عبدالعزيز، جدة';

  return (
    <header aria-label="شريط التواصل العلوي" className="bg-bg-1 border-b">
      <div className="container mx-auto flex items-center justify-between py-3 lg:py-5 gap-2 px-3">
        {/* Logo */}
        <div className="flex items-center z-[11]">
          <Link href="/">
            <div className="block">
              <LogoIcon className="w-[140px] max-md:w-[140px] text-black" />
            </div>
          </Link>
        </div>

        {/* Contact Info */}
        <div className="flex items-stretch divide-x">
          <ContactItem
            icon={<FiPhoneCall size={20} aria-hidden />}
            label="اتصال مجاني"
            value={phone}
            type="phone"
            copied={copied}
            onCopy={copy}
          />
          <ContactItem
            icon={<HiOutlineMailOpen size={20} aria-hidden />}
            label="الدعم الإلكتروني"
            value={email}
            type="email"
            copied={copied}
            onCopy={copy}
          />
          <ContactItem
            icon={<IoLocation size={20} aria-hidden />}
            label="موقعنا"
            value={location}
            type="location"
            copied={copied}
            onCopy={copy}
          />
        </div>

        {/* Submit Button */}
        <div className='flex items-center gap-2 '>
          <PrimaryButton
            href="/add-property"
            className="btn-primary-lg hidden md:inline-flex focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            أضف عقارك
          </PrimaryButton>
          <PrimaryButton
            href="/become-agent"
            className="btn-primary-lg hidden md:inline-flex focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            انضم كوكيل
          </PrimaryButton>
        </div>
      </div>
    </header>
  );
}
