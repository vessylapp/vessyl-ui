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