import { Button, Input, Spacer } from "@nextui-org/react";
import {status} from "@/funcs/status";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {isLoggedIn} from "@/funcs/isLoggedIn";

async function checkIfLoggedIn() {
    const loggedIn = await isLoggedIn();
    const statusData = await status();
    if (loggedIn) {
        return redirect("/dashboard");
    } else {
        if(statusData.registration === false) {
            return false;
        }
        return true;
    }
}

export default async function Register() {
    const isLoggedInV = await checkIfLoggedIn();
    if(isLoggedInV === false) {
        // registration is disabled, so tell the user to contact the admin
        return (
            <div className={"flex flex-col items-center justify-center min-h-screen py-2"}>
                <h1 className={"text-6xl font-bold"}>Registration is disabled</h1>
                <p className={"mt-3 text-2xl"}>Please contact your administrator to enable registration.</p>
            </div>
        );
    }
    return (
        <div className={"flex flex-col items-center justify-center min-h-screen py-2"}>
            <h1 className={"text-6xl font-bold"}>Register</h1>
            <p className={"mt-3 text-2xl"}>Create an account to manage your Docker environment with ease.</p>
            <Spacer y={5} />
            <div className={"flex flex-col space-y-2 w-full md:w-1/3"}>
                <Input
                    label="Username"
                    placeholder="Username"
                />
                <Input
                    label="Password"
                    placeholder="Password"
                    type="password"
                />
                <Input
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    type="password"
                />
                <Button auto>Register</Button>
            </div>
        </div>
    );
}