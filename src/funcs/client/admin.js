import { postJson, withToken } from "@/lib/client-api";

export function saveVessylAccessUrl(url) {
    return postJson("/api/saveAdminProxy", withToken({ url }));
}

export function getVessylAccessUrl() {
    return postJson("/api/getAdminProxy", withToken());
}

export function restartProxy() {
    return postJson("/api/restartProxy", withToken());
}
