"use client";

import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {containerLogs, getContainer, startContainer, stopContainer} from "@/funcs/client/containers";
import {formatDate} from "@/lib/resource-utils";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";

export default function Container() {
    const router = useRouter();
    const params = useParams();
    const containerName = params?.name;

    const [view, setView] = useState("logs");
    const [running, setRunning] = useState(false);
    const [logs, setLogs] = useState("");
    const [containerInfo, setContainerInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [action, setAction] = useState("");

    async function loadContainer() {
        const data = await getContainer(containerName);
        if(data?.error) {
            router.push("/dashboard/containers");
            return;
        }

        setContainerInfo(data);
        setRunning(Boolean(data.State?.Running));
        setLoading(false);
    }

    async function loadLogs() {
        if (view !== "logs") {
            return;
        }

        const data = await containerLogs(containerName);
        setLogs(data);
    }

    useEffect(() => {
        if (!containerName) {
            return;
        }

        loadContainer();
    }, [containerName]);

    useEffect(() => {
        if (!containerName) {
            return;
        }

        loadLogs();
        const intervalId = setInterval(() => {
            if (!running || view !== "logs") {
                return;
            }
            loadLogs();
        }, 1500);

        return () => clearInterval(intervalId);
    }, [containerName, running, view]);

    async function runAction(type) {
        setAction(type);
        if (type === "Starting") {
            await startContainer(containerName);
        } else {
            await stopContainer(containerName);
        }
        await loadContainer();
        await loadLogs();
        setAction("");
    }

    if (loading) {
        return <div className="panel">Loading container…</div>;
    }

    return (
        <div className="page-stack">
            <PageHeader
                title={containerName}
                note={containerInfo?.Image}
                actions={(
                    <>
                        <StatusBadge tone={running ? "success" : "danger"}>
                            {running ? "Running" : "Stopped"}
                        </StatusBadge>
                        <button
                            className={`button ${running ? "button-danger" : "button-primary"}`}
                            type="button"
                            onClick={() => runAction(running ? "Stopping" : "Starting")}
                            disabled={Boolean(action)}
                        >
                            {action || (running ? "Stop container" : "Start container")}
                        </button>
                    </>
                )}
            />

            <div className="tabs">
                <button className={`tab ${view === "logs" ? "tab-active" : ""}`} onClick={() => setView("logs")} type="button">
                    Logs
                </button>
                <button className={`tab ${view === "overview" ? "tab-active" : ""}`} onClick={() => setView("overview")} type="button">
                    Overview
                </button>
            </div>

            {view === "logs" ? (
                <section className="panel">
                    <pre className="mono-block">{logs || "No logs available."}</pre>
                </section>
            ) : (
                <div className="split">
                    <section className="panel panel-section">
                        <h2 className="text-xl font-semibold">State</h2>
                        <div className="meta-list">
                            <span className="meta-label">Container ID</span>
                            <span>{containerInfo.Id}</span>
                            <span className="meta-label">Created</span>
                            <span>{formatDate(containerInfo.Created)}</span>
                            <span className="meta-label">Status</span>
                            <span>{containerInfo.State?.Status}</span>
                            <span className="meta-label">Exit code</span>
                            <span>{containerInfo.State?.ExitCode}</span>
                            <span className="meta-label">Restarting</span>
                            <span>{containerInfo.State?.Restarting ? "Yes" : "No"}</span>
                            <span className="meta-label">Paused</span>
                            <span>{containerInfo.State?.Paused ? "Yes" : "No"}</span>
                            <span className="meta-label">OOM killed</span>
                            <span>{containerInfo.State?.OOMKilled ? "Yes" : "No"}</span>
                        </div>
                    </section>

                    <section className="panel panel-section">
                        <h2 className="text-xl font-semibold">Network settings</h2>
                        <pre className="mono-block">{JSON.stringify(containerInfo.NetworkSettings, null, 2)}</pre>
                    </section>
                </div>
            )}
        </div>
    );
}
