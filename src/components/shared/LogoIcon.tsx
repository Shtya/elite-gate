'use client';

import React from 'react';
import Image from 'next/image';

export default function LogoIcon({ className = "" }) {
    return (

        <Image
            src="/logo1.svg"
            alt="Logo"
            className={className}
            width={58}
            height={100}
            priority
        />
    );
}
