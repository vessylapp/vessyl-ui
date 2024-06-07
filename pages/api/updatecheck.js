import fetch from 'node-fetch';
const packageJson = require('../../package.json');

export default async function handler(req, res) {
    const dataToSend = {
        needsUpdate: false,
    };
    const {version} = packageJson;
    const response = await fetch(process.env.API_URL + "/status?cv=" + version, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if(data.needsUpdate) {
        dataToSend.needsUpdate = true;
    }
    res.json(dataToSend);
}