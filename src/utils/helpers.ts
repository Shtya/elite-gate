


export const toSlug = (s: string) =>
    s.trim().toLowerCase().replace(/[^\u0600-\u06FF\w\s-]/g, '').replace(/\s+/g, '-');

export function extractVideoId(url: string): string {
    const match = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : "";
}