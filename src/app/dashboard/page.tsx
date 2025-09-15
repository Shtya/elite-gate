import Link from "next/link";

export const metadata = {
    title: "لوحة التحكم",
    description:
        "استعرض معلوماتك الشخصية، حجوزاتك، وإعدادات الحساب من خلال لوحة التحكم في مراسل جدة العقاري.",
};

// Simulate async data fetching
async function getFakeData(): Promise<string> {
    return new Promise((resolve) =>
        setTimeout(() => resolve("مرحبًا بك في لوحة التحكم!"), 1000)
    );
}

export default async function Dashboard() {
    const message = await getFakeData();

    return (
        <div className="p-4 space-y-4">
            <div className="text-lg font-semibold text-gray-800">{message}</div>
        </div>
    );
}
