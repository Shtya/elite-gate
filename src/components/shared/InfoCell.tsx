// components/InfoCell.tsx
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    user: {
        id: string | number;
        name: string;
        email?: string;
        image?: string;
    };
    href: string;
    className?: string;
    subtitle?: string;
    imageRounded?: 'full' | 'lg';
    badgeClass?: string;
};

export default function InfoCell({
    user,
    href,
    className = '',
    subtitle,
    imageRounded = 'full',
    badgeClass = '',
}: Props) {
    const imageSrc =
        typeof user.image === 'string' && user.image.trim() !== ''
            ? user.image
            : '/users/default-user.png';

    const imageClass = `w-10 h-10 object-cover ${imageRounded === 'full' ? 'rounded-full' : 'rounded-lg'}`;
    const linkClass = `flex items-center gap-3 ${className}`;
    const subtitleClass = `text-xs px-2 py-0.5 rounded-full w-fit ${badgeClass}`;

    return (
        <Link href={href} className={linkClass}>
            <Image
                src={imageSrc}
                alt={user.name}
                width={40}
                height={40}
                className={imageClass}
            />
            <div className="flex flex-col">
                <span className="font-medium">{user.name}</span>
                {subtitle && <span className={subtitleClass}>{subtitle}</span>}
            </div>
        </Link>
    );
}
