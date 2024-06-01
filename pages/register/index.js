"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Register() {
    const [registrationEnabled, setRegistrationEnabled] = useState(true);
    const [isSetup, setIsSetup] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    async function register() {
        if (password !== passwordConfirm) {
            return setError("Passwords do not match.");
        }
        const res = await fetch("/api/register", {
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
        async function getTheData() {
            if(localStorage.getItem("token")) {
                router.push("/dashboard");
            }
            const apiStatus = await fetch("/api/status");
            const apiStatusData = await apiStatus.json();
            if (apiStatusData.registration === false) {
                setRegistrationEnabled(false);
            }
            if (apiStatusData.setup === true) {
                setIsSetup(true);
            }
        }
        getTheData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {registrationEnabled ? (
                <div className="flex flex-col items-center justify-center min-h-screen py-2">
                    <h1 className="text-4xl mb-5 font-bold">Welcome to Vessyl.</h1>
                    {!isSetup && (
                        <p className="text-sm mb-5 text-red-500">
                            You are creating the admin account. Please keep this information.
                        </p>
                    )}
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="p-3 mt-3 w-96 border border-gray-300 rounded-md"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 mt-3 w-96 border border-gray-300 rounded-md"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        className="p-3 mt-3 w-96 border border-gray-300 rounded-md"
                    />
                    <button
                        className="p-3 mt-3 w-96 bg-blue-500 text-white rounded-md"
                        onClick={register}
                    >
                        Register
                    </button>
                    {error && <p className="text-red-500 mt-3">{error}</p>}
                </div>
            ) : (
                <h1 className="text-6xl font-bold">Registration is disabled.</h1>
            )}
        </div>
    );
}