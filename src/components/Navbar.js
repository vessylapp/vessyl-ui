"use client";
import Link from 'next/link'
import { Chip, Button} from "@nextui-org/react";
import {checkForUpdates} from "@/funcs/client/status"
import {isLoggedIn} from "@/funcs/client/isLoggedIn";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function Navbar() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [update, setUpdate] = useState(false);
    const [version, setVersion] = useState("0.0.0");
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const areWeLoggedIn = await isLoggedIn();
            if (!areWeLoggedIn) {
                return router.push("/auth/login");
            }
            const data = await checkForUpdates();
            console.log(data);
            setUpdate(data.update);
            setVersion(data.version);
        }
        fetchData();
    }, []);

    return (
        <nav className="w-full flex items-center justify-between p-6 z-50">
            <div className="text-2xl">
                <Link href="/" className="hover:text-yellow-500 transition-all duration-300">
                    Vessyl
                </Link>
                {update ? (
                    <Chip
                        color="warning"
                        className={"ml-5"}
                        variant="solid">
                        Update Available
                    </Chip>
                ) : (
                    <Chip
                        variant="faded"
                        className={"ml-5"}
                        color="success"
                    >
                        {version}
                    </Chip>
                )}
            </div>
            <div className="flex space-x-4">
                {loggedIn ? (
                    <Link href="/dashboard">
                        <Button size="small" auto>
                            Settings
                        </Button>
                    </Link>
                ) : (
                    <Link href="/login">
                        <Button size="small" auto>
                            Login
                        </Button>
                    </Link>
                )}
            </div>
        </nav>
    )
}