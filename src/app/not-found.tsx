import Link from "next/link";


export default function NotFound() {
    return (
        <div className="py-[30px] lg:py-[60px] bg-bg-2 h-screen">
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="col-span-10 lg:col-span-6">
                        <div className="text-center pb-10">
                            <img
                                alt="image"

                                className="mx-auto w-full"
                                src="/error-img.png"
                            />
                            <h2 className="mt-10 mb-5 text-3xl font-bold">عذرًا! الصفحة غير موجودة</h2>
                            <p className="mb-8 text-gray-600">
                                نأسف، الصفحة التي تبحث عنها غير موجودة. قد تكون قد أُزيلت أو تم تغيير عنوانها أو أنها غير متوفرة مؤقتًا.
                            </p>
                            <Link href="/" className="btn-primary font-semibold inline-block">
                                العودة إلى الصفحة الرئيسية
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}