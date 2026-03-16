"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {checkForUpdates, status} from "@/funcs/client/status";
import {userInfo} from "@/funcs/client/auth";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";

export default function Dashboard() {
    const [serverStatus, setServerStatus] = useState(null);
    const [updateStatus, setUpdateStatus] = useState(null);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const [statusData, updateData, accountData] = await Promise.all([
                status(),
                checkForUpdates(),
                userInfo(),
            ]);

            setServerStatus(statusData);
            setUpdateStatus(updateData);
            setAccount(accountData);
        }

        fetchData();
    }, []);

    return (
        <div className="page-stack">
            <PageHeader
                title="Dashboard"
                note="Use settings to connect GitHub, create resources, and manage running containers."
            />

            <div className="split">
                <section className="panel panel-section">
                    <div className="stack-sm">
                        <h2 className="text-xl font-semibold">Instance</h2>
                        <div className="meta-list">
                            <span className="meta-label">Account</span>
                            <span>{account?.username || "Loading"}</span>
                            <span className="meta-label">Registration</span>
                            <span>{serverStatus?.registration ? "Enabled" : "Disabled"}</span>
                            <span className="meta-label">Setup</span>
                            <span>{serverStatus?.setup ? "Complete" : "Pending"}</span>
                            <span className="meta-label">Worker version</span>
                            <span>{serverStatus?.version || "Loading"}</span>
                            <span className="meta-label">Update status</span>
                            <span>
                                {updateStatus?.update ? (
                                    <StatusBadge tone="warning">Update available</StatusBadge>
                                ) : (
                                    <StatusBadge tone="success">Up to date</StatusBadge>
                                )}
                            </span>
                        </div>
                    </div>
                </section>

                <section className="panel panel-section">
                    <div className="stack-sm">
                        <h2 className="text-xl font-semibold">Next steps</h2>
                        <div className="stack-sm">
                            <Link href="/dashboard/settings" className="list-link">Open settings</Link>
                            <Link href="/dashboard/resources/new" className="list-link">Create a resource</Link>
                            <Link href="/dashboard/resources" className="list-link">Review resources</Link>
                            <Link href="/dashboard/containers" className="list-link">Review containers</Link>
                        </div>
                    </div>
                </section>
            </div>

            <section className="panel">
                <div className="stack-sm">
                    <h2 className="text-xl font-semibold">What Vessyl expects</h2>
                    <p className="page-note">
                        GitHub access is only required for resource deployments. Existing containers can be managed
                        without it.
                    </p>
                </div>
            </section>
        </div>
    )
}
