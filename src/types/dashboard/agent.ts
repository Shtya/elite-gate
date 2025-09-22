import { BaseFilterKeys } from "../components/Table";

export type AgentStatus = 'active' | 'suspended' | 'pending' | 'rejected';

export const agentStatusMap: Record<AgentStatus, string> = {
    active: 'نشط',
    suspended: 'موقوف',
    pending: 'قيد الانتظار',
    rejected: 'مرفوض',
};


export type AgentFilterKeys =
    | 'status'
    | 'joinedAt_from'
    | 'joinedAt_to'
    | BaseFilterKeys;


export type AgentRow = {
    id: number;
    image?: string;
    name: string;
    email: string;
    phone: string;
    joinedAt: string;
    status: AgentStatus;
};
