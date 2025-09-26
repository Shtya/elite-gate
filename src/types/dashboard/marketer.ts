import { BaseFilterKeys } from "../components/Table";

// Possible statuses for a marketer
export type MarketerStatus = 'active' | 'suspended';

// Map status → Arabic label
export const marketerStatusMap: Record<MarketerStatus, string> = {
    active: 'نشط',
    suspended: 'موقوف',
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
