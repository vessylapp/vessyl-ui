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