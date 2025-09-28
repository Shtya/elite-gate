'use client';

import { useState } from 'react';
import Popup from '@/components/shared/Popup';
import AgentStatusToggle from './AgentStatusToggle';
import { AgentRow, AgentStatus } from '@/types/dashboard/agent';
import { agentStatusClassMap } from '@/constants/dashboard/admin/agent/contants';


type Props = {
    currentStatus: AgentStatus;
    agent: AgentRow;
};

export default function AgentStatusControl({ currentStatus, agent }: Props) {
    const [showPopup, setShowPopup] = useState(false);
    const [nextStatus, setNextStatus] = useState<AgentStatus>('active');

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
                                className={`flex-1 px-4 py-2 rounded-md text-white font-semibold transition ${agentStatusClassMap['active']}`}
                            >
                                قبول الطلب
                            </button>
                            <button
                                onClick={() => {
                                    setNextStatus('rejected');
                                    setShowPopup(true);
                                }}
                                className={`flex-1 px-4 py-2 rounded-md text-white font-semibold transition ${agentStatusClassMap['rejected']}`}
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
                                className={`flex-1 px-4 py-2 rounded-md text-white font-semibold transition ${agentStatusClassMap['active']}`}
                            >
                                إعادة النظر
                            </button>
                            <button
                                onClick={() => {
                                    setNextStatus('pending');
                                    setShowPopup(true);
                                }}
                                className={`flex-1 px-4 py-2 rounded-md text-white font-semibold transition ${agentStatusClassMap['pending']}`}
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
                    className={`mt-6 w-full px-4 py-2 rounded-md text-white font-semibold transition ${agentStatusClassMap[currentStatus === 'suspended' ? 'active' : 'suspended']
                        }`}
                >
                    {currentStatus === 'suspended' ? 'تفعيل الحساب' : 'تعليق الحساب'}
                </button>
            )}

            <Popup show={showPopup} onClose={() => setShowPopup(false)}>
                <AgentStatusToggle
                    agent={agent}
                    currentStatus={currentStatus}
                    nextStatus={nextStatus}
                    onConfirm={() => setShowPopup(false)}
                    onCancel={() => setShowPopup(false)}
                />
            </Popup>
        </>
    );
}
