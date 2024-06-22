"use client";

import Sidebar from "@/components/sb/Sidebar";

export default function Dashboard() {
    return (
        <>
            <Sidebar/>
            <div className={"p-6"}>
                <h1 className={"text-3xl font-bold"}>Dashboard</h1>
            </div>
        </>
    )
}