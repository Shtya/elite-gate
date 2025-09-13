import React from 'react';
import { BiLike } from 'react-icons/bi';

type StatBadgeProps = {
    value: string;
    label: string;
};

export default function StatBadge({ value, label }: StatBadgeProps) {
    return (
        <div className="grid place-content-center w-[200px] h-[200px] rounded-3xl bg-primary shadow-lg absolute top-[30%] right-[13%]">
            <div className="w-10 h-10 rounded bg-white grid place-content-center text-primary mx-auto">
                <BiLike size={20} />
            </div>
            <h3 className="text-center  mt-3 h3 mb-1 text-white">{value}</h3>
            <p className="mb-0 text-sm text-center text-white">{label}</p>
        </div>
    );
}
