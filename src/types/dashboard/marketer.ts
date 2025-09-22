import { BaseFilterKeys } from "../components/table";

// Possible statuses for a marketer
export type MarketerStatus = 'active' | 'suspended' | 'pending' | 'rejected';

// Map status → Arabic label
export const marketerStatusMap: Record<MarketerStatus, string> = {
    active: 'نشط',
    suspended: 'موقوف',
    pending: 'قيد الانتظار',
    rejected: 'مرفوض',
};

// Marketer row type (used in tables, lists, etc.)
export type MarketerRow = {
    id: number;
    image?: string;
    name: string;
    email: string;
    phone: string;
    joinedAt: string;
    status: MarketerStatus;
};

// Filter keys for marketer list pages
export type MarketerFilterKeys =
    | 'status'
    | 'joinedAt_from'
    | 'joinedAt_to'
    | BaseFilterKeys;
