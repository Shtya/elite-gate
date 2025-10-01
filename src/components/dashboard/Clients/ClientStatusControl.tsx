'use client';

import { useState } from 'react';
import Popup from '@/components/shared/Popup';
import ClientStatusToggle from './ClientStatusToggle';
import { ClientRow } from '@/types/dashboard/client';

type Props = {
    currentStatus: 'active' | 'suspended';
    client: ClientRow;
};

export default function ClientStatusControl({ currentStatus, client }: Props) {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowPopup(true)}
                className={`w-full px-4 py-2 rounded-md text-white font-semibold transition ${currentStatus === 'suspended'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                    }`}
            >
                {currentStatus === 'suspended' ? 'تفعيل الحساب' : 'تعليق الحساب'}
            </button>

            <Popup show={showPopup} onClose={() => setShowPopup(false)}>
                <ClientStatusToggle
                    client={client}
                    currentStatus={currentStatus}
                    onConfirm={() => {
                        setShowPopup(false);
                    }}
                    onCancel={() => setShowPopup(false)}
                />
            </Popup>
        </>
    );
}
