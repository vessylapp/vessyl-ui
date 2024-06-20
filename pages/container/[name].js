"use client";
import Link from 'next/link'
import {useState, useEffect} from "react";
import { useRouter } from 'next/router';
import React from 'react';

export default function Container() {
    const [isLogged, setIsLogged] = useState(false);
    const [logs, setLogs] = useState("");
    const [containerName, setContainerName] = useState("");
    const router = useRouter();
    const [running, setRunning] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token !== null && token !== undefined) {
            setIsLogged(true)
        } else {
            router.push("/login");
            return;
        }
        setContainerName(window.location.pathname.split("/")[2]);
        async function getContainer() {
            const res = await fetch("/api/containerinfo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    name: window.location.pathname.split("/")[2],
                }),
            });
            const data = await res.json();
            setRunning(data.State.Running);
        }
        getContainer();
        async function getLogs() {
            const res = await fetch("/api/containerlogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    name: window.location.pathname.split("/")[2],
                }),
            });
            const data = await res.text();
            setLogs(data);
        }
        getLogs();
        const intervalId = setInterval(() => {
            getLogs();
        }, 1500);
        return () => {
            clearInterval(intervalId);
        };
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl mb-5 font-bold">Container logs</h1>
            <p className="mb-2">Logs for container {containerName}</p>
            <pre className="border p-2 rounded-md mb-2">
                {logs}
            </pre>
            <Link href="/dashboard" className="bg-blue-500 text-white p-2 rounded-md">Back</Link>
        </div>
    );
}