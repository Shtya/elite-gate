import Image from "next/image";
import Link from "next/link";


export default function Logo() {
    return (
        <div className="mx-auto">
            <Link href="/">
                <div className="flex items-center justify-center">
                    <div className="xl:block">
                        <Image
                            alt="الشعار"
                            src="/logo.png"
                            width={172}
                            height={48}
                            priority
                            className="h-12 w-auto"
                            sizes="172px"
                        />
                    </div>

                </div>
            </Link>
        </div>

    )
}