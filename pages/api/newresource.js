export default async function handler(req, res) {
    const response = await fetch(process.env.API_URL + "/resources/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: req.body.token,
            name: req.body.name,
            git_url: req.body.git_url,
            type: req.body.type,
        }),
    });
    const data = await response.json();
    res.status(200).json(data);
}