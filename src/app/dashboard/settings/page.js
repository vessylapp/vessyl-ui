"use client";

import {useState, useEffect} from "react";
import {changePassword, userInfo as getUserInfo, storeGitHubPAT} from "@/funcs/client/auth";
import {getVessylAccessUrl, saveVessylAccessUrl, restartProxy} from "@/funcs/client/admin";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";

export default function Settings() {
    const [pat, setPat] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const [gitHubConnected, setGitHubConnected] = useState(false);
    const [gitHubPatError, setGitHubPatError] = useState(null);
    const [vessylProxyUrl, setVessylProxyUrl] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(null);
    const [passwordSuccess, setPasswordSuccess] = useState("");
    const [changingPassword, setChangingPassword] = useState(false);

    async function generateLink() {
        const link = "https://github.com/settings/tokens/new?scopes=repo,repo:status,repo_deployment,public_repo,repo:invite,security_events,read:packages,read:org,read:public_key,user,read:user,user:email,read:project,read:gpg_key,read:ssh_key"
        window.open(link, "_blank");
    }

    async function restartProxyBtn(e) {
        e.preventDefault();
        const data = await restartProxy();
        if(data.error) {
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
        const data = await saveVessylAccessUrl(vessylProxyUrl);
        if(data.error) {
            return;
        }
        window.location.reload();
    }

    async function connectBtnPressed() {
        const data = await storeGitHubPAT(pat);
        if (data.error) {
            setGitHubPatError(data.error);
            return;
        }
        return window.location.reload();
    }

    async function changePasswordPressed(event) {
        event.preventDefault();
        setPasswordError(null);
        setPasswordSuccess("");

        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordError("All password fields are required.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError("New passwords do not match.");
            return;
        }

        setChangingPassword(true);
        const data = await changePassword(currentPassword, newPassword);
        setChangingPassword(false);

        if (data.error) {
            setPasswordError(data.error);
            return;
        }

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordSuccess("Password updated.");
    }

    useEffect(() => {
        async function fetchData() {
            const data = await getUserInfo();
            setUserInfo(data);
            setGitHubConnected(data.github);
            if(data.admin) {
                const proxyUrl = await getVessylAccessUrl();
                if(proxyUrl.error) {
                    return;
                }
                setVessylProxyUrl(proxyUrl.proxyUrl);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="page-stack">
            <PageHeader title="Settings" note="Manage your GitHub access and instance-wide admin settings." />

            <section className="panel panel-section">
                <div className="stack-sm">
                    <h2 className="text-xl font-semibold">Password</h2>
                    <form className="stack-md" onSubmit={changePasswordPressed}>
                        {passwordError ? <div className="notice notice-danger">{passwordError}</div> : null}
                        {passwordSuccess ? <div className="notice">{passwordSuccess}</div> : null}
                        <label className="field">
                            <span className="field-label">Current password</span>
                            <input
                                className="input"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                        </label>
                        <label className="field">
                            <span className="field-label">New password</span>
                            <input
                                className="input"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                autoComplete="new-password"
                            />
                        </label>
                        <label className="field">
                            <span className="field-label">Confirm new password</span>
                            <input
                                className="input"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete="new-password"
                            />
                        </label>
                        <div className="page-actions">
                            <button className="button button-primary" disabled={changingPassword} type="submit">
                                {changingPassword ? "Saving…" : "Change password"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <section className="panel panel-section">
                <div className="stack-sm">
                    <h2 className="text-xl font-semibold">GitHub access</h2>
                    {gitHubConnected ? (
                        <div className="meta-list">
                            <span className="meta-label">Status</span>
                            <span><StatusBadge tone="success">Connected</StatusBadge></span>
                            <span className="meta-label">Username</span>
                            <span>@{userInfo.githubJson?.username}</span>
                            <span className="meta-label">Email</span>
                            <span>{userInfo.githubJson?.email}</span>
                        </div>
                    ) : (
                        <form className="stack-md" onSubmit={(event) => {
                            event.preventDefault();
                            connectBtnPressed();
                        }}>
                            {gitHubPatError ? <div className="notice notice-danger">{gitHubPatError}</div> : null}
                            <label className="field">
                                <span className="field-label">Personal access token</span>
                                <input
                                    className="input"
                                    placeholder="github_pat_..."
                                    type="password"
                                    value={pat}
                                    onChange={(e) => setPat(e.target.value)}
                                />
                            </label>
                            <div className="page-actions">
                                <button className="button button-primary" type="submit">Connect</button>
                                <button className="button" type="button" onClick={generateLink}>Generate token</button>
                            </div>
                        </form>
                    )}
                </div>
            </section>

            {userInfo.admin === true ? (
                <section className="panel panel-section">
                    <div className="stack-sm">
                        <h2 className="text-xl font-semibold">Admin</h2>
                        <form className="stack-md" onSubmit={saveProxyUrl}>
                            <label className="field">
                                <span className="field-label">Proxy URL</span>
                                <input
                                    className="input"
                                    placeholder="https://example.com"
                                    value={vessylProxyUrl}
                                    onChange={(e) => setVessylProxyUrl(e.target.value)}
                                />
                            </label>
                            <div className="page-actions">
                                <button className="button button-primary" type="submit">Save proxy URL</button>
                            </div>
                        </form>

                        <form className="stack-md" onSubmit={restartProxyBtn}>
                            <div className="field">
                                <span className="field-label">Proxy restart</span>
                                <span className="field-note">Restart the proxy after DNS or config changes.</span>
                            </div>
                            <div className="page-actions">
                                <button className="button button-danger" type="submit">Restart proxy</button>
                            </div>
                        </form>
                    </div>
                </section>
            ) : null}
        </div>
    )
}
