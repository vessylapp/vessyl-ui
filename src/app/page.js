"use client";
import {status} from "@/funcs/client/status";
import { useRouter } from 'next/navigation'
import {isLoggedIn} from "@/funcs/client/isLoggedIn";
import {useEffect, useState} from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export default function Home() {
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
        <div className="auth-shell">
            <div className="auth-card">
                <PageHeader
                    title="Vessyl"
                    note="Docker deployments, resource settings, and container controls in one place."
                />
                <div className="stack-md">
                    {!serverSetup ? (
                        <div className="notice">
                            The instance is not set up yet. The first account created becomes the admin account.
                        </div>
                    ) : null}
                    <div className="page-actions">
                        <Link href={serverSetup ? "/auth/login" : "/auth/register"} className="button button-primary">
                            {serverSetup ? "Log in" : "Create admin account"}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
