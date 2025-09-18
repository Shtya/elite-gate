'use client'
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { useState } from "react";


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    function toggleSidebar() {
        setSidebarOpen((p) => !p)
    }
    return (
        <section className="">
            <DashboardSidebar sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className={`lg:mr-[312px] relative h-screen flex flex-col ${sidebarOpen && "after:bg-black after:opacity-70 after:absolute after:inset-0 after:z-10 after:duration-300 overflow-y-hidden lg:after:content-none"}`}>
                <DashboardHeader toggleSidebar={toggleSidebar} />
                <div className="flex-1 px-3 lg:px-6 pb-4 lg:pb-6  ">

                    {children}
                </div>
                <DashboardFooter />
            </main>
        </section>
    )
}
