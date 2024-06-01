import fetch from 'node-fetch';

export default async function handler(req, res) {
    const response = await fetch(process.env.API_URL + "/resources/deploy", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: req.body.token,
            name: req.body.name,
        }),
    });
    response.body.pipe(res);
}