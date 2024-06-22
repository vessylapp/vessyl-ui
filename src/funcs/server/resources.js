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