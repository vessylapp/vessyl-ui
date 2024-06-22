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