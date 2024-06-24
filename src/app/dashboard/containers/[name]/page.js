"use client";

import {useEffect, useState} from "react";
import Sidebar from "@/components/sb/Sidebar";
import {useRouter} from "next/navigation";
import {isLoggedIn} from "@/funcs/client/isLoggedIn";
import {getContainer, containerLogs} from "@/funcs/client/containers";

export default function Container() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [showLogs, setShowLogs] = useState(true);
    const [running, setRunning] = useState(false);
    const [className, setClassName] = useState("border-red-500");
    const [logs, setLogs] = useState("");
    const [containerInfo, setContainerInfo] = useState({});

    useEffect(() => {
        setName(window.location.pathname.split("/").pop());
        async function fetchData() {
            const areWeLoggedIn = await isLoggedIn();
            if (!areWeLoggedIn) {
                return router.push("/auth/login");
            }
        }
        fetchData();
        async function getContainerInfo(name) {
            const data = await getContainer(name);
            if(data.error) {
                return router.push("/dashboard/containers");
            }
            setContainerInfo(data);
            setRunning(data.State.Running);
            if (data.State.Running) {
                setClassName("border-green-500");
            }
        }
        getContainerInfo(window.location.pathname.split("/").pop());
        async function getLogs() {
            if (!showLogs) {
                return;
            }
            const data = await containerLogs(window.location.pathname.split("/").pop());
            setLogs(data);
        }
        getLogs();
        const intervalId = setInterval(() => {
            getLogs();
        }, 1500);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <>
            <Sidebar/>
            <div className={"p-6"}>
                <div className="flex flex-row mb-4">
                    <h1 className={"text-3xl font-bold border-b-2 " + className}>{name}</h1>
                    <div className={"ml-5"}>
                        <button onClick={() => setShowLogs(true)}
                                className={`transition-all duration-500 px-4 py-2 border-b-2 ${showLogs ? 'border-blue-500' : 'border-gray-500'}`}>Logs
                        </button>
                        <button onClick={() => setShowLogs(false)}
                                className={`transition-all duration-500 px-4 py-2 border-b-2 ${showLogs ? 'border-gray-500' : 'border-blue-500'}`}>Overview
                        </button>
                    </div>
                </div>
                {showLogs ? (
                    <pre className="border p-2 rounded-md overflow-auto max-h-[90vh] max-w-[175vh]">
                        {logs === "" ? "No logs available" : logs}
                    </pre>
                ) : (
                    <div className={"border p-2 rounded-md overflow-auto max-h-[90vh] max-w-[175vh]"}>
                        <p>Overview</p>
                        <p>Container ID: {containerInfo.Id}</p>
                        <p>Image: {containerInfo.Image}</p>
                        <p>Created: {new Date(containerInfo.Created * 1000).toLocaleString()}</p>
                        <p>State: {containerInfo.State.Status}</p>
                        <p>Running: {containerInfo.State.Running ? "Yes" : "No"}</p>
                        <p>Paused: {containerInfo.State.Paused ? "Yes" : "No"}</p>
                        <p>Restarting: {containerInfo.State.Restarting ? "Yes" : "No"}</p>
                        <p>OOM Killed: {containerInfo.State.OOMKilled ? "Yes" : "No"}</p>
                        <p>Exit Code: {containerInfo.State.ExitCode}</p>
                        <p>Network Settings: </p>
                        <pre>{JSON.stringify(containerInfo.NetworkSettings, null, 2)}</pre>
                    </div>
                )}
            </div>
        </>
    )
}