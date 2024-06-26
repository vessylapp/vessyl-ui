"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {Button, Input, Select, SelectItem} from "@nextui-org/react";
import Sidebar from "@/components/sb/Sidebar";
import {newResource} from "@/funcs/client/resources";

export default function NewResource() {
    const router = useRouter();
    const [resourceName, setResourceName] = useState("");
    const [repo, setRepo] = useState("");
    const [buildTool, setBuildTool] = useState("0");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const buildTools = ["nixpacks", "dockerfile"];

    async function createResource() {
        console.log(resourceName, repo, buildTool);
        setLoading(true);
        const data = await newResource(resourceName, repo, buildTools[buildTool]);
        console.log(data);
        if (data.error) {
            setLoading(false);
            setError(data.error);
            return;
        }
        return router.push("/dashboard/resources/" + resourceName);
    }

    return (
        <>
        <Sidebar/>
        <div className={"p-6"}>
            <h1 className={"text-3xl font-bold"}>New Resource</h1>
            <div className={"mt-5"}>
                <p className={"text-lg"}>Create a new resource to deploy an app.</p>
                {error && (
                    <p className={"text-red-500 mt-2"}>{error}</p>
                )}
            </div>
            {!loading && (
                <form className={"mt-5"} onSubmit={(e) => {
                    e.preventDefault();
                    createResource()
                }}>
                    <h2 className={"text-xl font-bold"}>Resource Name</h2>
                    <Input placeholder={"my-resource-1"} className={"mt-2"} value={resourceName} onChange={(e) => {
                        const value = e.target.value;
                        const lowerCaseValue = value.toLowerCase();
                        const noSpacesValue = lowerCaseValue.replace(/\s+/g, '-');
                        const cleanValue = noSpacesValue.replace(/[^a-z0-9-]/g, '');
                        setResourceName(cleanValue);
                    }}/>
                    <h2 className={"text-xl font-bold mt-5"}>GitHub Repository</h2>
                    <Input placeholder={"username/repository"} className={"mt-2"} value={repo} onChange={(e) => {
                        setRepo(e.target.value)
                    }}/>
                    <h2 className={"text-xl font-bold mt-5"}>Build Tool</h2>
                    <Select
                        placeholder="Select build tool"
                        className={"mt-2"}
                        selectedKeys={[buildTool]}
                        onChange={(e) => {
                            setBuildTool(e.target.value)
                        }}
                    >
                        {buildTools.map((tool, index) => (
                            <SelectItem key={index} value={tool}>{tool}</SelectItem>
                        ))}
                    </Select>
                    <Button color={"success"} className={"mt-5"} type={"submit"}>Create Resource</Button>
                </form>
            )}
            {loading && (
                <div className={"mt-5"}>
                    <p>Loading...</p>
                </div>
            )}
        </div>
        </>
    )
}