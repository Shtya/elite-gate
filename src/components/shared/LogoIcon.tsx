'use client';

import React from 'react';
import Image from 'next/image';

export default function LogoIcon({ className = "" }) {
    return (

        <Image
            src="/logo.svg"
            alt="Logo"
            className={className}
            width={150}
            height={128}
            priority
        />
    );
}
