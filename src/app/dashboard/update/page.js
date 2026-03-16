"use client";

import {useRouter} from "next/navigation";
import {checkForUpdates} from "@/funcs/client/status";
import {useEffect, useState} from "react";
import PageHeader from "@/components/PageHeader";

export default function Update() {
    const [update, setUpdate] = useState(false);
    const router = useRouter();
    const [updating, setUpdating] = useState(false);
    const [checkCount, setCheckCount] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            const data = await checkForUpdates();
            setUpdate(data.update);
            if (!data.update) {
                return router.push("/dashboard");
            }
        }
        fetchData();
    }, []);

    async function updateVessyl() {
        setUpdating(true);
        let interval = setInterval(async () => {
            setCheckCount((prev) => prev + 1);
            const response = await fetch("/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if(response.status === 200) {
                clearInterval(interval);
                window.location.href = "/";
            }
        }, 10000);
        const response = await fetch("/api/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: localStorage.getItem("token"),
            }),
        });
        let data;
        try {
            data = await response.json();
            if(data.error) {
                setError(data.error);
                setUpdating(false);
                clearInterval(interval);
            }
        } catch (e) {
            // server is unreachable, that means the update is working
        }
    }

    if(updating) {
        return (
            <div className="page-stack">
                <PageHeader title="Updating" note="The instance will come back automatically after the updater finishes." />
                <section className="panel stack-md">
                    <div>Checks completed: {checkCount}</div>
                    <div className="notice">Waiting for the application to become reachable again…</div>
                </section>
            </div>
        )
    }

    return (
        <div className="page-stack">
            <PageHeader title="Update" note="Start the updater when a newer UI or worker release is available." />
            <section className="panel stack-md">
                {error ? <div className="notice notice-danger">{error}</div> : null}
                <p className="page-note">
                    This pulls the latest updater container and restarts the Vessyl stack.
                </p>
                <div className="page-actions">
                    <button className="button button-primary" onClick={updateVessyl}>Update</button>
                </div>
            </section>
        </div>
    )
}
