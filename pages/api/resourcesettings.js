export default async function handler(req, res) {
    const bodyToGive = {};
    if (req.body.env) {
        bodyToGive.env = req.body.env;
    }
    if (req.body.network) {
        bodyToGive.network = req.body.network;
    }
    if (req.body.ports) {
        bodyToGive.ports = req.body.ports;
    }
    if (req.body.volumes) {
        bodyToGive.volumes = req.body.volumes;
    }
    const response = await fetch(process.env.API_URL + "/resources/settings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: req.body.token,
            name: req.body.name,
            ...bodyToGive,
        }),
    });
    const data = await response.json();
    res.status(200).json(data);
}