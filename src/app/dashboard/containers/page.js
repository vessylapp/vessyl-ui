"use client";

import Sidebar from "@/components/sb/Sidebar";
import {getContainers} from "@/funcs/client/containers";
import {useEffect, useState} from "react";
import ContainerCard from "@/components/ContainerCard";

export default function Containers() {
    const [containers, setContainers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getContainers();
            setContainers(data);
            console.log(data);
        }
        fetchData();
    }, []);

    return (
        <>
            <Sidebar/>
            <div className={"p-6"}>
                <h1 className={"text-3xl font-bold"}>Containers</h1>
                <div className={"grid grid-cols-4 gap-4 mt-5 overflow-y-auto max-h-[82vh]"}>
                    {containers.map((container, index) => (
                        <ContainerCard key={index} container={container}/>
                    ))}
                </div>
            </div>
        </>
    )
}