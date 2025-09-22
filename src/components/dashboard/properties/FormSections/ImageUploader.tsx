'use client';

import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { PropertyFormValues } from '../PropertyForm';


type ImageUploaderProps = {
    control: Control<PropertyFormValues>;
};

export default function ImageUploader({ control }: ImageUploaderProps) {

    return (
        <Controller
            name="images"
            control={control}
            render={({ field }) => {
                const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
                    e.preventDefault();

                    const droppedFiles = Array.from(e.dataTransfer.files);

                    // إنشاء روابط للعرض الفوري
                    const urls = droppedFiles.map((file) => URL.createObjectURL(file));

                    const newImages = [
                        ...field.value,
                        ...urls.map((url) => ({ url, isPrimary: false })),
                    ];
                    if (!newImages.some((img) => img.isPrimary) && newImages.length > 0) {
                        newImages[0].isPrimary = true;
                    }
                    field.onChange(newImages);
                };

                const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
                    e.preventDefault();
                };

                const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
                    e.preventDefault();
                };


                const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
                    if (!e.target.files) return;
                    const files = Array.from(e.target.files);

                    const urls = files.map((file) => URL.createObjectURL(file));


                    const newImages = [
                        ...field.value,
                        ...urls.map((url) => ({ url, isPrimary: false })),
                    ];
                    if (!newImages.some((img) => img.isPrimary) && newImages.length > 0) {
                        newImages[0].isPrimary = true;
                    }
                    field.onChange(newImages);
                };

                const setPrimary = (url: string) => {
                    const updated = field.value.map((img: any) => ({
                        ...img,
                        isPrimary: img.url === url,
                    }));


                    field.onChange(updated);
                };

                const removeImage = (url: string) => {
                    const updated = field.value.filter((img: any) => img.url !== url);
                    if (!updated.some((img: any) => img.isPrimary) && updated.length > 0) {
                        updated[0].isPrimary = true;
                    }

                    field.onChange(updated);

                };

                return (
                    <div className='col-span-12'>
                        {/* Dropzone */}
                        <div className="flex items-center justify-center border-dashed rounded-2xl w-full"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}>
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full cursor-pointer bg-[var(--bg-2)] rounded-2xl border border-dashed"
                            >
                                <span className="flex flex-col items-center justify-center py-12">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-[60px] h-[60px]"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 
                           5.25 5.25 0 0110.233-2.33 
                           3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                        />
                                    </svg>
                                    <span className="h3 clr-neutral-500 text-center mt-4 mb-3">
                                        اسحب وأفلت
                                    </span>
                                    <span className="block text-center mb-6 clr-neutral-500">أو</span>
                                    <span className="inline-block py-3 px-6 rounded-full bg-[#354764] text-white mb-10">
                                        اختر ملفات
                                    </span>
                                    <span className="flex items-center justify-center flex-wrap gap-5 text-sm text-gray-500">
                                        <span>الحد الأقصى لحجم الملف 9MB</span>
                                        <span>الحد الأقصى 10 صور</span>
                                    </span>
                                </span>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"

                                    onChange={handleFiles}
                                />
                            </label>
                        </div>

                        {/* عرض الصور */}
                        {field.value?.length > 0 && (
                            <div className="grid grid-cols-1 xs:!grid-cols-2 md:!grid-cols-3 lg:!grid-cols-4 gap-4 mt-6">
                                {field.value.map((img: any, idx: number) => (
                                    <div key={idx} className="relative group">
                                        <img
                                            src={img.url}
                                            alt="preview"
                                            className={`w-full h-40 object-cover rounded-lg border ${img.isPrimary ? 'border-4 border-primary' : ''
                                                }`}
                                        />
                                        {/* زر تعيين كصورة أساسية */}
                                        <button
                                            type="button"
                                            onClick={() => setPrimary(img.url)}
                                            className="absolute bottom-2 left-2 bg-white/80 text-xs px-2 py-1 rounded shadow hover:bg-white"
                                        >
                                            {img.isPrimary ? 'الصورة الأساسية' : 'تعيين كصورة أساسية'}
                                        </button>
                                        {/* زر حذف */}
                                        <button
                                            type="button"
                                            onClick={() => removeImage(img.url)}
                                            className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded shadow hover:bg-red-600"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            }}
        />
    );
}
