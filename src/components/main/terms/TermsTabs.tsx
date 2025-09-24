'use client';

import { useMemo } from "react";

export const realEstateContent = [
  { title: 'المحتوى والمعلومات', description: 'جميع المعلومات المعروضة عن العقارات هي لأغراض إعلامية وتسويقية فقط، وقد تخضع للتغيير دون إشعار مسبق. لا نضمن دقة أو اكتمال المحتوى بنسبة 100%.' },
  { title: 'الضمانات والمسؤوليات', description: 'نحن نسعى لتقديم معلومات دقيقة، ولكن لا نتحمل أي مسؤولية قانونية عن أي خسارة أو ضرر ناتج عن الاعتماد على المعلومات المنشورة.' },
  { title: 'حقوق الملكية الفكرية', description: 'جميع النصوص، الصور، والشعارات المعروضة في الموقع مملوكة لنا أو مرخصة لنا. يُمنع استخدامها دون إذن كتابي مسبق.' },
  { title: 'الروابط الخارجية', description: 'قد يحتوي الموقع على روابط لمواقع أخرى. نحن غير مسؤولين عن محتوى أو ممارسات تلك المواقع' },
  { title: 'سياسة الخصوصية', description: 'نحترم خصوصيتكم. يمكنكم الاطلاع على سياسة الخصوصية الخاصة بنا لمعرفة كيف نتعامل مع بياناتكم.' },
  { title: 'التعديلات على الشروط', description: 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت، ويتم نشر التعديلات فور تحديث الصفحة' },
];

function toId(s: string) {
  return s.trim().toLowerCase()
    .replace(/[^\u0600-\u06FF\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

export default function TermsTabs() {
  const sections = useMemo(
    () => realEstateContent.map((i) => ({ ...i, id: toId(i.title) })),
    []
  );

  const copyLink = async (hash: string) => {
    try {
      const url = `${location.origin}${location.pathname}${location.search}#${hash}`;
      await navigator.clipboard.writeText(url);
    } catch { }
  };

  return (
    <div className="container px-3 relative z-[1]">
      <div className="rounded-2xl bg-white border border-neutral-200 p-5 md:p-8 lg:p-10">
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="h3">الشروط والأحكام الخاصة بالعقارات</h3>
            <p className="mt-2 text-neutral-600">
              نقدم لكم نظرة عامة على السياسات القانونية المتعلقة باستخدام الموقع العقاري.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-full border border-neutral-300 hover:bg-neutral-50 text-sm"
              aria-label="طباعة الشروط"
            >
              طباعة
            </button>
          </div>
        </div>

        <div className="border-t border-dashed my-6 lg:my-8" />

        {/* Grid: TOC + content */}
        <div className="grid grid-cols-12 gap-6">
          {/* TOC */}
          <aside className="col-span-12 lg:col-span-4 2xl:col-span-3">
            <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-[var(--bg-2)] p-4">
              <div className="font-semibold mb-3">محتويات الصفحة</div>
              <nav className="space-y-2" aria-label="جدول المحتويات">
                {sections.map((s, i) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block rounded-xl px-4 py-2 text-neutral-800 hover:bg-white transition"
                  >
                    <span className="ml-2 text-neutral-500">{`${(i + 1).toString().padStart(2, "0")}.`}</span>
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="col-span-12 lg:col-span-8 2xl:col-start-5 2xl:col-span-8">
            <div role="tabpanel" className="space-y-8">
              {sections.map((s, idx) => (
                <section
                  key={s.id}
                  id={s.id}
                  aria-labelledby={`${s.id}-title`}
                  className="scroll-mt-28"
                >
                  <div className="flex items-start gap-3">
                    <h4 id={`${s.id}-title`} className="text-2xl font-bold text-neutral-900">
                      {`${(idx + 1).toString().padStart(2, "0")}. ${s.title}`}
                    </h4>
                    <button
                      onClick={() => copyLink(s.id)}
                      className="mt-1 text-xs rounded-full border border-neutral-300 px-2 py-1 hover:bg-neutral-50"
                      aria-label={`نسخ الرابط إلى ${s.title}`}
                      title="نسخ الرابط"
                    >
                      نسخ الرابط
                    </button>
                  </div>
                  <p className="mt-3 leading-8 text-neutral-700">{s.description}</p>
                  <div className="mt-5 h-px w-full bg-gradient-to-l from-transparent via-neutral-200 to-transparent" />
                </section>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
