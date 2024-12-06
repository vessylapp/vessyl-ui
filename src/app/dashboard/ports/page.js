"use client";

import Sidebar from "@/components/sb/Sidebar";
import {getPorts} from "@/funcs/client/resources";
import {useEffect, useState} from "react";
import ResourceCardSkeleton from "@/components/skeletons/ResourceCardSkeleton";
import ResourceCard from "@/components/ResourceCard";
import {Skeleton, Button} from "@nextui-org/react";
import Link from "next/link";

export default function Resources() {
    const [ports, setPorts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const data = await getPorts();
            setPorts(data.ports);
            console.log(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <>
            <Sidebar/>
            <div className={"p-6"}>
                <div className={"flex"}>
                    <h1 className={"text-3xl font-bold"}>Ports in use</h1>
                </div>
                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 overflow-y-auto max-h-[82vh]"}>
                    {loading ? (
                        <>
                            <Skeleton>
                                <ResourceCardSkeleton/>
                            </Skeleton>
                        </>
                    ) : (
                        ports.map((port, index) => (
                            <p key={index}>{port}</p>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}