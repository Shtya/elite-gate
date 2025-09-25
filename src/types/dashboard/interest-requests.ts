// types/dashboard/interest-requests.ts

import { InterestRequestStatus } from "@/constants/dashboard/admin/interestRequests/constants";
import { MiniProject, PropertyType } from "../property";
import { FileItem } from "@/utils/upload";

export type InterestRequestRow = {
    id: number;
    requesterName: string;
    relationshipType: string;
    propertyType: PropertyType;
    price: number;
    status: InterestRequestStatus;
    createdAt: string;
    publishedProperty?: MiniProject
};


export type InterestRequestFull = {
    id: number;
    requesterName: string;
    relationshipType: string;
    propertyType: PropertyType;
    price: number;
    status: InterestRequestStatus;
    attachments: FileItem[];
    address: string;
    specifications: Record<string, { name: string; value: string | string[] }>;
    authorizationDoc?: FileItem;
    createdAt: string;
    publishedProperty?: MiniProject
};
