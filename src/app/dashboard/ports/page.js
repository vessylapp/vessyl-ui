"use client";

import {getPorts} from "@/funcs/client/resources";
import {useEffect, useState} from "react";
import PageHeader from "@/components/PageHeader";

export default function Resources() {
    const [ports, setPorts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const data = await getPorts();
            setPorts(data.ports);
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div className="page-stack">
            <PageHeader title="Ports" note="Ports currently exposed by running containers." />
            <section className="panel">
                {loading ? (
                    <div className="notice">Loading ports…</div>
                ) : ports.length === 0 ? (
                    <div className="notice">No ports are currently exposed.</div>
                ) : (
                    <div className="table-wrap">
                        <table className="data-table">
                            <thead>
                            <tr>
                                <th>Port</th>
                            </tr>
                            </thead>
                            <tbody>
                            {ports.map((port) => (
                                <tr key={port}>
                                    <td>{port}</td>
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
