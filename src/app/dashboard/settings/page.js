"use client";

import Sidebar from "@/components/sb/Sidebar";
import {Button, Input} from "@nextui-org/react";
import {useState, useEffect} from "react";
import {userInfo as getUserInfo, storeGitHubPAT} from "@/funcs/client/auth";
import {useRouter} from "next/navigation";
import {getVessylAccessUrl, saveVessylAccessUrl, restartProxy} from "@/funcs/client/admin";

export default function Settings() {
    const [pat, setPat] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const [gitHubConnected, setGitHubConnected] = useState(false);
    const [gitHubPatError, setGitHubPatError] = useState(null);
    const [vessylProxyUrl, setVessylProxyUrl] = useState("");

    const router = useRouter();

    async function generateLink() {
        const link = "https://github.com/settings/tokens/new?scopes=repo,repo:status,repo_deployment,public_repo,repo:invite,security_events,read:packages,read:org,read:public_key,user,read:user,user:email,read:project,read:gpg_key,read:ssh_key"
        window.open(link, "_blank");
    }

    async function restartProxyBtn(e) {
        e.preventDefault();
        const data = await restartProxy();
        if(data.error) {
            console.log(data.error);
            return;
        }
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    async function saveProxyUrl(e) {
        e.preventDefault();
        let checkIfValid;
        try {
            new URL(vessylProxyUrl);
            checkIfValid = true;
        }
        catch (e) {
            checkIfValid = false;
        }
        if (!checkIfValid) {
            return;
        }
        console.log(vessylProxyUrl);
        const data = await saveVessylAccessUrl(vessylProxyUrl);
        if(data.error) {
            console.log(data.error);
            return;
        }
        window.location.reload();
    }

    async function connectBtnPressed() {
        const data = await storeGitHubPAT(pat);
        console.log(data);
        if (data.error) {
            setGitHubPatError(data.error);
            return;
        }
        return window.location.reload();
    }

    useEffect(() => {
        async function fetchData() {
            const data = await getUserInfo();
            console.log(data);
            setUserInfo(data);
            setGitHubConnected(data.github);
            if(data.admin) {
                const proxyUrl = await getVessylAccessUrl();
                console.log(proxyUrl);
                if(proxyUrl.error) {
                    return;
                }
                setVessylProxyUrl(proxyUrl.proxyUrl);
            }
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
                        {userInfo.admin === true && (
                            <div className={"mt-5"}>
                                <h2 className={"text-xl font-bold"}>Admin Settings</h2>
                                <form className={"mt-3"} onSubmit={saveProxyUrl}>
                                    <p className={"text-lg"}>Vessyl Proxy URL</p>
                                    <Input label={"(http(s)://domain.com)"} value={vessylProxyUrl}
                                     onChange={(e) => setVessylProxyUrl(e.target.value)}
                                     className={"mt-3"}
                                    />
                                    <Button auto color={"success"} className={"mt-3"} type={"submit"}>Save</Button>
                                </form>
                                <form className={"mt-3"} onSubmit={restartProxyBtn}>
                                    <p className={"text-lg"}>Restart Proxy</p>
                                    <Button auto color={"danger"} className={"mt-3"} type={"submit"}>Restart
                                        Proxy</Button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}