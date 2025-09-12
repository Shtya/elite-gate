"use client";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function FooterLogoSection() {
    return (
        <div className="col-span-12 md:col-span-6 xl:col-span-3">
            <Link href="/" className="inline-block mb-6">
                <Image src="/logo.png" alt="الشعار" width={227} height={60} />
            </Link>
            <p className="text-neutral-300 mb-6 leading-relaxed">
                مرحبًا بكر، عبر منصتنا يمكنك استكشاف وشراء وحدات عقارية بكل سهولة وشفافية، حيث نوفر لك عروضًا متنوعة تناسب احتياجاتك. كما نتيح لأصحاب العقارات فرصة عرض وحداتهم للبيع، وإدارتها من خلال نظام ذكي يضمن وصولها إلى المهتمين، مع دعم فريق متخصص لضمان جودة التجربة للطرفين.
            </p>
            <ul className="flex gap-3 flex-wrap">
                {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTiktok].map((Icon, i) => (
                    <li key={i}>
                        <Link
                            href="#"
                            className="border border-[#3538ED] hover:bg-[#3538ED] duration-300 grid place-content-center p-[10px] rounded-full"
                        >
                            <Icon className="text-xl" />
                        </Link >
                    </li>
                ))}
            </ul>
        </div>
    );
}
