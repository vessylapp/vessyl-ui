import { postJson, withToken } from "@/lib/client-api";

export function register(body) {
    return postJson("/api/register", body);
}

export function login(body) {
    return postJson("/api/login", body);
}

export function userInfo() {
    return postJson("/api/user-info", withToken());
}

export function storeGitHubPAT(pat) {
    return postJson("/api/store-github-pat", withToken({ pat }));
}
