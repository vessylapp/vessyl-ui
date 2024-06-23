"use client";

import {useEffect, useState} from "react";
import Sidebar from "@/components/sb/Sidebar";
import {useRouter} from "next/navigation";
import {isLoggedIn} from "@/funcs/client/isLoggedIn";

export default function Container() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [showLogs, setShowLogs] = useState(true);

    useEffect(() => {
        setName(window.location.pathname.split("/").pop());
        async function fetchData() {
            const areWeLoggedIn = await isLoggedIn();
            if (!areWeLoggedIn) {
                return router.push("/auth/login");
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <Sidebar/>
            <div className={"p-6"}>
                <div className="flex flex-row mb-4">
                    <h1 className={"text-3xl font-bold"}>{name}</h1>
                    <div className={"ml-5"}>
                        <button onClick={() => setShowLogs(true)}
                                className={`transition-all duration-500 px-4 py-2 border-b-2 ${showLogs ? 'border-blue-500' : 'border-gray-500'}`}>Logs
                        </button>
                        <button onClick={() => setShowLogs(false)}
                                className={`transition-all duration-500 px-4 py-2 border-b-2 ${showLogs ? 'border-gray-500' : 'border-blue-500'}`}>Overview
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}