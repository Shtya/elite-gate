import Link from "next/link";

export const metadata = {
    title: 'لوحة التحكم',
    description: 'استعرض معلوماتك الشخصية، حجوزاتك، وإعدادات الحساب من خلال لوحة التحكم في مراسل جدة العقاري.',
};


export default function dashboard() {
    return (
        <div>
            <Link href="/">Home</Link>
        </div>
    );
}
