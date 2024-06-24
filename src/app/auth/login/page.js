"use client";

import React, {useEffect} from "react";
import {Button, Input, Checkbox, Link, Divider} from "@nextui-org/react";
import {Icon} from "@iconify/react";
import {status} from "@/funcs/client/status";
import {login} from "@/funcs/client/auth";
import {useRouter} from "next/navigation";
import {isLoggedIn} from "@/funcs/client/isLoggedIn";

export default function Login() {
    const [isVisible, setIsVisible] = React.useState(false);
    const [serverSettings, setServerSettings] = React.useState(null);
    const [registrationEnabled, setRegistrationEnabled] = React.useState(false);
    const [error, setError] = React.useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const areWeLoggedIn = await isLoggedIn();
            if(areWeLoggedIn) {
                return router.push("/dashboard");
            }
            const data = await status();
            setServerSettings(data);
            setRegistrationEnabled(data.registration);
        }
        fetchData();
    }, []);

    const toggleVisibility = () => setIsVisible(!isVisible);

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
        <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-2 sm:p-4 lg:p-8">
            <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-large">
                <p className="pb-2 text-xl font-medium">Log In</p>
                {error && <p className="text-red-500">{error}</p>}
                <form className="flex flex-col gap-3" onSubmit={handleLogin}>
                    <Input
                        label="Username"
                        name="username"
                        placeholder="Enter your username"
                        type="text"
                        variant="bordered"
                    />

                    <Input
                        endContent={
                            <button type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <Icon
                                        className="pointer-events-none text-2xl text-default-400"
                                        icon="solar:eye-closed-linear"
                                    />
                                ) : (
                                    <Icon
                                        className="pointer-events-none text-2xl text-default-400"
                                        icon="solar:eye-bold"
                                    />
                                )}
                            </button>
                        }
                        label="Password"
                        name="password"
                        placeholder="Enter your password"
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                    />
                    <Button color="primary" type="submit">
                        Log In
                    </Button>
                </form>
                <p className="text-center text-small">
                    Don't have an account?&nbsp;
                    <Link href="/auth/register" size="sm">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}