import pkgJson from "../../../package.json";

export async function status() {
    const response = await fetch("/api/status", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
    });
    const data = await response.json();
    return data;
}

export async function checkForUpdates() {
    const response = await fetch("/api/check-for-updates", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
    });
    const data = await response.json();
    return data;
}