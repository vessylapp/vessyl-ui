"use client";

import {getResources} from "@/funcs/client/resources";
import {useEffect, useState} from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";

export default function Resources() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const data = await getResources();
            setResources(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div className="page-stack">
            <PageHeader
                title="Resources"
                note="Resources store repository and deployment settings before they become running containers."
                actions={<Link href="/dashboard/resources/new" className="button button-primary">Add resource</Link>}
            />

            <section className="panel">
                {loading ? (
                    <div className="notice">Loading resources…</div>
                ) : resources.length === 0 ? (
                    <div className="notice">No resources yet.</div>
                ) : (
                    <div className="table-wrap">
                        <table className="data-table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Repository</th>
                                <th>Build</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {resources.map((resource) => (
                                <tr key={resource.name}>
                                    <td>
                                        <Link className="list-link" href={`/dashboard/resources/${resource.name}`}>
                                            {resource.name}
                                        </Link>
                                    </td>
                                    <td>{resource.git_url}</td>
                                    <td>{resource.type}</td>
                                    <td>
                                        <StatusBadge tone={resource.container?.running ? "success" : "danger"}>
                                            {resource.container?.running ? "Running" : "Stopped"}
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
