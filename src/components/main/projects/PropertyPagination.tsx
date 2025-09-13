'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '@/components/shared/Pagination';

interface PaginationControllerProps {
    pageCount: number;
}

export default function PropertyPagination({ pageCount }: PaginationControllerProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get('page')) || 1;

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={handlePageChange}
        />
    );
}
