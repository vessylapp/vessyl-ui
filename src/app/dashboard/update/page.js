"use client";

import Sidebar from "@/components/sb/Sidebar";
import {Button, Spinner} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {checkForUpdates} from "@/funcs/client/status";
import {useEffect, useState} from "react";

export default function Update() {
    const [update, setUpdate] = useState(false);
    const router = useRouter();
    const [updating, setUpdating] = useState(false);
    const [checkCount, setCheckCount] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            const data = await checkForUpdates();
            console.log(data);
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
        }, 6000);
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
            <div className={"flex flex-col justify-center items-center h-screen w-screen"}>
                <h1 className={"text-3xl font-bold"}>Vessyl is updating...</h1>
                <p className={"text-lg mt-5"}>Please wait while Vessyl updates.</p>
                <p className={"text-lg mt-5"}>This will take a few minutes, you will be redirected once the update is complete.</p>
                <p className={"text-lg mt-5"}>Check for completion: {checkCount.toString()}</p>
                <Spinner size={"large"} className={"mt-5"} color={"success"}/>
            </div>
        )
    }

    return (
        <>
            <Sidebar/>
            <div className={"p-6"}>
                <h1 className={"text-3xl font-bold"}>Vessyl Update</h1>
                {error && <p className={"text-red-500"}>{error}</p>}
                <div className={"mt-5"}>
                    <p className={"text-lg"}>Vessyl requires an update. Click the button below to update.</p>
                    <Button
                        auto
                        color={"warning"}
                        onClick={updateVessyl}
                        className={"mt-3"}
                    >
                        Update
                    </Button>
                </div>
            </div>
        </>
    )
}