'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Card from '@/components/shared/Card';
import TextInput from '@/components/shared/Forms/TextInput';
import PrimaryButton from '@/components/shared/Button';
import SoftActionButton from '@/components/shared/SoftActionButton';
import SelectInput from '@/components/shared/Forms/SelectInput';
import { ClientRow } from '@/types/dashboard/client';
import ImageUpload from '@/components/shared/Forms/ImageUpload';

type Props = {
    client?: Omit<ClientRow, 'joinedAt'>;
    isAdmin?: boolean;
    isCurentUser?: boolean;
};

// 🧠 Define Zod schema
const schema = z.object({
    name: z.string().min(10, 'الاسم مطلوب'),
    email: z.email('البريد الإلكتروني غير صالح'),
    phone: z.string().optional(),
    image: z
        .string()
        .refine((val) =>
            typeof val === 'string' &&
            (val.startsWith('http') || val.startsWith('blob:') || val.startsWith('/')),
            { message: 'رابط الصورة غير صالح', })
        .optional(),

    status: z.enum(['active', 'suspended']),
});

type FormValues = z.infer<typeof schema>;

export default function BasicInfoForm({ client, isCurentUser = false, isAdmin = false }: Props) {
    const isEdit = isCurentUser || (client && client.id);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: client?.name || '',
            email: client?.email || '',
            phone: client?.phone || '',
            image: client?.image || '/users/default-user.png',
            status: client?.status ?? 'active',
        },
    });

    const onSubmit = (data: FormValues) => {
        if (client) {
            console.log('🔄 تحديث العميل:', { id: client.id, ...data });
        } else {
            console.log('🆕 إضافة عميل جديد:', data);
        }
    };


    const handleCancel = () => {
        reset({
            name: client?.name || '',
            email: client?.email || '',
            phone: client?.phone || '',
            image: client?.image || '/users/default-user.png',
            status: client?.status ?? 'active',
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setValue('image', imageUrl);
        }
    };

    return (
        <Card title={client ? 'تعديل معلومات العميل' : 'إضافة عميل جديد'}>
            {/* رفع الصورة */}
            <ImageUpload
                imageUrl={watch('image') || '/users/default-user.png'}
                onChange={handleImageChange}
                error={errors.image?.message}
            />

            {/* النموذج */}
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-4">
                <TextInput
                    id="full-name"
                    label="الاسم الكامل"
                    placeholder="أدخل الاسم"
                    {...register('name')}
                    error={errors.name?.message}
                    required
                />

                <TextInput
                    id="user-email"
                    type="email"
                    label="البريد الإلكتروني"
                    placeholder="أدخل البريد الإلكتروني"
                    {...register('email')}
                    error={errors.email?.message}
                    required
                />

                <TextInput
                    id="user-phone"
                    type="text"
                    label="رقم الهاتف"
                    placeholder="أدخل الرقم"
                    className="ltr-data"
                    {...register('phone')}
                    error={errors.phone?.message}
                />

                {isAdmin && (
                    <SelectInput
                        name="status"
                        label="حالة الحساب"
                        value={client?.status ?? 'active'}
                        onChange={(val) => setValue('status', val as 'active' | 'suspended')}
                        options={[
                            { label: 'نشط', value: 'active' },
                            { label: 'موقوف', value: 'suspended' },
                        ]}
                        error={errors.status?.message}
                    />
                )}

                <div className="col-span-12 flex items-center gap-6 flex-wrap">
                    <PrimaryButton type="submit">
                        {isCurentUser ? 'المعلومات الاساسية' : client ? 'تحديث بيانات العميل' : 'إضافة عميل جديد'}
                    </PrimaryButton>
                    <SoftActionButton onClick={handleCancel}>إلغاء</SoftActionButton>
                </div>
            </form>
        </Card>
    );
}
