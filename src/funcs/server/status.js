import {config} from "dotenv";

config();

export async function status(vers = "") {
    let toAdd = ``;
    if(vers !== "") {
        toAdd = `?cv=${vers}`;
    }
    const response = await fetch(process.env.API_URL + "/status" + toAdd, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
}

export async function checkForUpdates() {
    const pkgJson = require("../../../package.json");
    const {version} = JSON.parse(JSON.stringify(pkgJson));
    const statusData = await status(version);
    const workerVersion = statusData.version;
    const needsUpdate = statusData.needsUpdate;
    return {update: needsUpdate, uiVersion: version, workerVersion};
}