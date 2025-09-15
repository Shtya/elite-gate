import Image from "next/image";

export default function LogoWithoutText({ className = "" }) {
    return (
        <Image
            src="/rawLogo.svg"
            alt="Logo"
            className={className}
            width={100}
            height={128}
            priority
        />
    );
}
