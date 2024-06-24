"use client";

import {useEffect, useState, useRef} from "react";
import Sidebar from "@/components/sb/Sidebar";
import {useRouter} from "next/navigation";
import {getResource} from "@/funcs/client/resources";
import {Button, Input, Select, SelectItem} from "@nextui-org/react";
import Link from "next/link";

export default function Resource() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [showOverview, setShowOverview] = useState(true);
    const [resourceInfo, setResourceInfo] = useState({});
    const [envVariables, setEnvVariables] = useState("");
    const [network, setNetwork] = useState("");
    const [ports, setPorts] = useState("");
    const [volumes, setVolumes] = useState("");
    const [containerId, setContainerId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [deploying, setDeploying] = useState(false);
    const [deployStream, setDeployStream] = useState("");
    const preRef = useRef(null);

    useEffect(() => {
        if (preRef.current) {
          preRef.current.scrollTop = preRef.current.scrollHeight;
        }
    }, [deployStream]);

    async function deploy() {
        await saveSettings();
        setDeployStream("");
        setDeploying(true);
        const token = localStorage.getItem("token");
        const res = await fetch("/api/deployResource", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
                name
            }),
        });

        const reader = res.body.getReader();
        let stream = "";
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            const text = decoder.decode(value, { stream: true });
            stream += text;

            let lines = stream.split(/\r?\n/);
            stream = lines.pop();

            setDeployStream((prev) => prev + lines.join("\n") + "\n");
        }

        if (stream.length > 0) {
            setDeployStream((prev) => prev + stream);
        }

        setDeployStream((prev) => prev + "\nThis will close in 5 seconds.");

        await new Promise(resolve => setTimeout(resolve, 5000));

        return router.push("/dashboard/containers/" + name);
    }

    async function saveSettings(e = null){
        if(e) e.preventDefault();
        let newEnvVariables = "";
        let newPorts = "";
        let newVolumes = "";
        if(envVariables !== "") newEnvVariables = envVariables.split(',');
        if(ports !== "") newPorts = ports.split(',');
        if(volumes !== "") newVolumes = volumes.split(',');
        const token = localStorage.getItem("token");
        const bodyToGive = {};
        if(newEnvVariables !== "") bodyToGive.env = newEnvVariables;
        if(network !== "") bodyToGive.network = network;
        if(newPorts !== "") bodyToGive.ports = newPorts;
        if(newVolumes !== "") bodyToGive.volumes = newVolumes;
        const res = await fetch("/api/saveResourceSettings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
                name,
                ...bodyToGive,
            }),
        });
        const data = await res.json();
        console.log(data);
    }

    useEffect(() => {
        setName(window.location.pathname.split("/").pop());
        async function getResourceInfo(name) {
            const data = await getResource(name);
            if(data.error) {
                return router.push("/dashboard/resources");
            }
            if(data.env) {
                let envs = "";
                data.env.forEach((env) => {
                    if(data.env.indexOf(env) === data.env.length - 1) {
                        envs += env;
                    } else {
                        envs += env + ",";
                    }
                })
                setEnvVariables(envs);
            }
            if(data.network) {
                setNetwork(data.network);
            }
            if(data.ports) {
                let ports = "";
                data.ports.forEach((port) => {
                    if(data.ports.indexOf(port) === data.ports.length - 1) {
                        ports += port;
                    } else {
                        ports += port + ",";
                    }
                })
                setPorts(ports);
            }
            if(data.volumes) {
                let volumes = "";
                data.volumes.forEach((volume) => {
                    if(data.volumes.indexOf(volume) === data.volumes.length - 1) {
                        volumes += volume;
                    } else {
                        volumes += volume + ",";
                    }
                })
                setVolumes(volumes);
            }
            setContainerId(data.container.container_id)
            setResourceInfo(data);
            console.log(data);
            setIsLoading(false);
        }
        getResourceInfo(window.location.pathname.split("/").pop());
    }, []);

    if(isLoading) return (
        <>
            <Sidebar/>
            <div className={"p-6"}>
                <h1>Loading...</h1>
            </div>
        </>
    )

    if (deploying) return (
        <>
            <Sidebar/>
            <div className={"p-6"}>
                <h1>Deploying {name}</h1>
                <pre className="border p-2 rounded-md overflow-auto max-h-[90vh] max-w-[175vh]" ref={preRef}>
                    {deployStream}
                </pre>
            </div>
        </>
    )

    return (
        <>
            <Sidebar/>
            <div className={"p-6"}>
                <div className="flex flex-row mb-4">
                    <h1 className={"text-3xl font-bold"}>{name}</h1>
                    <div className={"ml-5"}>
                        <button onClick={() => setShowOverview(true)}
                                className={`transition-all duration-500 px-4 py-2 border-b-2 ${showOverview ? 'border-blue-500' : 'border-gray-500'}`}>Overview
                        </button>
                        <button onClick={() => setShowOverview(false)}
                                className={`transition-all duration-500 px-4 py-2 border-b-2 ${showOverview ? 'border-gray-500' : 'border-blue-500'}`}>Settings
                        </button>
                    </div>
                    {containerId && (
                        <div className={"ml-5"}>
                            <Link href={`/dashboard/containers/${resourceInfo.container.container_id}`}>
                                <Button auto color={"success"}>View Container</Button>
                            </Link>
                        </div>
                    )}
                    <div className={"ml-5"}>
                        <Button auto color={"warning"} onClick={deploy}>Deploy</Button>
                    </div>
                </div>
                {showOverview ? (
                    <div>
                        <h1 className={"text-2xl font-bold"}>Overview</h1>
                        <p>{resourceInfo.git_url}</p>
                        <p>{resourceInfo.type}</p>
                        <p>{resourceInfo.container.running ? "Running" : "Stopped"}</p>
                    </div>
                ) : (
                    <div>
                        <form className={"flex flex-col gap-y-4"} onSubmit={saveSettings}>
                            <p className={"text-2xl font-bold"}>Settings</p>
                            <Input label={"Name"} value={resourceInfo.name} disabled/>
                            <Input label={"Git URL"} value={resourceInfo.git_url} disabled/>
                            <h2 className={"text-xl"}>Editable (Seperate with commas)</h2>
                            <Input label={"Environment Variables"} value={envVariables}
                            onChange={(e) => setEnvVariables(e.target.value)}
                            />
                            <Input label={"Network"} value={network}
                            onChange={(e) => setNetwork(e.target.value)}
                            />
                            <Input label={"Ports"} value={ports}
                            onChange={(e) => setPorts(e.target.value)}
                            />
                            <Input label={"Volumes"} value={volumes}
                            onChange={(e) => setVolumes(e.target.value)}
                            />
                            <Button auto type={"submit"}>Save</Button>
                        </form>
                    </div>
                )}
            </div>
        </>
    )
}