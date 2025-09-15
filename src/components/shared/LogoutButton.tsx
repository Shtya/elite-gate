'use client';

import React from 'react';

export default function LogoutButton() {
    return (
        <div className="mt-[60px] flex justify-center">
            <button
                type="button"
                className="px-6 py-2 text-white rounded-lg bg-[#243756] hover:bg-primary transition"
            >
                تسجيل خروج
            </button>
        </div>
    );
}
