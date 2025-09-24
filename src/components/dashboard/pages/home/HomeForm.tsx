'use client'

import { useForm, Controller } from 'react-hook-form';
import Card from '@/components/shared/Card';
import TextInput from '@/components/shared/Forms/TextInput';
import TextareaInput from '@/components/shared/Forms/TextareaInput';
import Uploader from '@/components/shared/Forms/Uploader';
import { FileItem } from '@/utils/upload';
import EditFAQSection from '@/components/dashboard/pages/home/EditFAQSection';

type FAQItem = {
    question: string;
    answer: string;
};

export type HomeContentForm = {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: FileItem[];

    categoryTitle: string;
    categoryDescription: string;

    projectsTitle: string;
    projectsDescription: string;

    servicesTitle: string;
    servicesDescription: string;

    recentProjectsTitle: string;
    recentProjectsDescription: string;

    testimonialTitle: string;
    testimonialSubtitle: string;

    partnersTitle: string;
    partnersSubtitle: string;
    partnersLogos: FileItem[];

    faqTitle: string;
    faqSubtitle: string;
    faqs: FAQItem[];
};

const clientLogos = [
    "/main/home/clients/client-1.webp",
    "/main/home/clients/client-2.webp",
    "/main/home/clients/client-3.webp",
    "/main/home/clients/client-4.webp",
    "/main/home/clients/client-5.webp",
    "/main/home/clients/client-6.webp",
    "/main/home/clients/client-7.webp",
];

const faqs = [
    { question: "ما هو العقار؟", answer: "العقار هو أرض أو مبانٍ..." },
    { question: "كيف أشتري منزلًا؟", answer: "ابدأ بالبحث مع وكيل عقاري..." },
    { question: "كيف أبيع منزلًا؟", answer: "تواصل مع وكيل للتسعير والتسويق..." },
    { question: "ما هو الرهن العقاري؟", answer: "قرض لشراء عقار يتم سداده على فترة زمنية." },
    { question: "ما هي ضمانات المنزل؟", answer: "عقد يغطي إصلاحات محددة لفترة بعد الشراء." },
];



export default function HomeForm() {
    const { handleSubmit, control } = useForm<HomeContentForm>({
        defaultValues: {
            heroTitle: "طريقة أسرع وأذكى للعثور على عقارك المثالي",
            heroSubtitle: "تصفّح آلاف القوائم المصنّفة بدقة، وفِلتر النتائج حسب المدينة، النوع والميزانية.",
            heroImage: [
                {
                    url: "/main/home/primary-hero-img-1.jpg",
                    name: "primary-hero-img-1.jpg",
                    type: "image/jpeg",
                    isPrimary: false,
                },
                {
                    url: "/main/home/primary-hero-img-2.jpg",
                    name: "primary-hero-img-2.jpg",
                    type: "image/jpeg",
                    isPrimary: true,
                },
            ],

            categoryTitle: "اختر الفئة المناسبة",
            categoryDescription: "يمكن شراء العقارات أو بيعها، وهي فرصة استثمارية قيّمة. قيمة العقار تعتمد على الموقع والاستخدام.",

            projectsTitle: "قائمة المشاريع",
            projectsDescription: "يمكن شراء العقارات ، ويمكن أن تكون فرصة استثمارية قيّمة.",

            servicesTitle: "شاهد كيف يمكن أن نساعدك",
            servicesDescription: "يمكن شراء العقارات أو بيعها أو تأجيرها أو استئجارها...",

            recentProjectsTitle: "أحدث المشاريع",
            recentProjectsDescription: "اكتشف أحدث الوحدات العقارية المضافة حديثًا — فرص سكنية واستثمارية مختارة بعناية لتناسب تطلعاتك.",

            testimonialTitle: "آراء عملائنا",
            testimonialSubtitle: "يمكن شراء العقارات أو بيعها ,وهي فرصة استثمارية قيّمة. قيمة العقار تعتمد على الموقع والاستخدام.",

            partnersTitle: "عملاؤنا",
            partnersSubtitle: "نفخر بثقة عملائنا الذين يمثلون نخبة من الشركات والمؤسسات الرائدة في مجال العقارات.",
            partnersLogos: clientLogos.map((url, i) => ({
                url,
                name: url.split("/").pop(),
                type: "image/webp",
                isPrimary: i === 0,
            })),

            faqTitle: "إذا كان لديك أي سؤال، لدينا الإجابة",
            faqSubtitle: "كل ما تحتاج معرفته حول شراء وبيع العقارات.",
            faqs,
        },
    });


    const onSave = (values: HomeContentForm) => {
        console.log('Saving homepage content', values);
    };


    return (
        <form onSubmit={handleSubmit(onSave)} className="space-y-6">

            {/* Hero Section */}
            <Card title="القسم الرئيسي">
                <Controller
                    name="heroTitle"
                    control={control}
                    render={({ field }) => (
                        <TextInput {...field} id="hero-title" label="العنوان الرئيسي" placeholder="اكتب جملة جذابة للزائر" />
                    )}
                />
                <Controller
                    name="heroSubtitle"
                    control={control}
                    render={({ field }) => (
                        <TextareaInput {...field} id="hero-subtitle" label="النص الفرعي" placeholder="اشرح بإيجاز ما يميز منصتك" />
                    )}
                />
                <Uploader control={control} name="heroImage" label="صور الخلفية" accept="image/*" allowMultiple allowPrimary={false} maxFiles={2} />
            </Card>


            {/* Categories */}
            <Card title="الفئات">
                <Controller
                    name="categoryTitle"
                    control={control}
                    render={({ field }) => (
                        <TextInput {...field} id="cat-title" label="عنوان القسم" placeholder="مثال: أنواع العقارات" />
                    )}
                />
                <Controller
                    name="categoryDescription"
                    control={control}
                    render={({ field }) => (
                        <TextareaInput {...field} id="cat-desc" label="الوصف" placeholder="اشرح بإيجاز محتوى هذا القسم" />
                    )}
                />
            </Card>


            {/* Categories */}
            <Card title="المشاريع">
                <Controller
                    name="projectsTitle"
                    control={control}
                    render={({ field }) => (
                        <TextInput {...field} id="projects-title" label="عنوان القسم" placeholder="مثال: قائمة المشاريع" />
                    )}
                />
                <Controller
                    name="projectsDescription"
                    control={control}
                    render={({ field }) => (
                        <TextareaInput {...field} id="projects-desc" label="الوصف" placeholder="اشرح بإيجاز محتوى المشاريع" />
                    )}
                />
            </Card>


            {/* Services */}
            <Card title="الخدمات">
                <Controller
                    name="servicesTitle"
                    control={control}
                    render={({ field }) => (
                        <TextInput {...field} id="services-title" label="عنوان القسم" placeholder="مثال: خدماتنا" />
                    )}
                />
                <Controller
                    name="servicesDescription"
                    control={control}
                    render={({ field }) => (
                        <TextareaInput {...field} id="services-desc" label="الوصف" placeholder="اشرح كيف تساعد خدماتك العملاء" />
                    )}
                />
            </Card>

            <Card title="أحدث المشاريع">
                <Controller
                    name="recentProjectsTitle"
                    control={control}
                    render={({ field }) => (
                        <TextInput {...field} id="projects-title" label="عنوان القسم" placeholder="مثال: قائمة المشاريع" />
                    )}
                />
                <Controller
                    name="recentProjectsDescription"
                    control={control}
                    render={({ field }) => (
                        <TextareaInput {...field} id="projects-desc" label="الوصف" placeholder="اشرح بإيجاز محتوى المشاريع" />
                    )}
                />
            </Card>


            {/* Testimonials */}
            <Card title="آراء العملاء">
                <Controller
                    name="testimonialTitle"
                    control={control}
                    render={({ field }) => (
                        <TextInput {...field} id="test-title" label="عنوان القسم" placeholder="مثال: ماذا يقول عملاؤنا" />
                    )}
                />
                <Controller
                    name="testimonialSubtitle"
                    control={control}
                    render={({ field }) => (
                        <TextareaInput {...field} id="test-subtitle" label="النص الفرعي" placeholder="أدخل اقتباس قصير من تجربة عميل" />
                    )}
                />
            </Card>


            {/* Partners */}
            <Card title="شركاؤنا">
                <Controller
                    name="partnersTitle"
                    control={control}
                    render={({ field }) => (
                        <TextInput {...field} id="partners-title" label="عنوان القسم" placeholder="مثال: شركاؤنا في النجاح" />
                    )}
                />
                <Controller
                    name="partnersSubtitle"
                    control={control}
                    render={({ field }) => (
                        <TextareaInput {...field} id="partners-subtitle" label="النص الفرعي" placeholder="اشرح بإيجاز ثقة عملائك" />
                    )}
                />
                <Uploader control={control} name="partnersLogos" label="شعارات الشركاء" accept="image/*" allowMultiple allowPrimary={false} />
            </Card>

            {/* FAQ */}
            <Card title="الأسئلة الشائعة">
                <Controller
                    name="faqTitle"
                    control={control}
                    render={({ field }) => (
                        <TextInput {...field} id="faq-title" label="عنوان القسم" placeholder="مثال: لديك أسئلة؟" />
                    )}
                />
                <Controller
                    name="faqSubtitle"
                    control={control}
                    render={({ field }) => (
                        <TextareaInput {...field} id="faq-subtitle" label="النص الفرعي" placeholder="اشرح بإيجاز محتوى الأسئلة" />
                    )}
                />

                {/* Dynamic list */}
                <EditFAQSection control={control} />
            </Card>


            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-[var(--primary)] text-white hover:bg-[var(--primary-600)]"
                >
                    حفظ التغييرات
                </button>
            </div>
        </form>
    )
}