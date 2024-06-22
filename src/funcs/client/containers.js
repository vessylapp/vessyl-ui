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