"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {newResource} from "@/funcs/client/resources";
import {sanitizeResourceName} from "@/lib/resource-utils";
import PageHeader from "@/components/PageHeader";

export default function NewResource() {
    const router = useRouter();
    const [resourceName, setResourceName] = useState("");
    const [repo, setRepo] = useState("");
    const [buildTool, setBuildTool] = useState("0");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const buildTools = ["nixpacks", "dockerfile"];

    async function createResource() {
        setLoading(true);
        const data = await newResource(resourceName, repo, buildTools[buildTool]);
        if (data.error) {
            setLoading(false);
            setError(data.error);
            return;
        }
        return router.push("/dashboard/resources/" + resourceName);
    }

    return (
        <div className="page-stack">
            <PageHeader title="New resource" note="Add the repository and build method Vessyl should use for deployments." />
            <section className="panel">
                {error ? <div className="notice notice-danger">{error}</div> : null}
                <form className="stack-md" onSubmit={(e) => {
                    e.preventDefault();
                    createResource()
                }}>
                    <label className="field">
                        <span className="field-label">Resource name</span>
                        <input
                            className="input"
                            placeholder="my-resource"
                            value={resourceName}
                            onChange={(e) => setResourceName(sanitizeResourceName(e.target.value))}
                        />
                        <span className="field-note">Lowercase letters, numbers, and dashes only.</span>
                    </label>

                    <label className="field">
                        <span className="field-label">GitHub repository</span>
                        <input
                            className="input"
                            placeholder="username/repository"
                            value={repo}
                            onChange={(e) => setRepo(e.target.value)}
                        />
                    </label>

                    <label className="field">
                        <span className="field-label">Build tool</span>
                        <select
                            className="select"
                            value={buildTool}
                            onChange={(e) => setBuildTool(e.target.value)}
                        >
                            {buildTools.map((tool, index) => (
                                <option key={tool} value={index}>{tool}</option>
                            ))}
                        </select>
                    </label>

                    <div className="page-actions">
                        <button className="button button-primary" disabled={loading} type="submit">
                            {loading ? "Creating…" : "Create resource"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}
