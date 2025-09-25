'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Card from '@/components/shared/Card';
import SelectSingleDate from '@/components/shared/Forms/SelectSingleDate';
import SelectTime from '@/components/shared/Forms/SelectTime';
import UserChanger from '../UserChanger';
import { agents, clients } from '@/constants/dashboard/admin/appointment/contants';
import TextareaInput from '@/components/shared/Forms/TextareaInput';
import PropertyChanger from '../Property Filter/PropertyChanger';
import { properties } from '@/constants/projects';
import FieldErrorMessage from '@/components/shared/Forms/FieldErrorMessage';
import PrimaryButton from '@/components/shared/Button';
import SoftActionButton from '@/components/shared/SoftActionButton';

const schema = z.object({
    date: z.string().min(1, 'يرجى اختيار التاريخ'),
    time: z.string().min(1, 'يرجى اختيار الوقت'),
    duration: z.number().min(1, 'يرجى اختيار مدة الموعد'),
    notes: z.string().optional(),
    agent: z
        .union([z.number(), z.undefined()])
        .refine((val) => typeof val === 'number', {
            message: 'يرجى اختيار وسيط',
        }),

    client: z
        .union([z.number(), z.undefined()])
        .refine((val) => typeof val === 'number', {
            message: 'يرجى اختيار عميل',
        }),
    property: z
        .union([z.string(), z.undefined()])
        .refine((val) => typeof val === 'string', {
            message: 'يرجى اختيار عقار',
        }),
});

type FormValues = z.infer<typeof schema>;

export default function AddAppointmentForm() {
    const {
        handleSubmit,
        setValue,
        watch,
        reset,
        getValues,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            date: '',
            duration: 0,
            time: '09:00',
            agent: undefined,
            client: undefined,
            property: undefined,
        },
    });

    const onSubmit = (data: FormValues) => {
        console.log('🆕 إضافة موعد جديد:', data);
    };


    const handleCancel = () => {
        reset();
    };

    return (
        <div className='space-y-4 lg:space-y-6'>
            <Card title="إضافة موعد جديد">
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-6">
                    {/* التاريخ */}
                    <div className="col-span-12 md:col-span-6">
                        <label htmlFor="date" className="text-lg font-medium block mb-3">تاريخ الموعد</label>
                        <SelectSingleDate
                            value={watch('date') ? new Date(watch('date')) : undefined}
                            onChange={(date) => setValue('date', date?.toISOString().split('T')[0] || '')}
                            label="تاريخ الموعد"
                            className='!w-full single-date'
                        />
                        <FieldErrorMessage errors={errors} fieldName='date' />
                    </div>

                    {/* الوقت */}
                    <div className="col-span-12 md:col-span-6">
                        <SelectTime
                            timeValue={watch('time')}
                            durationValue={watch('duration')}
                            onChangeTime={(time) => setValue('time', time || '')}
                            onChangeDuration={(duration) => setValue('duration', duration || 0)}
                            label="وقت الموعد"
                        />
                        <FieldErrorMessage errors={errors} fieldName={errors.time ? 'time' : 'duration'} />
                    </div>

                    {/* الوسيط */}
                    <div className="col-span-12 md:col-span-6">
                        <label className="text-lg font-medium block mb-3">الوسيط</label>
                        <UserChanger
                            users={agents}
                            label="وسيط"
                            onChange={(agent) => setValue('agent', agent?.id)}
                        />
                        <FieldErrorMessage errors={errors} fieldName='agent' />
                    </div>

                    {/* العميل */}
                    <div className="col-span-12 md:col-span-6">
                        <label className="text-lg font-medium block mb-3">العميل</label>
                        <UserChanger
                            users={clients}
                            label="عميل"
                            onChange={(client) => setValue('client', client?.id)}
                        />
                        <FieldErrorMessage errors={errors} fieldName='client' />
                    </div>


                    {/* العقار */}
                    <div className="col-span-12 md:col-span-6">
                        <label className="text-lg font-medium block mb-3">العقار</label>
                        <PropertyChanger
                            properties={properties}
                            label="عقار"
                            onChange={(property) => setValue('property', property?.id)}
                        />
                        <FieldErrorMessage errors={errors} fieldName='property' />
                    </div>


                    <TextareaInput
                        name="appointmentNotes"
                        id="appointmentNotes"
                        placeholder="أدخل ملاحظات حول الموعد..."
                        className="text-area h-full"
                        value={watch('notes')}

                        onChange={(e) => setValue('notes', e.target.value)}
                    />


                    {/* الإجراءات */}
                    <div className="col-span-12 flex items-center gap-6 flex-wrap mt-4">
                        <PrimaryButton type="submit">
                            حفظ الموعد
                        </PrimaryButton>
                        <SoftActionButton onClick={() => { }}>إلغاء</SoftActionButton>
                    </div>
                </form>

            </Card>

        </div>
    );
}
