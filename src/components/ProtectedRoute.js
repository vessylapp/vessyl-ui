"use client";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {userInfo} from "@/funcs/client/auth";

export default function ProtectedRoute({children}) {
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem("token");
            if (token === null || token === undefined) {
                return router.push("/auth/login");
            }

            const response = await userInfo();
            if (response.error) {
                localStorage.removeItem("token");
                return router.push("/auth/login");
            }
        }
        fetchData();
    }, []);
    return children;
}