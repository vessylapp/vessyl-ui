"use client";

import Sidebar from "@/components/sb/Sidebar";
import Link from "next/link";

export default function Dashboard() {
    return (
        <>
            <Sidebar/>
            <div className={"p-6"}>
                <h1 className={"text-3xl font-bold"}>Dashboard</h1>
                <div className={"mt-5"}>
                    <p className={"text-lg"}>Welcome to Vessyl! To get started, link your <Link href={"/dashboard/settings"} className={"text-success"}>GitHub PAT</Link> and then create a <Link className={"text-success"} href={"/dashboard/resources/new"}>Resource</Link> to deploy an app.</p>
                </div>
            </div>
        </>
    )
}