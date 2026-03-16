"use client";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {userInfo} from "@/funcs/client/auth";

export default function ProtectedRoute({children}) {
    const router = useRouter();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem("token");
            if (token === null || token === undefined) {
                router.push("/auth/login");
                return;
            }

            const response = await userInfo();
            if (response.error) {
                localStorage.removeItem("token");
                router.push("/auth/login");
                return;
            }

            setReady(true);
        }
        fetchData();
    }, []);

    if (!ready) {
        return (
            <div className="page-shell">
                <div className="panel">Checking session…</div>
            </div>
        );
    }

    return children;
}
