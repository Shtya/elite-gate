'use client';

import React from 'react';

type ImageUploadProps = {
    id?: string;
    imageUrl: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
};

export default function ImageUpload({ id = 'imageUpload', imageUrl, onChange, error }: ImageUploadProps) {
    return (
        <div className="relative mx-auto mb-6 w-[180px] h-[180px]">
            <input
                id={id}
                accept=".png, .jpg, .jpeg"
                className="hidden"
                type="file"
                onChange={onChange}
            />
            <label htmlFor={id} className="cursor-pointer">
                <img
                    alt="الصورة الشخصية"
                    loading="lazy"
                    width={180}
                    height={180}
                    className={`rounded-full border-[6px] ${error ? 'border-red-500' : 'border-[#F5F5FE]'
                        } shadow-md`}
                    src={imageUrl}
                />
                <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 112.828 2.828L11.828 15H9v-2z"
                        />
                    </svg>
                </div>
            </label>

            {error && (
                <p className="mt-2 text-sm text-red-600 font-medium text-center">
                    {error}
                </p>
            )}
        </div>
    );
}
