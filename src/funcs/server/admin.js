export async function saveVessylAccessUrl(url, token) {
    const response = await fetch(process.env.API_URL + "/admin/saveproxy", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            url,
            token,
        }),
    });
    return await response.json();
}

export async function getVessylAccessUrl(token) {
    const response = await fetch(process.env.API_URL + "/admin/getproxy", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token,
        }),
    });
    return await response.json();
}