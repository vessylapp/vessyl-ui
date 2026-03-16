"use client";

import React, {useEffect} from "react";
import {status} from "@/funcs/client/status";
import {login} from "@/funcs/client/auth";
import {useRouter} from "next/navigation";
import {isLoggedIn} from "@/funcs/client/isLoggedIn";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export default function Login() {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [error, setError] = React.useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const areWeLoggedIn = await isLoggedIn();
            if(areWeLoggedIn) {
                return router.push("/dashboard");
            }
            const data = await status();
            if (data.setup === false) {
                router.push("/auth/register");
            }
        }
        fetchData();
    }, []);

    async function handleLogin(e) {
        e.preventDefault();
        const form = e.target;
        const body = {
            username: form.username.value,
            password: form.password.value,
        };
        const data = await login(body);
        if(data.token === undefined || data.token === null) {
            setError(data.error);
        } else {
            localStorage.setItem("token", data.token);
            return router.push("/dashboard");
        }
    }

    return (
        <div className="auth-shell">
            <div className="auth-card">
                <PageHeader title="Log in" note="Use your Vessyl account to manage resources and containers." />
                {error ? <div className="notice notice-danger">{error}</div> : null}
                <form className="stack-md" onSubmit={handleLogin}>
                    <label className="field">
                        <span className="field-label">Username</span>
                        <input className="input" name="username" type="text" autoComplete="username" />
                    </label>
                    <label className="field">
                        <span className="field-label">Password</span>
                        <input
                            className="input"
                            name="password"
                            type={passwordVisible ? "text" : "password"}
                            autoComplete="current-password"
                        />
                    </label>
                    <label className="field-note">
                        <input
                            type="checkbox"
                            checked={passwordVisible}
                            onChange={() => setPasswordVisible((current) => !current)}
                        />{" "}
                        Show password
                    </label>
                    <button className="button button-primary" type="submit">
                        Log in
                    </button>
                </form>
                <p className="auth-footer">
                    Need an account? <Link href="/auth/register" className="auth-link">Register</Link>
                </p>
            </div>
        </div>
    );
}
