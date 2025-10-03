import { FileItem } from "@/utils/upload";
import { BaseFilterKeys } from "../components/Table";
import { MiniProject } from "../property";

// types/appointment.ts


export type BookingStatus =
    | 'pending'
    | 'assigned'
    | 'confirmed'
    | 'in_progress'
    | 'completed'
    | 'cancelled'
    | 'no_show';


export type AppointmentFilterKeys =
    | 'status'
    | 'appointmentAt_from'
    | 'appointmentAt_to'
    | 'createdAt_from'
    | 'createdAt_to'
    | 'agentId'
    | 'isPaid'
    | BaseFilterKeys


export type MiniUser = {
    id: number;
    name: string;
    email: string;
    image?: string;
    phone?: string
};



export type AppointmentRow = {
    id: number;
    project: MiniProject;
    appointmentAt: string;
    createdAt: string;
    agent: MiniUser;
    client: MiniUser;
    status: BookingStatus;
    reviewStars?: number;
    agentReviewStars?: number;
    agentReviewText?: string;
    isPaid?: boolean;
    proofFiles?: FileItem[];
    expectedProfit?: number;
};
