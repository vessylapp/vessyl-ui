import { Button, Spacer } from "@nextui-org/react";
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
        if(statusData.setup === false) {
            return redirect("/register");
        }
    }
}

export default async function Home() {
    const isLoggedInV = await checkIfLoggedIn();
    if(isLoggedInV) {
        return null;
    }
    return (
        <div className={"flex flex-col items-center justify-center min-h-screen py-2"}>
            <h1 className={"text-6xl font-bold"}>Welcome to Vessyl</h1>
            <p className={"mt-3 text-2xl"}>Manage your Docker environment with ease.</p>
        </div>
    );
}