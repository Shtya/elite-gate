"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { BsArrowLeft } from "react-icons/bs";

type CategoryCardProps = {
    icon: ReactNode;
    title: string;
    description: string;
    href: string;
    color?: string;
};

export default function CategoryCard({ icon, title, description, href }: CategoryCardProps) {
    return (
        <div className="flex flex-col border rounded-xl max-w-[306px] cursor-pointer group duration-300 ">
            <div className="flex-1 p-8 bg-white group-hover:bg-primary rounded-t-xl group-hover:text-white duration-300">
                {icon}
                <h4 className="font-semibold text-xl pt-2 pb-3 text-neutral-700 group-hover:text-white ">
                    {title}
                </h4>
                <p>{description}</p>
            </div>
            <div className="bg-bg-2 p-8 rounded-b-xl group-hover:bg-[#212391] group-hover:text-white duration-300">
                <Link href={href} className="flex items-center gap-2 text-lg">
                    <span>اقرأ المزيد</span>
                    <BsArrowLeft className="mt-1" />
                </Link>
            </div>
        </div>
    );
}
