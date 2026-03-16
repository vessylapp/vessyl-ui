import { postJson, withToken } from "@/lib/client-api";

export function getBuilds() {
    return postJson("/api/getBuilds", withToken());
}

export function getBuild(buildId) {
    return postJson("/api/getBuild", withToken({ buildId }));
}
