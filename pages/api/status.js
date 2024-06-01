export default async function handler(req, res) {
    const response = await fetch(process.env.API_URL + "/status", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    res.status(200).json(data);
}