"use client";

import Sidebar from "@/components/sb/Sidebar";
import {getResources} from "@/funcs/client/resources";
import {useEffect, useState} from "react";
import ResourceCardSkeleton from "@/components/skeletons/ResourceCardSkeleton";
import ResourceCard from "@/components/ResourceCard";
import {Skeleton, Button} from "@nextui-org/react";
import Link from "next/link";

export default function Resources() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const data = await getResources();
            setResources(data);
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
                    <h1 className={"text-3xl font-bold"}>Resources</h1>
                    <div>
                        <Link href={"/dashboard/resources/new"}>
                            <Button color={"warning"} className={"ml-3"}>Add Resource</Button>
                        </Link>
                    </div>
                </div>
                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 overflow-y-auto max-h-[82vh]"}>
                {loading ? (
                    <>
                        <Skeleton>
                            <ResourceCardSkeleton/>
                        </Skeleton>
                        <Skeleton>
                            <ResourceCardSkeleton/>
                        </Skeleton>
                        <Skeleton>
                            <ResourceCardSkeleton/>
                        </Skeleton>
                        <Skeleton>
                            <ResourceCardSkeleton/>
                        </Skeleton>
                    </>
                ) : (
                    resources.map((resource, index) => (
                        <ResourceCard key={index} resource={resource}/>
                    ))
                )}
            </div>
            </div>
        </>
    )
}