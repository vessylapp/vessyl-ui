"use client";

import Sidebar from "@/components/sb/Sidebar";
import {Button, Input} from "@nextui-org/react";
import {useState, useEffect} from "react";
import {userInfo as getUserInfo, storeGitHubPAT} from "@/funcs/client/auth";
import {useRouter} from "next/navigation";

export default function Settings() {
    const [pat, setPat] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const [gitHubConnected, setGitHubConnected] = useState(false);
    const [gitHubPatError, setGitHubPatError] = useState(null);

    const router = useRouter();

    async function generateLink() {
        const link = "https://github.com/settings/tokens/new?scopes=repo,repo:status,repo_deployment,public_repo,repo:invite,security_events,read:packages,read:org,read:public_key,user,read:user,user:email,read:project,read:gpg_key,read:ssh_key"
        window.open(link, "_blank");
    }

    async function connectBtnPressed() {
        const data = await storeGitHubPAT(pat);
        console.log(data);
        if (data.error) {
            setGitHubPatError(data.error);
            return;
        }
        return router.push("/settings");
    }

    useEffect(() => {
        async function fetchData() {
            const data = await getUserInfo();
            console.log(data);
            setUserInfo(data);
            setGitHubConnected(data.github);
        }
        fetchData();
    }, []);

    return (
        <>
            <Sidebar/>
            <div className={"p-6"}>
                <h1 className={"text-3xl font-bold"}>Settings</h1>
                <div className={"mt-5"}>
                    <h2 className={"text-xl font-bold"}>GitHub Settings</h2>
                    <div className={"mt-3"}>
                        {!gitHubConnected && (
                            <>
                                <p className={"text-lg"}>To use the GitHub API, you need to create a personal access
                                    token.</p>
                                {gitHubPatError && (
                                    <p className={"text-red-500"}>{gitHubPatError}</p>
                                )}
                                <form className={"mt-3"}>
                                    <Input
                                        placeholder={"Personal Access Token"}
                                        type={"password"}
                                        className={"mt-3"}
                                        value={pat}
                                        onChange={(e) => setPat(e.target.value)}
                                    />
                                    <Button auto
                                            color={"success"}
                                            className={"mt-3"}
                                            onClick={connectBtnPressed}>
                                        Connect
                                    </Button>
                                    <Button auto
                                            onClick={generateLink}
                                            className={"ml-3"}>
                                        Generate Token
                                    </Button>
                                </form>
                            </>
                        )}
                        {gitHubConnected && (
                            <div className={"p-4 border-2 border-success rounded-xl"}>
                                <p className={"text-lg"}>Connected as:</p>
                                <div className={"mt-3"}>
                                    <p>@{userInfo.githubJson.username}</p>
                                    <p>{userInfo.githubJson.email}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}