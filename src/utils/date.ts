// utils/date.ts
export function formatDate(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('ar-EG');
}

export function formatTime(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
}
