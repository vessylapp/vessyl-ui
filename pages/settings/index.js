"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Settings() {
    const [isLogged, setIsLogged] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token !== null && token !== undefined) {
            setIsLogged(true);
        } else {
            router.push("/login");
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl mb-5 font-bold">Settings</h1>
            <div className="flex flex-col min-h-screen py-2">

            </div>
        </div>
    );
}