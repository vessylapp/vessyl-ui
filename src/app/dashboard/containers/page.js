"use client";

import Sidebar from "@/components/sb/Sidebar";
import {getContainers} from "@/funcs/client/containers";
import {useEffect, useState} from "react";

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
                <div className={"grid grid-cols-3 gap-4"}>
                    {containers.map((container, index) => {
                        return (
                            <div key={index}>
                                <h2 className={"text-xl font-bold"}>{container.name}</h2>
                                <p>{container.image}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}