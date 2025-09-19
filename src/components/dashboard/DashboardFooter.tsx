
import { socialLinks } from "@/constants/general";
import Link from "next/link";
import FooterRights from "../shared/Footer/FooterRights";

const links = [
    { label: "سياسة الخصوصية", href: "/privacy" },
    { label: "الشروط والأحكام", href: "/terms" },
];

export default function DashboardFooter() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="py-4 flex justify-between bg-white items-center flex-wrap px-3 gap-5 lg:px-6 w-full">
            <FooterRights />
            <ul className="flex gap-3 flex-wrap">
                {socialLinks.map(({ icon: Icon, href }, i) => (
                    <li key={i}>
                        <Link
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group border border-[#3538ED] hover:bg-[#3538ED] duration-300 grid place-content-center p-[10px] rounded-full"
                        >
                            <Icon className="text-xl text-primary group-hover:text-white" />
                        </Link>
                    </li>
                ))}
            </ul>

            <ul className="flex items-center flex-wrap gap-6 justify-center lg:justify-end">
                {links.map((link, i) => (
                    <li key={i}>
                        <Link href={link.href} className="hover:text-secondary duration-300">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </footer>
    )
}