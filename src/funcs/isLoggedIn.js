import {cookies} from "next/headers";

export async function isLoggedIn() {
    const cookieStore = cookies()
    const token = cookieStore.get("token");
    if (token !== null && token !== undefined) {
        return true;
    } else {
        return false;
    }
}