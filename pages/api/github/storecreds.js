// handle
export default async function handler(req, res) {
    const { pat } = req.body;
    if (!pat) {
        return res.status(400).json({ error: "Please provide a Personal Access Token." });
    }

    const response = await fetch(process.env.API_URL + "/github/store", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: req.body.token,
            pat,
        }),
    });
    const data = await response.json();
    res.status(200).json(data);
}