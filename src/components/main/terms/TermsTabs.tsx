'use client';

const realEstateContent = [
    {
        title: 'المحتوى والمعلومات',
        description: 'جميع المعلومات المعروضة عن العقارات هي لأغراض إعلامية وتسويقية فقط، وقد تخضع للتغيير دون إشعار مسبق. لا نضمن دقة أو اكتمال المحتوى بنسبة 100%.'
    },
    {
        title: 'الضمانات والمسؤوليات',
        description: 'نحن نسعى لتقديم معلومات دقيقة، ولكن لا نتحمل أي مسؤولية قانونية عن أي خسارة أو ضرر ناتج عن الاعتماد على المعلومات المنشورة.'
    },
    {
        title: 'حقوق الملكية الفكرية',
        description: 'جميع النصوص، الصور، والشعارات المعروضة في الموقع مملوكة لنا أو مرخصة لنا. يُمنع استخدامها دون إذن كتابي مسبق.'
    },
    {
        title: 'الروابط الخارجية',
        description: 'قد يحتوي الموقع على روابط لمواقع أخرى. نحن غير مسؤولين عن محتوى أو ممارسات تلك المواقع'
    },
    {
        title: 'سياسة الخصوصية',
        description: 'نحترم خصوصيتكم. يمكنكم الاطلاع على سياسة الخصوصية الخاصة بنا لمعرفة كيف نتعامل مع بياناتكم.'
    },
    {
        title: 'التعديلات على الشروط',
        description: 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت، ويتم نشر التعديلات فور تحديث الصفحة'
    },
];

export default function TermsTabs() {

    return (
        <div className="container px-3 relative z-[1] p-5 md:p-8 lg:p-10 rounded-2xl bg-white">

            <div role="tabpanel" className="space-y-6">
                <h3 className="h3">الشروط والأحكام الخاصة بالعقارات</h3>
                <p className="mt-4">نقدم لكم نظرة عامة على السياسات القانونية المتعلقة باستخدام الموقع العقاري.</p>
                <div className="border border-t border-dashed my-4 lg:my-6 xl:my-8"></div>
                <ul className="marker:text-primary list-disc list-inside flex flex-col gap-3">
                    {realEstateContent.map((item, index) => (
                        <li key={index}>
                            <strong>{item.title}</strong><br />
                            {item.description}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
}
