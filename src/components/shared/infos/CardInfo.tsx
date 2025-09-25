import { ReactNode } from 'react';

type CardInfoProps = {
    icon: ReactNode;
    value: string | number;
    label: string;
    className?: string; // ✅ new prop

};

export default function CardInfo({ icon, value, label, className }: CardInfoProps) {
    return (
        <div className={`bg-white border min-w-[250px]  rounded-2xl p-3 xl:p-3 flex items-center gap-6  ${className || ''}`}>
            <div className={`flex items-center justify-center rounded-full `}>
                {icon}
            </div>
            <div>
                <h2 className="h2 font-semibold mb-1">{value}</h2>
                <span className="text-sm text-gray-600">{label}</span>
            </div>
        </div>
    );
}
