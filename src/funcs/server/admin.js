import { workerRequest } from "@/lib/server-api";

export function saveVessylAccessUrl(url, token) {
    return workerRequest("/admin/saveproxy", {
        body: { url, token },
    });
}

export function getVessylAccessUrl(token) {
    return workerRequest("/admin/getproxy", {
        body: { token },
    });
}

export function restartProxy(token) {
    return workerRequest("/admin/restartproxy", {
        body: { token },
    });
}
