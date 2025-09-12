import Image from 'next/image';
import Link from 'next/link';
import { FiPhoneCall } from 'react-icons/fi';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { IoLocation } from 'react-icons/io5';

export default function TopContactBar() {
    return (
        <div className='bg-bg-1 border-b-[1px]'>
            <div className="container mx-auto flex justify-between py-3 lg:py-5 gap-1">
                {/* Logo for XL screens */}
                <Image
                    alt="الشعار"
                    src='/logo.png'
                    width={172}
                    height={48}
                    priority
                    className="self-center hidden xl:block"
                />

                {/* Favicon for smaller screens */}
                <Image
                    alt="الشعار"
                    src='/favicon.png'
                    width={56}
                    height={40}
                    priority
                    className="self-center xl:hidden w-[40px] h-[40px] ml-3"
                />

                {/* Contact Info */}
                <div className="flex divide-x-[1px]">
                    {/* Phone */}
                    <div className="flex items-center gap-5 px-2 xl:px-4">
                        <div className="bg-primary text-white text-2xl p-2 rounded-full">
                            <FiPhoneCall size={24} />
                        </div>
                        <div className="flex-col hidden lg:flex">
                            <span className="text-xs">اتصال مجاني</span>
                            <Link className="text-base" href="tel:4065550120">(406) 555-0120</Link>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-5 px-2 xl:px-4">
                        <div className="bg-secondary text-neutral-700 text-2xl p-2 rounded-full">
                            <HiOutlineMailOpen size={24} />
                        </div>
                        <div className="flex-col hidden lg:flex">
                            <span className="text-xs">الدعم الإلكتروني</span>
                            <Link className="text-base" href="mailto:debra.holt@example.com">debra.holt@example.com</Link >
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-5 px-2 xl:px-4">
                        <div className="bg-tertiary text-neutral-700 text-2xl p-2 rounded-full">
                            <IoLocation size={24} />
                        </div>
                        <div className="flex-col hidden lg:flex">
                            <span className="text-xs">موقعنا</span>
                            <span className="text-base">3605 طريق باركر</span>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <Link href="/add-property" className="btn-primary-lg hidden md:block">
                    أضف عقارك
                </Link>
            </div>
        </div>
    );
}
