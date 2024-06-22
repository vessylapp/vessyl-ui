export async function status() {
    const response = await fetch("/api/status", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
    });
    const data = await response.json();
    return data;
}