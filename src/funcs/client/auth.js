export async function register(body) {
    const response = await fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
            username: body.username,
            password: body.password,
        }),
    });
    const data = await response.json();
    return data;
}

export async function login(body) {
    const response = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
            username: body.username,
            password: body.password,
        }),
    });
    const data = await response.json();
    return data;
}

export async function userInfo() {
    const response = await fetch("/api/user-info", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
            token: localStorage.getItem("token"),
        }),
    });
    const data = await response.json();
    return data;
}

export async function storeGitHubPAT(pat) {
    const response = await fetch("/api/store-github-pat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
            token: localStorage.getItem("token"),
            pat: pat,
        }),
    });
    const data = await response.json();
    return data;
}