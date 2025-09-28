'use client'
import { useState } from 'react'
import Menu from '@/components/shared/Menu'
import ExportMenuContent from './ExportMenuContent'

interface DownloadContentProps {
    text?: string
}

export default function DownloadContent({
    text = 'تحميل القائمة',
}: DownloadContentProps) {



    return (
        <Menu
            width={250}
            align="left"
            trigger={(toggle) => (
                <button className="btn-primary" onClick={toggle} >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-5 h-5 inline-block ml-2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                    </svg>
                    {text}
                </button>
            )}
        >
            <ExportMenuContent />
        </Menu>
    )
}
