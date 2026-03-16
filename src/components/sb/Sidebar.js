"use client";

import React, {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {checkForUpdates} from "@/funcs/client/status";
import Link from "next/link";
import {userInfo} from "@/funcs/client/auth";
import {items} from "./sidebar-items";

export default function Sidebar() {
    const [update, setUpdate] = useState(false);
    const [uiVersion, setUiVersion] = useState("");
    const [workerVersion, setWorkerVersion] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        async function fetchData() {
            const [data, account] = await Promise.all([
                checkForUpdates(),
                userInfo(),
            ]);

            if (account?.error) {
                router.push("/auth/login");
                return;
            }

            setUpdate(data.update);
            setUiVersion(data.uiVersion);
            setWorkerVersion(data.workerVersion);
            setCurrentUser(account);
        }
        fetchData();
    }, []);

    const navItems = items.filter((item) => item.href);

    function logout() {
        localStorage.removeItem("token");
        router.push("/auth/login");
    }

    return (
        <aside className="app-sidebar">
            <div className="app-brand">
                <div className="app-brand-name">Vessyl</div>
                <div className="app-brand-meta">
                    {currentUser ? currentUser.username : "Loading account"}
                </div>
            </div>

            <nav className="app-nav" aria-label="Dashboard">
                {navItems.map((item) => {
                    const active = item.href === "/dashboard"
                        ? pathname === item.href
                        : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.key}
                            href={item.href}
                            className={`app-nav-link ${active ? "app-nav-link-active" : ""}`}
                        >
                            {item.title}
                        </Link>
                    );
                })}
            </nav>

            <div className="app-sidebar-footer">
                {update ? (
                    <Link href="/dashboard/update" className="status-badge status-badge-warning">
                        Update available
                    </Link>
                ) : (
                    <div className="stack-sm">
                        <div className="status-badge">UI {uiVersion || "..."}</div>
                        <div className="status-badge">Worker {workerVersion || "..."}</div>
                    </div>
                )}
                <button type="button" className="button button-ghost" onClick={logout}>
                    Log out
                </button>
            </div>
        </aside>
    );
}
