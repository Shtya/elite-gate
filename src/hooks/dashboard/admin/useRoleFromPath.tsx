"use client";

import { Role } from "@/types/global";
import { usePathname } from "next/navigation";

export function useRoleFromPath(): Role | undefined {
    const pathname = usePathname();
    const segments = pathname.split("/");

    // e.g. /dashboard/admin → ["", "dashboard", "admin"]
    const role = segments[2];

    if (role === "admin" || role === "marketer" || role === "agent") {
        return role;
    }

    return undefined;
}
