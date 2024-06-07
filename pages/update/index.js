"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Update() {
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState("");

    async function update() {
        setUpdating(true);
        const response = await fetch("/api/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: localStorage.getItem("token"),
            }),
        });
        const data = await response.json();
        if(data.error) {
            setError(data.error);
            setUpdating(false);
            return;
        }
        // the page will stop responding in about 10 seconds
        // wait 10 seconds, then check every 5 seconds if the update is done
        setTimeout(() => {
            let interval = setInterval(async () => {
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
            }, 5000);
        }, 10000);
    }

    return (
        <>
        {updating ? (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold">Updating Vessyl Worker & UI</h1>
                <p className="text-2xl mt-2">This may take a few minutes. Please wait...</p>
                <p className="text-2xl mt-2">You will be redirected once the update has finished.</p>
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold">Update Vessyl</h1>
                {error && <p className="text-red-500">{error}</p>}
                <p className="text-2xl">An update is available for Vessyl. Please update to the latest version.</p>
                <button className="p-2 bg-yellow-500 text-white rounded-lg text-lg font-bold mt-5" onClick={update}>Update Now</button>
            </div>
        )
        }
        </>
    )
}