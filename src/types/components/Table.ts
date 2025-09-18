

export type TableColumn<T = Record<string, any>> = {
    key: keyof T;
    label: string;
    className?: string;
    cell?: (value: T[keyof T], row?: T) => React.ReactNode;
};

export type TableRow<T = Record<string, any>> = T;

export type FilterConfig = {
    type: 'select' | 'dateRange';
    label: string;
    key: string;
    options?: { label: string; value: string }[]; // for select
};