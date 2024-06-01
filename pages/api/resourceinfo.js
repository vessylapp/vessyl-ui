export default async function handler(req, res) {
    const response = await fetch(process.env.API_URL + "/resources/info", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: req.body.token,
            name: req.body.name,
        }),
    });
    const data = await response.json();
    res.status(200).json(data);
}