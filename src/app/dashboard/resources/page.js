"use client";

import Sidebar from "@/components/sb/Sidebar";
import {getResources} from "@/funcs/client/resources";
import {useEffect, useState} from "react";

export default function Resources() {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getResources();
            setResources(data);
            console.log(data);
        }
        fetchData();
    }, []);

    return (
        <>
            <Sidebar/>
            <div className={"p-6"}>
                <h1 className={"text-3xl font-bold"}>Resources</h1>
                <div className={"grid grid-cols-3 gap-4"}>
                    {resources.map((resource, index) => {
                        return (
                            <div key={index}>
                                <h2 className={"text-xl font-bold"}>{resource.name}</h2>
                                <p>{resource.git_url} - {resource.type}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}