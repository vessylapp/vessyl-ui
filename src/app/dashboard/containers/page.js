"use client";

import {getContainers} from "@/funcs/client/containers";
import {useEffect, useState} from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";

export default function Containers() {
    const [containers, setContainers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const data = await getContainers();
            setContainers(data);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div className="page-stack">
            <PageHeader title="Containers" note="Running and stopped containers visible to the Vessyl worker." />
            <section className="panel">
                {isLoading ? (
                    <div className="notice">Loading containers…</div>
                ) : containers.length === 0 ? (
                    <div className="notice">No containers found.</div>
                ) : (
                    <div className="table-wrap">
                        <table className="data-table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {containers.map((container) => (
                                <tr key={container.name}>
                                    <td>
                                        <Link className="list-link" href={`/dashboard/containers/${container.name}`}>
                                            {container.name}
                                        </Link>
                                    </td>
                                    <td>{container.image}</td>
                                    <td>
                                        <StatusBadge tone={container.running ? "success" : "danger"}>
                                            {container.running ? "Running" : "Stopped"}
                                        </StatusBadge>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    )
}
