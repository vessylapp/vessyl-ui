"use client";

import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {getBuild, getBuilds} from "@/funcs/client/builds";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";

function toneForStatus(status) {
    if (status === "succeeded") return "success";
    if (status === "failed") return "danger";
    if (status === "running") return "warning";
    return "neutral";
}

export default function BuildsPage() {
    const searchParams = useSearchParams();
    const buildFromQuery = searchParams.get("build");

    const [builds, setBuilds] = useState([]);
    const [selectedBuildId, setSelectedBuildId] = useState(buildFromQuery || "");
    const [selectedBuild, setSelectedBuild] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (buildFromQuery) {
            setSelectedBuildId(buildFromQuery);
        }
    }, [buildFromQuery]);

    useEffect(() => {
        let active = true;

        async function loadBuilds() {
            const data = await getBuilds();
            if (!active) {
                return;
            }

            setBuilds(Array.isArray(data) ? data : []);
            setLoading(false);

            if (!selectedBuildId && Array.isArray(data) && data.length > 0) {
                setSelectedBuildId(data[0].id);
            }
        }

        loadBuilds();
        const intervalId = window.setInterval(loadBuilds, 2000);
        return () => {
            active = false;
            window.clearInterval(intervalId);
        };
    }, [selectedBuildId]);

    useEffect(() => {
        if (!selectedBuildId) {
            setSelectedBuild(null);
            return;
        }

        let active = true;

        async function loadBuild() {
            const data = await getBuild(selectedBuildId);
            if (!active || data?.error) {
                return;
            }

            setSelectedBuild(data);
        }

        loadBuild();
        const intervalId = window.setInterval(loadBuild, 1500);
        return () => {
            active = false;
            window.clearInterval(intervalId);
        };
    }, [selectedBuildId]);

    return (
        <div className="page-stack">
            <PageHeader title="Builds" note="Background builds stay here while logs update and the new container is prepared." />

            <div className="split">
                <section className="panel">
                    {loading ? (
                        <div className="notice">Loading builds…</div>
                    ) : builds.length === 0 ? (
                        <div className="notice">No builds have been started yet.</div>
                    ) : (
                        <div className="table-wrap">
                            <table className="data-table">
                                <thead>
                                <tr>
                                    <th>Resource</th>
                                    <th>Status</th>
                                    <th>Started</th>
                                </tr>
                                </thead>
                                <tbody>
                                {builds.map((build) => (
                                    <tr
                                        key={build.id}
                                        onClick={() => setSelectedBuildId(build.id)}
                                        aria-selected={selectedBuildId === build.id}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <td>{build.resourceName}</td>
                                        <td>
                                            <StatusBadge tone={toneForStatus(build.status)}>
                                                {build.status}
                                            </StatusBadge>
                                        </td>
                                        <td>{build.startedAt ? new Date(build.startedAt).toLocaleString() : "Queued"}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

                <section className="panel panel-section">
                    {selectedBuild ? (
                        <>
                            <div className="meta-list">
                                <span className="meta-label">Resource</span>
                                <span>{selectedBuild.resourceName}</span>
                                <span className="meta-label">Status</span>
                                <span>
                                    <StatusBadge tone={toneForStatus(selectedBuild.status)}>
                                        {selectedBuild.status}
                                    </StatusBadge>
                                </span>
                                <span className="meta-label">Container</span>
                                <span>{selectedBuild.containerName}</span>
                                <span className="meta-label">Started</span>
                                <span>{selectedBuild.startedAt ? new Date(selectedBuild.startedAt).toLocaleString() : "Queued"}</span>
                                <span className="meta-label">Finished</span>
                                <span>{selectedBuild.finishedAt ? new Date(selectedBuild.finishedAt).toLocaleString() : "In progress"}</span>
                            </div>
                            <pre className="mono-block">{selectedBuild.logs || "Waiting for build logs…"}</pre>
                        </>
                    ) : (
                        <div className="notice">Select a build to view logs.</div>
                    )}
                </section>
            </div>
        </div>
    );
}
