

export type TableColumn<T = Record<string, any>> = {
    key: keyof T;
    label: string;
    className?: string;
    cell?: (value: T[keyof T], row?: T) => React.ReactNode;
};

export type TableRow<T = Record<string, any>> = T;

export type BaseFilterKeys = 'sort' | 'dir' | 'search' | 'page' | 'limit';

export type FilterConfig<T extends string = string> = {
    type: 'select' | 'dateRange';
    label: string;
    key: T;
    options?: { label: string; value: string }[]; // for select
    default?: string | { stateDate?: Date; endDate?: Date };
};


export type SortConfig = {
    defaultSort?: string;
    defaultDir?: string
    sortFields: { label: string; value: string }[];
    directions?: { label: string; value: string }[];
};
