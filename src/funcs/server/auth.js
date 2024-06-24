export async function register(body) {
    const response = await fetch(process.env.API_URL + "/users/create", {
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
    const response = await fetch(process.env.API_URL + "/users/login", {
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

export async function userInfo(token) {
    const response = await fetch(process.env.API_URL + "/users/info", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
            token: token,
        }),
    });
    const data = await response.json();
    return data;
}

export async function storeGitHubPAT(token, pat) {
    const response = await fetch(process.env.API_URL + "/github/store", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
            token: token,
            pat: pat,
        }),
    });
    const data = await response.json();
    return data;
}