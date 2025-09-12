import Link from "next/link";
import Image from "next/image";

type ServiceCardProps = {
    title: string;
    description: string;
    buttonText: string;
    imageUrl: string;
    link: string;
};

export default function ServiceCard({
    title,
    description,
    buttonText,
    imageUrl,
    link,
}: ServiceCardProps) {
    return (
        <div className=" bg-white p-6 xl:p-8 rounded-2xl flex flex-col items-center text-center group hover:bg-primary duration-300">
            <Image
                alt="service image"
                width={306}
                height={306}
                src={imageUrl}
            />
            <h3 className="mt-7 font-semibold text-3xl text-neutral-800 group-hover:text-white duration-300">
                {title}
            </h3>
            <p className="mt-3 px-4 mb-10 text-neutral-700 group-hover:text-white duration-300">
                {description}
            </p>
            <Link
                href={link}
                className="btn-outline group-hover:bg-tertiary duration-300 group-hover:text-neutral-900"
            >
                {buttonText}
            </Link>
        </div>
    );
}
