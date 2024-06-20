export default async function handler(req, res) {
    const response = await fetch(process.env.API_URL + "/containers/" + req.body.name + "/info", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: req.body.token,
        }),
    });
    const data = await response.text();
    res.status(200).send(data);
}