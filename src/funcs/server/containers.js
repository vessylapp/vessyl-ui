export async function getContainers(token) {
    const response = await fetch(process.env.API_URL + "/containers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token
        })
    });
    const data = await response.json();
    return data;
}

export async function getContainer(token, name) {
    const response = await fetch(process.env.API_URL + "/containers/" + name + "/info", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token
        })
    });
    let data;
    try {
        data = await response.json();
    } catch (e) {
        data = {
            error: true,
        };
    }
    return data;
}

export async function containerLogs(token, name) {
    const response = await fetch(process.env.API_URL + "/containers/" + name + "/logs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token
        })
    });
    const data = await response.text();
    return data;
}

export async function stopContainer(token, name) {
    const response = await fetch(process.env.API_URL + "/containers/" + name + "/stop", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token,
        })
    });
    const data = await response.text()
    return data;
}

export async function startContainer(token, name) {
    const response = await fetch(process.env.API_URL + "/containers/" + name + "/start", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token,
        })
    });
    const data = await response.text()
    return data;
}