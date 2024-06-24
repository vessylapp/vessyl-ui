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