export type ClientStatus = 'active' | 'suspended';

export const statusMap: Record<ClientStatus, string> = {
    active: 'نشط',
    suspended: 'موقوف',
};

export type ClientRow = {
    id: number;
    image?: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    joinedAt: string;
    status: ClientStatus;
};
