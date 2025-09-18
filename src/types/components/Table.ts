import { ReactElement } from "react";

export interface TableColumn {
    key: string;
    label: string;
    className?: string;
    cell?: (value: any) => ReactElement
}

export interface TableRow {
    [key: string]: any;
}


export type FilterConfig = {
    type: 'select' | 'dateRange';
    label: string;
    key: string;
    options?: { label: string; value: string }[]; // for select
};