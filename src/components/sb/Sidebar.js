"use client";

import React, {useEffect, useState} from "react";
import {Button, Card, CardBody, CardFooter, Chip, ScrollShadow, Spacer} from "@nextui-org/react";

import {items} from "./sidebar-items";

import Sidebarf from "./sidebarf";
import {useRouter} from "next/navigation";
import {isLoggedIn} from "@/funcs/client/isLoggedIn";
import {checkForUpdates} from "@/funcs/client/status";

export default function Sidebar() {
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
        <div className="h-dvh">
            <div className="h-full w-72 border-r-small border-divider p-6">
                <div className="flex items-center gap-2 px-2">
                    <span className="text-3xl font-bold">Vessyl</span>
                    {update ? (
                        <Chip
                            color="warning"
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
                <ScrollShadow className="-mr-6 h-full max-h-full py-[2vh] pr-6">
                    <Sidebarf defaultSelectedKey="home" items={items} />
                </ScrollShadow>
            </div>
        </div>
    );
}