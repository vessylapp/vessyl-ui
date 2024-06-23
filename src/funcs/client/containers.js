export async function getContainers() {
    const response = await fetch("/api/getContainers", {
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

export async function getContainer(name) {
    const response = await fetch("/api/getContainer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: localStorage.getItem("token"),
            name
        })
    });
    const data = await response.json();
    return data;
}

export async function containerLogs(name) {
    const response = await fetch("/api/containerLogs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: localStorage.getItem("token"),
            name
        })
    });
    const data = await response.text();
    return data;
}