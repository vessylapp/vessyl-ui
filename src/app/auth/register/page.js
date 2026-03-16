"use client";

import React, {useEffect} from "react";
import {status} from "@/funcs/client/status";
import {register} from "@/funcs/client/auth";
import {useRouter} from "next/navigation";
import {isLoggedIn} from "@/funcs/client/isLoggedIn";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export default function Register() {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [registrationEnabled, setRegistrationEnabled] = React.useState(false);
    const [setup, setSetup] = React.useState(true);
    const [error, setError] = React.useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const areWeLoggedIn = await isLoggedIn();
            if(areWeLoggedIn) {
                return router.push("/dashboard");
            }
            const data = await status();
            setRegistrationEnabled(data.registration);
            setSetup(data.setup);
        }
        fetchData();
    }, []);

    async function handleRegister(e) {
        e.preventDefault();
        const form = e.target;
        // check if passwords match
        if (form.password.value !== form["password-c"].value) {
            setError("Passwords do not match.");
            return;
        }
        const body = {
            username: form.username.value,
            password: form.password.value,
        };
        const data = await register(body);
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
                <PageHeader title="Register" note="Create an account for this Vessyl instance." />
                {error ? <div className="notice notice-danger">{error}</div> : null}
                {!setup ? (
                    <div className="notice">
                        You are creating the first account on this instance. It will become the admin account.
                    </div>
                ) : null}
                {!registrationEnabled ? (
                    <>
                        <div className="notice notice-danger">Registration is disabled.</div>
                        <p className="auth-footer">
                            Already have an account? <Link href="/auth/login" className="auth-link">Log in</Link>
                        </p>
                    </>
                ) : (
                    <>
                        <form className="stack-md" onSubmit={handleRegister}>
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
                                    autoComplete="new-password"
                                />
                            </label>
                            <label className="field">
                                <span className="field-label">Confirm password</span>
                                <input
                                    className="input"
                                    name="password-c"
                                    type={passwordVisible ? "text" : "password"}
                                    autoComplete="new-password"
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
                                Register
                            </button>
                        </form>
                        <p className="auth-footer">
                            Already have an account? <Link href="/auth/login" className="auth-link">Log in</Link>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
