"use client";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaTiktok,
    FaSnapchat,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import LogoIcon from "../LogoIcon";

const socialLinks = [
    { icon: FaSnapchat, href: "https://www.instagram.com/jeddahreporter/?r=nametag#" },
    { icon: FaTwitter, href: "https://x.com/jeddah_reporter?s=09" },
    { icon: FaInstagram, href: "https://www.instagram.com/ali_n_albarakati/?igsh=bXRjaXZnOW1xd204&utm_source=qr" },
    { icon: FaYoutube, href: "https://www.youtube.com/@JeddahReporterAliAlbarakati" },
    { icon: FaTiktok, href: "https://www.tiktok.com/@ali.n.albarakati" },
];

export default function FooterLogoSection() {
    return (
        <div className="col-span-12 md:col-span-6 xl:col-span-3">
            <Link href="/" className="inline-block mb-6">
                <LogoIcon className="w-[200px]" />
            </Link>
            <p className="text-neutral-300 mb-6 leading-relaxed">
                مرحبًا بكر، عبر منصتنا يمكنك استكشاف وشراء وحدات عقارية بكل سهولة وشفافية، حيث نوفر لك عروضًا متنوعة تناسب احتياجاتك. كما نتيح لأصحاب العقارات فرصة عرض وحداتهم للبيع، وإدارتها من خلال نظام ذكي يضمن وصولها إلى المهتمين، مع دعم فريق متخصص لضمان جودة التجربة للطرفين.
            </p>
            <ul className="flex gap-3 flex-wrap">
                {socialLinks.map(({ icon: Icon, href }, i) => (
                    <li key={i}>
                        <Link
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-[#3538ED] hover:bg-[#3538ED] duration-300 grid place-content-center p-[10px] rounded-full"
                        >
                            <Icon className="text-xl" />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
