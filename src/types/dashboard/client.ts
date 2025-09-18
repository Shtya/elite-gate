import { BaseFilterKeys } from "../components/table";

export type ClientStatus = 'active' | 'suspended';

export const statusMap: Record<ClientStatus, string> = {
    active: 'نشط',
    suspended: 'موقوف',
};


export type ClientFilterKeys =
    | 'status'
    | 'joinedAt_from'
    | 'joinedAt_to'
    | BaseFilterKeys


export type ClientRow = {
    id: number;
    image?: string;
    name: string;
    email: string;
    phone: string;
    joinedAt: string;
    status: ClientStatus;
};
