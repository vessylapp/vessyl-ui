export async function getResources() {
    const response = await fetch("/api/getResources", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: localStorage.getItem("token")
        })
    });
    const data = await response.json();
    return data;
}

export async function getResource(name) {
    const response = await fetch("/api/getResource", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: localStorage.getItem("token"),
            name: name
        })
    });
    const data = await response.json();
    return data;
}

export async function newResource(name, repo, buildTool) {
    const response = await fetch("/api/newResource", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: localStorage.getItem("token"),
            name: name,
            git_url: repo,
            type: buildTool
        })
    });
    const data = await response.json();
    return data;
}

export async function deleteResource(name) {
    let response;
    let data;
    try {
        response = await fetch("/api/deleteResource", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: localStorage.getItem("token"),
                name: name
            })
        });
        data = await response.json();
    } catch (error) {
        window.location.href = "/dashboard/resources";
        return;
    }
    return data;
}