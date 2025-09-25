'use client';

import { useState } from 'react';
import Popup from '@/components/shared/Popup';
import MarketerStatusToggle from './MarketerStatusToggle';
import { MarketerRow, MarketerStatus, marketerStatusMap } from '@/types/dashboard/marketer';
import { marketerStatusClassMap } from '@/constants/dashboard/admin/marketers/contants';

type Props = {
    currentStatus: MarketerStatus;
    marketer: MarketerRow;
};

export default function MarketerStatusControl({ currentStatus, marketer }: Props) {
    const [showPopup, setShowPopup] = useState(false);
    const [nextStatus, setNextStatus] = useState<MarketerStatus>('active');

    // For statuses with two options, we’ll render two buttons
    const isPending = currentStatus === 'pending';
    const isRejected = currentStatus === 'rejected';

    return (
        <>
            {(isPending || isRejected) ? (
                <div className="mt-6 flex gap-3">
                    {isPending && (
                        <>
                            <button
                                onClick={() => {
                                    setNextStatus('active');
                                    setShowPopup(true);
                                }}
                                className={`flex-1 px-4 py-2 rounded-md text-white font-semibold transition ${marketerStatusClassMap['active']}`}
                            >
                                قبول الطلب
                            </button>
                            <button
                                onClick={() => {
                                    setNextStatus('rejected');
                                    setShowPopup(true);
                                }}
                                className={`flex-1 px-4 py-2 rounded-md text-white font-semibold transition ${marketerStatusClassMap['rejected']}`}
                            >
                                رفض الطلب
                            </button>
                        </>
                    )}

                    {isRejected && (
                        <>
                            <button
                                onClick={() => {
                                    setNextStatus('active');
                                    setShowPopup(true);
                                }}
                                className={`flex-1 px-4 py-2 rounded-md text-white font-semibold transition ${marketerStatusClassMap['active']}`}
                            >
                                إعادة النظر
                            </button>
                            <button
                                onClick={() => {
                                    setNextStatus('pending');
                                    setShowPopup(true);
                                }}
                                className={`flex-1 px-4 py-2 rounded-md text-white font-semibold transition ${marketerStatusClassMap['pending']}`}
                            >
                                تحويل إلى قيد الانتظار
                            </button>
                        </>
                    )}
                </div>
            ) : (
                // Single button for active/suspended
                <button
                    onClick={() => setShowPopup(true)}
                    className={`mt-6 w-full px-4 py-2 rounded-md text-white font-semibold transition ${marketerStatusClassMap[currentStatus === 'suspended' ? 'active' : 'suspended']
                        }`}
                >
                    {currentStatus === 'suspended' ? 'تفعيل الحساب' : 'تعليق الحساب'}
                </button>
            )}

            <Popup show={showPopup} onClose={() => setShowPopup(false)}>
                <MarketerStatusToggle
                    marketer={marketer}
                    currentStatus={currentStatus}
                    nextStatus={nextStatus}
                    onConfirm={() => setShowPopup(false)}
                    onCancel={() => setShowPopup(false)}
                />
            </Popup>
        </>
    );
}
