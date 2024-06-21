"use client";
import Link from 'next/link'
import {useState, useEffect, useRef} from "react";
import { useRouter } from 'next/router';
import React from 'react';

export default function Resource() {
    const [isLogged, setIsLogged] = useState(false)
    const [resource, setResource] = useState({});
    const [envVariables, setEnvVariables] = useState("");
    const [network, setNetwork] = useState("");
    const [ports, setPorts] = useState("");
    const [volumes, setVolumes] = useState("");
    const [deploying, setDeploying] = useState(false);
    const [deployStream, setDeployStream] = useState("");
    const preRef = useRef(null);
    const router = useRouter();

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
        const res = await fetch("/api/deployresource", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
                name: resource.name,
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

        router.push("/container/" + resource.name);
        setDeploying(false);
    }    

    async function saveSettings(){
        // e.preventDefault();
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
        const res = await fetch("/api/resourcesettings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
                name: resource.name,
                ...bodyToGive,
            }),
        });
        const data = await res.json();
        console.log(data);
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token !== null && token !== undefined) {
            setIsLogged(true)
        } else {
            router.push("/login")
            return;
        }
        async function getResource() {
            const res = await fetch("/api/resourceinfo", {
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
            console.log(data);
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
            setResource(data);
        }
        getResource();
    }, [])

    return (
        <>
        {resource.name && !deploying && (
            <div className="flex flex-col items-start justify-center min-h-screen py-2 w-1/2 mx-auto">
                <div className="w-full flex justify-between items-center mb-5">
                    <div>
                        <h1 className="text-4xl font-bold">{resource.name}</h1>
                        <p>{resource.git_url}</p>
                    </div>
                    <button className="p-2 bg-blue-500 text-white rounded" onClick={deploy}>Deploy</button>
                </div>
                <form className="w-full" onSubmit={saveSettings}>
                    <label className="block">
                        Env Variables:
                        <input type="text" className="border-2 rounded p-2 w-full" onChange={(e) => setEnvVariables(e.target.value)} value={envVariables}/>
                    </label>
                    <label className="block">
                        Network:
                        <input type="text" className="border-2 rounded p-2 w-full" onChange={(e) => setNetwork(e.target.value)} value={network}/>
                    </label>
                    <label className="block">
                        Ports:
                        <input type="text" className="border-2 rounded p-2 w-full" onChange={(e) => setPorts(e.target.value)} value={ports}/>
                    </label>
                    <label className="block">
                        Volumes:
                        <input type="text" className="border-2 rounded p-2 w-full" onChange={(e) => setVolumes(e.target.value)} value={volumes}/>
                    </label>
                </form>
            </div>
        )}
        {deploying && (
            <div className="flex flex-col items-center min-h-screen py-2">
                <h1 className="text-4xl font-bold mb-3">Deploying {resource.name}</h1>
                <pre className="text-left bg-gray-100 p-4 rounded w-full h-96 max-w-3xl overflow-auto" ref={preRef}>
                    {deployStream.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </pre>
            </div>
        )}
        </>
    )
}