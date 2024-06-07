import fetch from 'node-fetch';
const packageJson = require('../../package.json');

export default async function handler(req, res) {
    const dataToSend = {
        needsUpdate: false,
    };
    const response = await fetch(process.env.API_URL + "/status", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (data.version !== process.env.VERSION) {
        dataToSend.needsUpdate = true;
    }
    const versionOfUI = packageJson.version;
    const UIresponse = await fetch("https://api.github.com/repos/vessylapp/vessyl-ui/releases/latest", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const UIData = await UIresponse.json();
    if (UIData.tag_name !== versionOfUI) {
        dataToSend.needsUpdate = true;
    }
    res.json(dataToSend);
}