"use client";

import {useEffect, useState} from "react";
import Sidebar from "@/components/sb/Sidebar";
import {useRouter} from "next/navigation";
import {getResource} from "@/funcs/client/resources";

export default function Resource() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [showEnv, setShowEnv] = useState(true);
    const [resourceInfo, setResourceInfo] = useState({});

    useEffect(() => {
        setName(window.location.pathname.split("/").pop());
        async function getResourceInfo(name) {
            const data = await getResource(name);
            if(data.error) {
                return router.push("/dashboard/resources");
            }
            setResourceInfo(data);
            console.log(data);
        }
        getResourceInfo(window.location.pathname.split("/").pop());
    }, []);

    return (
        <>
            <Sidebar/>
            <div className={"p-6"}>
                <div className="flex flex-row mb-4">
                    <h1 className={"text-3xl font-bold"}>{name}</h1>
                    <div className={"ml-5"}>
                        <button onClick={() => setShowEnv(true)}
                                className={`transition-all duration-500 px-4 py-2 border-b-2 ${showEnv ? 'border-blue-500' : 'border-gray-500'}`}>Environment
                        </button>
                        <button onClick={() => setShowEnv(false)}
                                className={`transition-all duration-500 px-4 py-2 border-b-2 ${showEnv ? 'border-gray-500' : 'border-blue-500'}`}>Overview
                        </button>
                    </div>
                </div>
                {showEnv ? (
                    <div>
                        <p>Env</p>
                    </div>
                ) : (
                    <div>
                        <p>Overview</p>
                    </div>
                )}
            </div>
        </>
    )
}