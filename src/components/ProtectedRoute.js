"use client";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function ProtectedRoute({children}) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token === null || token === undefined) {
            return router.push("/auth/login");
        }
    }, []);
    return children;
}