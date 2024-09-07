export async function saveVessylAccessUrl(url) {
    const response = await fetch("/api/saveAdminProxy", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            url,
            token: localStorage.getItem("token"),
        }),
    });
    return await response.json();
}

export async function getVessylAccessUrl() {
    const response = await fetch("/api/getAdminProxy", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: localStorage.getItem("token"),
        }),
    });
    return await response.json();
}

export async function restartProxy() {
    const response = await fetch("/api/restartProxy", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: localStorage.getItem("token"),
        }),
    });
    return await response.json();
}