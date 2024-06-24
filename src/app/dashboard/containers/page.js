"use client";

import Sidebar from "@/components/sb/Sidebar";
import {getContainers} from "@/funcs/client/containers";
import {useEffect, useState} from "react";
import ContainerCard from "@/components/ContainerCard";
import ContainerCardSkeleton from "@/components/skeletons/ContainerCardSkeleton";
import {Skeleton} from "@nextui-org/react";
import {useRouter} from "next/navigation";

export default function Containers() {
    const [containers, setContainers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const data = await getContainers();
            setContainers(data);
            console.log(data);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    return (
        <>
            <Sidebar/>
            <div className={"p-6"}>
                <h1 className={"text-3xl font-bold"}>Containers</h1>
                {isLoading ? (
                    <div className={"grid grid-cols-4 gap-4 mt-5 overflow-y-auto max-h-[82vh]"}>
                        <Skeleton>
                            <ContainerCardSkeleton/>
                        </Skeleton>
                        <Skeleton>
                            <ContainerCardSkeleton/>
                        </Skeleton>
                        <Skeleton>
                            <ContainerCardSkeleton/>
                        </Skeleton>
                        <Skeleton>
                            <ContainerCardSkeleton/>
                        </Skeleton>
                    </div>
                ) : (
                    <div className={"grid grid-cols-4 gap-4 mt-5 overflow-y-auto max-h-[82vh]"}>
                        {containers.map((container, index) => (
                            <ContainerCard key={index} container={container}/>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}