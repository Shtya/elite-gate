"use client";
import Link from "next/link";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoLocation } from "react-icons/io5";

export default function FooterContactSection() {
    return (
        <div className="col-span-12 md:col-span-6 xl:col-span-3">
            <h4 className="text-2xl font-semibold mb-6">تواصل معنا</h4>
            <ul className="flex flex-col gap-4">
                <li>
                    <div className="flex items-center gap-4">
                        <div className="bg-primary text-white text-2xl p-2 rounded-full">
                            <FiPhoneCall size={20} />
                        </div>
                        <Link href="tel:+966543640639" className="text-neutral-300">
                            966&nbsp;54&nbsp;364&nbsp;0639+
                        </Link>
                    </div>
                </li>
                <li>
                    <div className="flex items-center gap-4">
                        <div className="bg-secondary text-neutral-700 text-2xl p-2 rounded-full">
                            <HiOutlineMailOpen size={20} />
                        </div>
                        <Link href="mailto:ali@albarakati.net" className="text-neutral-300">
                            ali@albarakati.net
                        </Link>
                    </div>
                </li>
                <li>
                    <div className="flex items-center gap-4">
                        <div className="bg-tertiary text-neutral-700 text-2xl p-2 rounded-full">
                            <IoLocation size={20} />
                        </div>
                        <p className="text-neutral-300">طريق الملك عبدالعزيز، جدة</p>
                    </div>
                </li>
            </ul>
        </div>
    );
}
