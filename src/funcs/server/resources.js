export async function getResources(token) {
    const response = await fetch(process.env.API_URL + "/resources", {
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

export async function newResource(name, repo, type, token) {
    const response = await fetch(process.env.API_URL + "/resources/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token,
            name: name,
            git_url: repo,
            type,
        })
    });
    const data = await response.json();
    return data;
}