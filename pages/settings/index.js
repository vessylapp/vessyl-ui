"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Settings() {
    const [isLogged, setIsLogged] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [pat, setPat] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token !== null && token !== undefined) {
            setIsLogged(true);
        } else {
            return router.push("/login");
        }

        async function getUserInfo() {
            const res = await fetch("/api/userinfo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                }),
            });
            const data = await res.json();
            if (data.error) {
                return router.push("/login");
            }
            setUserInfo(data);
            setLoading(false);
        }
        getUserInfo();

        return () => {
            setIsLogged(false);
            setUserInfo({});
        }
    }, []);

    async function connectBtnPressed() {
        setLoading(true);
        const res = await fetch("/api/github/storecreds", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: localStorage.getItem("token"),
                pat,
            }),
        });
        const data = await res.json();
        if (data.error) {
            setError(data.error);
            setLoading(false);
            return;
        }
        window.location.reload();
    }

    async function generateLink() {
        const link = "https://github.com/settings/tokens/new?scopes=repo,repo:status,repo_deployment,public_repo,repo:invite,security_events,read:packages,read:org,read:public_key,user,read:user,user:email,read:project,read:gpg_key,read:ssh_key"

        window.open(link, "_blank");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl mb-5 font-bold">Settings</h1>
            <div className="flex flex-col min-h-screen py-2">
                {loading ? (
                    <p className={"font-bold text-3xl"}>Loading..</p>
                ) : (
                    <>
                        <h1 className={"text-2xl"}>GitHub</h1>
                        {error && <p className={"text-red-500"}>{error}</p>}
                        {userInfo.github ? (
                            <div>
                                <h2 className={"text-2xl"}>Connected as:</h2>
                                <div className={"p-4 border-2 border-yellow-400 rounded-xl"}>
                                    <p>@{userInfo.githubJson.username}</p>
                                    <p>{userInfo.githubJson.email}</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p className={"text-sm"}>Connect your GitHub account to Vessyl.</p>
                                <input type="text" placeholder="Personal Access Token" value={pat}
                                       onChange={(e) => setPat(e.target.value)}
                                       className={"w-full border-2 px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300"}/>
                                <button onClick={connectBtnPressed} className="mt-3">Connect</button>
                                <button onClick={generateLink} className="mt-3">Generate PAT</button>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}