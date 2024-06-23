"use client";

import {useEffect, useState} from "react";
import Sidebar from "@/components/sb/Sidebar";
import {useRouter} from "next/navigation";
import {isLoggedIn} from "@/funcs/client/isLoggedIn";

export default function Container() {
    const router = useRouter();
    const [name, setName] = useState("");

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
                <h1 className={"text-3xl font-bold"}>{name}</h1>
            </div>
        </>
    )
}