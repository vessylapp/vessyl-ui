"use client";

import React, {useEffect, useState} from "react";
import {Button, Card, CardBody, CardFooter, Chip, ScrollShadow, Spacer} from "@nextui-org/react";

import {items} from "./sidebar-items";

import Sidebarf from "./sidebarf";
import {useRouter} from "next/navigation";
import {isLoggedIn} from "@/funcs/client/isLoggedIn";
import {checkForUpdates} from "@/funcs/client/status";
import Link from "next/link";

export default function Sidebar() {
    const [update, setUpdate] = useState(false);
    const [uiVersion, setUiVersion] = useState("");
    const [workerVersion, setWorkerVersion] = useState("");
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
            setUiVersion(data.uiVersion);
            setWorkerVersion(data.workerVersion);
        }
        fetchData();
    }, []);

    return (
        <div className="h-dvh">
            <div className="h-full w-72 border-r-small border-divider p-6">
                <div className="flex items-center gap-2 px-2">
                    <span className="text-3xl font-bold">Vessyl</span>
                    {update ? (
                        <Link href={"/dashboard/update"}>
                            <Chip
                                color="warning"
                                className={"ml-5"}
                                variant="solid">
                                Update
                            </Chip>
                        </Link>
                    ) : (
                        <div className="flex flex-col ml-3">
                            <Chip
                                variant="faded"
                                color="success"
                            >
                                UI: {uiVersion}
                            </Chip>
                            <Chip
                                variant="faded"
                                color="success"
                                className={"mt-1"}
                            >
                                Worker: {workerVersion}
                            </Chip>
                        </div>
                    )}
                </div>
                <ScrollShadow className="-mr-6 h-full max-h-full py-[2vh] pr-6">
                    <Sidebarf defaultSelectedKey="home" items={items}/>
                </ScrollShadow>
            </div>
        </div>
    );
}