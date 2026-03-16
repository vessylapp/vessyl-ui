import { workerRequest } from "@/lib/server-api";

export function register(body) {
    return workerRequest("/users/create", {
        body,
    });
}

export function login(body) {
    return workerRequest("/users/login", {
        body,
    });
}

export function userInfo(token) {
    return workerRequest("/users/info", {
        body: { token },
    });
}

export function storeGitHubPAT(token, pat) {
    return workerRequest("/github/store", {
        body: { token, pat },
    });
}
