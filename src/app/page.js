"use client";
import {status} from "@/funcs/client/status";
import { useRouter } from 'next/navigation'
import {isLoggedIn} from "@/funcs/client/isLoggedIn";
import {useEffect, useState} from "react";
import {Button} from "@nextui-org/react";
import Link from "next/link";

export default async function Home() {
    const [serverSetup, setServerSetup] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const areWeLoggedIn = await isLoggedIn();
            if(areWeLoggedIn) {
                return router.push("/dashboard");
            }
            const data = await status();
            setServerSetup(data.setup);
            if(data.setup === false) {
                return router.push("/auth/register");
            }
        }
        fetchData();
        return () => {};
    }, []);

    return (
        <div className={"flex flex-col items-center justify-center min-h-screen py-2"}>
            <h1 className={"text-6xl font-bold"}>Welcome to Vessyl</h1>
            <p className={"mt-3 text-2xl"}>Manage your Docker environment with ease.</p>
            <Link href={"/auth/login"} className={"mt-5"} legacyBehavior>
                <Button auto className={"mt-5"}>
                    Login
                </Button>
            </Link>
        </div>
    );
}