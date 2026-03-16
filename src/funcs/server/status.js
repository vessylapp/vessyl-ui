import { workerRequest } from "@/lib/server-api";

export async function status(vers = "") {
    let toAdd = "";
    if(vers !== "") {
        toAdd = `?cv=${vers}`;
    }
    return workerRequest("/status" + toAdd, {
        method: "GET",
    });
}

export async function checkForUpdates() {
    const pkgJson = require("../../../package.json");
    const {version} = JSON.parse(JSON.stringify(pkgJson));
    const statusData = await status(version);
    const workerVersion = statusData.version;
    const needsUpdate = statusData.needsUpdate;
    return {update: needsUpdate, uiVersion: version, workerVersion};
}
