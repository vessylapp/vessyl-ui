"use client";

import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {useParams, useRouter} from "next/navigation";
import {deleteResource, getResource} from "@/funcs/client/resources";
import {getToken, postJson, withToken} from "@/lib/client-api";
import {formatListField, normalizeEnvPairs, parseListField} from "@/lib/resource-utils";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";

export default function Resource() {
    const router = useRouter();
    const params = useParams();
    const resourceName = params?.name;
    const preRef = useRef(null);

    const [showOverview, setShowOverview] = useState(true);
    const [resourceInfo, setResourceInfo] = useState(null);
    const [envRows, setEnvRows] = useState([]);
    const [network, setNetwork] = useState("");
    const [ports, setPorts] = useState("");
    const [volumes, setVolumes] = useState("");
    const [domain, setDomain] = useState("");
    const [baseDir, setBaseDir] = useState("");
    const [deploying, setDeploying] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [deployStream, setDeployStream] = useState("");

    useEffect(() => {
        if (preRef.current) {
            preRef.current.scrollTop = preRef.current.scrollHeight;
        }
    }, [deployStream]);

    async function loadResourceInfo(currentName) {
        const data = await getResource(currentName);
        if(data?.error) {
            router.push("/dashboard/resources");
            return;
        }

        setResourceInfo(data);
        setEnvRows(normalizeEnvPairs(data.env));
        setNetwork(data.network || "");
        setPorts(formatListField(data.ports));
        setVolumes(formatListField(data.volumes));
        setDomain(data.domain || "");
        setBaseDir(data.baseDir || "");
        setIsLoading(false);
    }

    useEffect(() => {
        if (!resourceName) {
            return;
        }

        loadResourceInfo(resourceName);
    }, [resourceName]);

    async function saveSettings(event, reload = true, silent = false) {
        if (event) {
            event.preventDefault();
        }

        if (!silent) {
            setIsSaving(true);
        }

        const body = {
            name: resourceName,
            reload,
        };

        const portList = parseListField(ports);
        const volumeList = parseListField(volumes);

        const envList = envRows
            .map((entry) => ({
                key: String(entry.key ?? "").trim(),
                value: String(entry.value ?? "").trim(),
            }))
            .filter((entry) => entry.key);

        body.env = envList;
        if (network) body.network = network;
        if (portList.length) body.ports = portList;
        if (volumeList.length) body.volumes = volumeList;
        if (domain) body.domain = domain;
        if (baseDir) body.baseDir = baseDir;

        await postJson("/api/saveResourceSettings", withToken(body));

        if (!silent) {
            setIsSaving(false);
            await loadResourceInfo(resourceName);
        }
    }

    async function deleteCurrentResource() {
        setIsDeleting(true);
        const data = await deleteResource(resourceName);
        if (!data || data.error) {
            setIsDeleting(false);
            return;
        }
        router.push("/dashboard/resources");
    }

    async function deploy() {
        await saveSettings(null, false, true);
        setDeployStream("");
        setDeploying(true);

        const response = await fetch("/api/deployResource", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: getToken(),
                name: resourceName,
            }),
        });

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let pending = "";

        if (reader) {
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }

                pending += decoder.decode(value, { stream: true });
                const lines = pending.split(/\r?\n/);
                pending = lines.pop() || "";
                setDeployStream((current) => `${current}${lines.join("\n")}${lines.length ? "\n" : ""}`);
            }
        }

        if (pending) {
            setDeployStream((current) => `${current}${pending}`);
        }

        setDeployStream((current) => `${current}\nDeployment finished. Redirecting to the container page…`);
        await new Promise((resolve) => setTimeout(resolve, 2500));
        router.push(`/dashboard/containers/${resourceName}`);
    }

    function addEnvRow() {
        setEnvRows((current) => [...current, { key: "", value: "" }]);
    }

    function updateEnvRow(index, field, value) {
        setEnvRows((current) => current.map((entry, entryIndex) => {
            if (entryIndex !== index) {
                return entry;
            }

            return {
                ...entry,
                [field]: value,
            };
        }));
    }

    function removeEnvRow(index) {
        setEnvRows((current) => current.filter((_, entryIndex) => entryIndex !== index));
    }

    if (isLoading) {
        return <div className="panel">Loading resource…</div>;
    }

    if (deploying) {
        return (
            <div className="page-stack">
                <PageHeader title={`Deploy ${resourceName}`} note="Build output will stream here until the deployment completes." />
                <section className="panel">
                    <pre className="mono-block" ref={preRef}>{deployStream || "Starting deployment…"}</pre>
                </section>
            </div>
        );
    }

    return (
        <div className="page-stack">
            <PageHeader
                title={resourceName}
                note={resourceInfo?.git_url}
                actions={(
                    <>
                        {resourceInfo?.container?.container_id ? (
                            <Link href={`/dashboard/containers/${resourceInfo.container.container_id}`} className="button">
                                View container
                            </Link>
                        ) : null}
                        <button className="button button-primary" onClick={deploy} type="button">
                            Deploy
                        </button>
                        <button className="button button-danger" onClick={deleteCurrentResource} type="button" disabled={isDeleting}>
                            {isDeleting ? "Deleting…" : "Delete"}
                        </button>
                    </>
                )}
            />

            <div className="tabs">
                <button className={`tab ${showOverview ? "tab-active" : ""}`} onClick={() => setShowOverview(true)} type="button">
                    Overview
                </button>
                <button className={`tab ${!showOverview ? "tab-active" : ""}`} onClick={() => setShowOverview(false)} type="button">
                    Settings
                </button>
            </div>

            {showOverview ? (
                <div className="split">
                    <section className="panel panel-section">
                        <h2 className="text-xl font-semibold">Details</h2>
                        <div className="meta-list">
                            <span className="meta-label">Build type</span>
                            <span>{resourceInfo.type}</span>
                            <span className="meta-label">Status</span>
                            <span>
                                <StatusBadge tone={resourceInfo.container?.running ? "success" : "danger"}>
                                    {resourceInfo.container?.running ? "Running" : "Stopped"}
                                </StatusBadge>
                            </span>
                            <span className="meta-label">Container</span>
                            <span>{resourceInfo.container?.container_id || "Not deployed"}</span>
                            <span className="meta-label">Domain</span>
                            <span>{resourceInfo.domain || "Not set"}</span>
                            <span className="meta-label">Base directory</span>
                            <span>{resourceInfo.baseDir || "/"}</span>
                        </div>
                    </section>

                    <section className="panel panel-section">
                        <h2 className="text-xl font-semibold">Runtime configuration</h2>
                        <div className="stack-md">
                            <div>
                                <div className="meta-label">Environment</div>
                                <div className="table-wrap">
                                    <table className="data-table">
                                        <thead>
                                        <tr>
                                            <th>Key</th>
                                            <th>Value</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {envRows.length === 0 ? (
                                            <tr>
                                                <td colSpan="2">No environment variables configured.</td>
                                            </tr>
                                        ) : envRows.map((entry, index) => (
                                            <tr key={`${index}-${entry.key}`}>
                                                <td>{entry.key}</td>
                                                <td>{entry.value || " "}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="meta-list">
                                <span className="meta-label">Ports</span>
                                <span>{ports || "None"}</span>
                                <span className="meta-label">Volumes</span>
                                <span>{volumes || "None"}</span>
                                <span className="meta-label">Network</span>
                                <span>{network || "Default"}</span>
                            </div>
                        </div>
                    </section>
                </div>
            ) : (
                <section className="panel">
                    <form className="stack-md" onSubmit={saveSettings}>
                        <div className="notice">
                            Use commas to separate multiple values for ports or volumes. Environment variables are stored as key/value pairs.
                        </div>
                        <label className="field">
                            <span className="field-label">Name</span>
                            <input className="input" value={resourceInfo.name} disabled />
                        </label>
                        <label className="field">
                            <span className="field-label">Git URL</span>
                            <input className="input" value={resourceInfo.git_url} disabled />
                        </label>
                        <label className="field">
                            <span className="field-label">Base directory</span>
                            <input className="input" value={baseDir} onChange={(e) => setBaseDir(e.target.value)} />
                        </label>
                        <div className="field">
                            <div className="page-actions">
                                <span className="field-label">Environment variables</span>
                                <button className="button button-success button-small" onClick={addEnvRow} type="button">
                                    +
                                </button>
                            </div>
                            <div className="table-wrap">
                                <table className="data-table">
                                    <thead>
                                    <tr>
                                        <th>Key</th>
                                        <th>Value</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {envRows.length === 0 ? (
                                        <tr>
                                            <td colSpan="3">No environment variables configured.</td>
                                        </tr>
                                    ) : envRows.map((entry, index) => (
                                        <tr key={`${index}-${entry.key}`}>
                                            <td>
                                                <input
                                                    className="input table-input"
                                                    value={entry.key}
                                                    onChange={(e) => updateEnvRow(index, "key", e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    className="input table-input"
                                                    value={entry.value}
                                                    onChange={(e) => updateEnvRow(index, "value", e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <button
                                                    className="button button-danger button-small"
                                                    onClick={() => removeEnvRow(index)}
                                                    type="button"
                                                >
                                                    -
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <label className="field">
                            <span className="field-label">Network</span>
                            <input className="input" value={network} onChange={(e) => setNetwork(e.target.value)} />
                        </label>
                        <label className="field">
                            <span className="field-label">Ports</span>
                            <input className="input" value={ports} onChange={(e) => setPorts(e.target.value)} />
                        </label>
                        <label className="field">
                            <span className="field-label">Volumes</span>
                            <input className="input" value={volumes} onChange={(e) => setVolumes(e.target.value)} />
                        </label>
                        <label className="field">
                            <span className="field-label">Domain</span>
                            <input className="input" value={domain} onChange={(e) => setDomain(e.target.value)} />
                        </label>
                        <div className="page-actions">
                            <button className="button button-primary" disabled={isSaving} type="submit">
                                {isSaving ? "Saving…" : "Save settings"}
                            </button>
                        </div>
                    </form>
                </section>
            )}
        </div>
    );
}
