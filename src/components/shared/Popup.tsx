'use client';

import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';
import { useOutsideClick } from '@/hooks/useOutsideClick';

interface PopupProps {
    children: React.ReactNode;
    onClose?: () => void;
    show: boolean;
}

export default function Popup({ children, onClose, show }: PopupProps) {
    const popupRef = useRef<HTMLDivElement>(null);

    useOutsideClick(popupRef, () => {
        if (show) onClose?.();
    });

    return createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
        >
            <div
                ref={popupRef}
                className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-2 transition-all duration-300 scale-100"
            >
                {/* Close Button */}
                {onClose && (
                    <div className="flex">
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 ml-auto"
                            aria-label="إغلاق"
                        >
                            <MdClose className="w-5 h-5" />
                        </button>
                    </div>
                )}
                {children}
            </div>
        </div>,
        document.body
    );
}
