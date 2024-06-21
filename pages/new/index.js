"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function NewResource() {
    const [resourceName, setResourceName] = useState("");
    const [gitUrl, setGitUrl] = useState("");
    const [error, setError] = useState("");
    const [type, setType] = useState("Nixpacks");
    const router = useRouter();

    async function addResource() {
        const response = await fetch("/api/newresource", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: localStorage.getItem("token"),
                name: resourceName,
                git_url: gitUrl,
                type: type,
            }),
        });
        const data = await response.json();
        if (data.success) {
            router.push("/resource/" + resourceName);
        } else {
            setError(data.error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Add a new resource</h1>
            {error && <p className="text-red-500">{error}</p>}
            <input
                type="text"
                placeholder="Resource name"
                className="p-2 m-2 border-2 rounded-lg"
                value={resourceName}
                onChange={(e) => {
                    const value = e.target.value;
                    const lowerCaseValue = value.toLowerCase();
                    const noSpacesValue = lowerCaseValue.replace(/\s+/g, '-');
                    const cleanValue = noSpacesValue.replace(/[^a-z0-9-]/g, '');
                    setResourceName(cleanValue);
                }}
            />
            <input
                type="text"
                placeholder="user/repo"
                className="p-2 m-2 border-2 rounded-lg"
                value={gitUrl}
                onChange={(e) => setGitUrl(e.target.value)}
            />
            <select
                className="p-2 m-2 border-2 rounded-lg"
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="Nixpacks">Nixpacks</option>
                <option value="Dockerfile">Dockerfile</option>
            </select>
            <button
                className="p-2 m-2 bg-green-500 text-white rounded-lg"
                onClick={addResource}
            >
                Submit
            </button>
        </div>
    )
}