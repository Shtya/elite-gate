'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import FaqList from "@/components/shared/FaqList";

export const faqGroups = [
  {
        title: 'شراء منزل جديد',
        items: [
            { question: 'ما هي خطوات شراء المنزل؟', answer: 'تبدأ بتحديد الميزانية، ثم البحث، ثم التفاوض، وأخيرًا التوثيق.' },
            { question: 'هل يمكن الحصول على تمويل عقاري؟', answer: 'نعم، توفر البنوك برامج تمويل متنوعة حسب الدخل.' },
            { question: 'ما هي الرسوم الإضافية؟', answer: 'تشمل رسوم التسجيل، الضرائب، وأتعاب المحامي أو الوسيط.' },
            { question: 'هل يمكن زيارة العقار قبل الشراء؟', answer: 'بالطبع، ننصح بزيارة العقار أكثر من مرة قبل اتخاذ القرار.' },
        ],
    },
    {
        title: 'بيع عقار سكني',
        items: [
            { question: 'كيف أحدد سعر البيع؟', answer: 'يُفضل تقييم العقار عبر خبير أو مقارنة السوق المحلي.' },
            { question: 'هل يجب توثيق العقد؟', answer: 'نعم، لضمان الحقوق القانونية للطرفين.' },
            { question: 'هل يمكن البيع بدون وسيط؟', answer: 'نعم، لكن وجود وسيط يسهل الإجراءات ويزيد فرص البيع.' },
            { question: 'ما هي مدة إتمام البيع؟', answer: 'تختلف حسب التفاوض والإجراءات، لكنها غالبًا تستغرق من أسبوعين إلى شهر.' },
        ],
    },
    {
        title: 'شراء شقة استثمارية',
        items: [
            { question: 'هل الشقة مؤجرة؟', answer: 'بعض الشقق تأتي بعقود إيجار جاهزة تضمن دخل شهري.' },
            { question: 'ما هو العائد السنوي؟', answer: 'يتراوح بين 5% إلى 10% حسب الموقع والمرافق.' },
            { question: 'هل يمكن إعادة بيعها بسهولة؟', answer: 'نعم، خاصة إذا كانت في منطقة مرغوبة.' },
            { question: 'هل هناك رسوم صيانة؟', answer: 'نعم، تُدفع شهريًا أو سنويًا حسب نظام المبنى.' },
        ],
    },
    {
        title: 'بيع أرض زراعية',
        items: [
            { question: 'هل الأرض مسجلة؟', answer: 'يجب التأكد من وجود سند ملكية رسمي.' },
            { question: 'هل يمكن تقسيم الأرض؟', answer: 'نعم، حسب قوانين التخطيط العمراني.' },
            { question: 'هل تحتاج الأرض إلى تقييم؟', answer: 'يفضل ذلك لتحديد السعر المناسب.' },
            { question: 'هل هناك ضرائب على البيع؟', answer: 'نعم، تختلف حسب المنطقة ونوع الأرض.' },
        ],
    },
    {
        title: 'شراء مكتب تجاري',
        items: [
            { question: 'هل المكتب جاهز للعمل؟', answer: 'بعض المكاتب مجهزة بالكامل، والبعض يحتاج تجهيزات.' },
            { question: 'هل الموقع مناسب؟', answer: 'يُفضل أن يكون في منطقة تجارية نشطة.' },
            { question: 'هل يمكن تأجيره لاحقًا؟', answer: 'نعم، ويُعد خيارًا استثماريًا جيدًا.' },
            { question: 'هل يوجد موقف سيارات؟', answer: 'تتوفر مواقف حسب تصميم المبنى.' },
        ],
    },
    {
        title: 'بيع فيلا فاخرة',
        items: [
            { question: 'هل تشمل الأثاث؟', answer: 'يمكن البيع بالأثاث أو بدونه حسب الاتفاق.' },
            { question: 'هل يوجد مسبح؟', answer: 'معظم الفلل الفاخرة تحتوي على مسبح خاص.' },
            { question: 'هل يمكن البيع للأجانب؟', answer: 'نعم، حسب قوانين الدولة.' },
            { question: 'ما هي وسائل التسويق؟', answer: 'نستخدم منصات إلكترونية، وسطاء، وتصوير احترافي.' },
        ],
    },
];

export default function FeqTaps() {
  const titles = useMemo(() => faqGroups.map(g => g.title), []);
  const [activeTitle, setActiveTitle] = useState<string>(faqGroups[0].title);

  // Support deep link via ?group=<slug>
  const toSlug = (s: string) =>
    s.trim().toLowerCase().replace(/[^\u0600-\u06FF\w\s-]/g, "").replace(/\s+/g, "-");

  useEffect(() => {
    const url = new URL(window.location.href);
    const g = url.searchParams.get("group");
    if (!g) return;
    const bySlug = faqGroups.find(f => toSlug(f.title) === g);
    if (bySlug) setActiveTitle(bySlug.title);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("group", toSlug(activeTitle));
    history.replaceState(null, "", url.toString());
  }, [activeTitle]);

  const activeFaq = faqGroups.find((g) => g.title === activeTitle);

  return (
    <>
      {/* Sidebar */}
      <div className="col-span-12 lg:col-span-4 2xl:col-span-3">
        <aside className="sticky top-24">
          <div className="bg-[var(--bg-2)] rounded-2xl p-3 md:p-6 mb-6 border border-neutral-200">
            <div role="tablist" aria-orientation="vertical" className="flex flex-col gap-2">
              {faqGroups.map((group, index) => {
                const active = activeTitle === group.title;
                return (
                  <button
                    key={group.title}
                    role="tab"
                    aria-selected={active}
                    aria-controls={`panel-${toSlug(group.title)}`}
                    id={`tab-${toSlug(group.title)}`}
                    onClick={() => setActiveTitle(group.title)}
                    className={`text-right focus:outline-none flex gap-2 items-center font-medium py-3 px-5 rounded-full transition
                      ${active ? "bg-primary text-white shadow-sm" : "text-neutral-800 hover:bg-white"}
                    `}
                  >
                    <span className="inline-block w-8 text-neutral-500">{`${index + 1}`.padStart(2, "0")}.</span>
                    <span className="truncate">{group.title}</span>
                    <span className={`ms-auto text-xs ${active ? "text-white/80" : "text-neutral-500"}`}>
                      {group.items.length} سؤال
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Banner */}
          <div className="px-6 py-10 rounded-2xl overflow-hidden relative isolate bg-[url('/main/faq/faq-banner-img.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 bg-black/35 -z-10" />
            <h4 className="mb-6 text-2xl font-semibold text-white">ابحث عن عقارك المثالي</h4>
            <Link className="py-3 px-6 bg-white rounded-full font-semibold text-primary inline-block hover:brightness-95"
              href="/contact-us" aria-label="تواصل معنا">
              تواصل معنا
            </Link>
          </div>
        </aside>
      </div>

      {/* Content */}
      <div className="col-span-12 lg:col-span-8 2xl:col-start-5 2xl:col-span-8">
        <h2 className="h2 mb-5 lg:mb-8" id={`panel-${toSlug(activeTitle)}`} role="tabpanel" aria-labelledby={`tab-${toSlug(activeTitle)}`}>
          {activeTitle}
        </h2>
        <FaqList faqs={activeFaq?.items ?? []} />
      </div>
    </>
  );
}
