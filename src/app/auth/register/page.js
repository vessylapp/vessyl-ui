"use client";

import React, {useEffect} from "react";
import {Button, Input, Checkbox, Link, Divider} from "@nextui-org/react";
import {Icon} from "@iconify/react";
import {status} from "@/funcs/client/status";
import {register} from "@/funcs/client/auth";
import {useRouter} from "next/navigation";
import {isLoggedIn} from "@/funcs/client/isLoggedIn";

export default function Register() {
    const [isVisible, setIsVisible] = React.useState(false);
    const [serverSettings, setServerSettings] = React.useState(null);
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
            setServerSettings(data);
            setRegistrationEnabled(data.registration);
            setSetup(data.setup);
        }
        fetchData();
    }, []);

    const toggleVisibility = () => setIsVisible(!isVisible);

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
        console.log(body);
        const data = await register(body);
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
                <p className="pb-2 text-xl font-medium">Register</p>
                {error && <p className="text-red-500">{error}</p>}
                {!setup && <p className={"text-red-500"}>You are creating the admin account. Please do not forget these details.</p>}
                {!registrationEnabled && (
                    <>
                        <p className="text-red-500">Registration is disabled.</p>
                        <p className="text-sm">
                            Please contact your administrator to enable registration.
                        </p>
                        <p className="text-center text-small">
                            Already have an account?&nbsp;
                            <Link href="/auth/login" size="sm">
                                Log in
                            </Link>
                        </p>
                    </>
                ) || (
                    <>
                        <form className="flex flex-col gap-3" onSubmit={handleRegister}>
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
                            label="Confirm Password"
                            name="password-c"
                            placeholder="Enter password again"
                            type={isVisible ? "text" : "password"}
                            variant="bordered"
                        />
                        <Button color="primary" type="submit">
                            Register
                        </Button>
                    </form>
                    <p className="text-center text-small">
                    Already have an account?&nbsp;
                    <Link href="/auth/login" size="sm">
                    Log in
                    </Link>
                    </p>
                    </>
                )}
            </div>
        </div>
    );
}