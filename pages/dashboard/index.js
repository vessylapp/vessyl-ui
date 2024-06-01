"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Container from '@/components/Container';
import Link from 'next/link';
import Resource from '@/components/Resource';

export default function Dashboard() {
    const [isLogged, setIsLogged] = useState(false);
    const [containers, setContainers] = useState([]);
    const [resources, setResources] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setIsLogged(true);
        } else {
            router.push("/login")
        }
        async function getData() {
            const cres = await fetch("/api/containers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                }),
            });
            const cdata = await cres.json();
            setContainers(cdata);

            const dres = await fetch("/api/resources", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                }),
            });
            const ddata = await dres.json();
            setResources(ddata);
        }
        getData();
    }, [])

    return (
        <div className="w-3/4 mx-auto">
            <div className='flex justify-between items-center'>
                <h1 className="text-2xl font-bold">Resources</h1>
                <Link href="/new" className="p-2 bg-yellow-500 text-white rounded-xl text-sm">New</Link>
            </div>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {resources.map((resource) => (
                    <Resource key={resource.id} resource={resource} />
                ))}
            </div>
            <div className="mt-5 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Containers</h1>
            </div>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {containers.map((container) => (
                    <Container key={container.id} container={container} />
                ))}
            </div>
        </div>
    )
}