import Image from 'next/image';
import Link from 'next/link';

type Props = {
    href?: string;
    image?: string;
    className?: string;
    title?: string;
    subtitle?: string;
    imageRounded?: 'full' | 'lg';
    subtitleClass?: string;
};

export default function InfoCell({
    href,
    image,
    className = '',
    title = '',
    subtitle,
    imageRounded = 'full',
    subtitleClass = '',
}: Props) {
    const imageSrc =
        typeof image === 'string' && image.trim() !== ''
            ? image
            : '/users/default-user.png';

    const imageClass = `w-10 h-10 object-cover ${imageRounded === 'full' ? 'rounded-full' : 'rounded-lg'}`;
    const containerClass = `flex items-center gap-3 ${className}`;
    const fullSubtitleClass = `text-right text-xs px-2 py-0.5 rounded-full w-fit ${subtitleClass}`;

    const content = (
        <>
            <Image
                src={imageSrc}
                alt={title}
                width={40}
                height={40}
                className={imageClass}
            />
            <div className="flex flex-col">
                {title && <span className="font-medium text-right">{title}</span>}
                {subtitle && <span className={fullSubtitleClass}>{subtitle}</span>}
            </div>
        </>
    );

    return href ? (
        <Link href={href} className={containerClass}>
            {content}
        </Link>
    ) : (
        <div className={containerClass}>
            {content}
        </div>
    );
}
