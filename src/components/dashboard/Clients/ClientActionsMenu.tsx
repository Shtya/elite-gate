// UserActionsMenu.tsx
'use client';

import Link from 'next/link';
import { TableRow } from '@/types/components/Table';
import { PiPencilCircleDuotone } from 'react-icons/pi';
import { BiTrash } from 'react-icons/bi';
import { FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';

type Props = {
    row?: TableRow;           // optional here; injected at runtime
    onClose?: () => void;     // optional here; injected at runtime
};

export default function ClientActionsMenu({ row, onClose }: Props) {
    const close = onClose ?? (() => { });
    const id = (row as any)?.id;
    const name = (row as any)?.name ?? 'المستخدم';


    return (
        <div className="flex flex-col gap-2">
            <Link
                href={id ? `/users/${id}/edit` : '#'}
                onClick={close}
                className="flex items-center gap-2 text-sm text-[var(--dark)] hover:text-[var(--primary)] disabled:opacity-50"
            >
                <FaPencilAlt className="w-4 h-4" />
                تعديل المستخدم
            </Link>
            <button
                onClick={() => {
                    close();
                    console.log('Deleting user:', id ?? 'unknown', name);
                }}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800"
            >
                <FaRegTrashAlt className="w-4 h-4" />
                حذف المستخدم
            </button>
        </div>
    );
}
