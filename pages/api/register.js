export default async function handler(req, res) {
    const response = await fetch(process.env.API_URL + "/users/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: req.body.username,
            password: req.body.password,
        }),
    });
    const data = await response.json();
    res.status(200).json(data);
}