import { workerRequest } from "@/lib/server-api";

export function getBuilds(token) {
    return workerRequest("/builds", {
        body: { token },
    });
}

export function getBuild(token, buildId) {
    return workerRequest(`/builds/${buildId}`, {
        body: { token },
    });
}
