"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Login() {
    const [isLogged, setIsLogged] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    async function login() {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });
        const data = await res.json();
        if (data.error) {
            return setError(data.error);
        }
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token !== null && token !== undefined) {
            setIsLogged(true);
            router.push("/dashboard");
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl mb-5 font-bold">Welcome to Vessyl.</h1>
            <input
                type="text"
                placeholder="Username"
                className="border p-2 rounded-md mb-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="border p-2 rounded-md mb-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white p-2 rounded-md"
                onClick={login}
            >
                Login
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}