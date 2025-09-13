


export const toSlug = (s: string) =>
    s.trim().toLowerCase().replace(/[^\u0600-\u06FF\w\s-]/g, '').replace(/\s+/g, '-');

export function extractVideoId(url: string): string {
    const match = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : "";
}

export const generatePagination = (currentPage: number, totalPages: number) => {
    const pages = [];
    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        if (currentPage <= 3) {
            pages.push(1, 2, 3, 4, "...", totalPages);
        } else if (currentPage >= totalPages - 3) {
            pages.push(1, "...");
            for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(
                1,
                "...",
                currentPage - 1,
                currentPage,
                currentPage + 1,
                "...",
                totalPages,
            );
        }
    }
    return pages;
};