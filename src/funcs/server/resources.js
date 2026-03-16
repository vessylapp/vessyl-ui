import { workerRequest } from "@/lib/server-api";

export function getResources(token) {
    return workerRequest("/resources", {
        body: { token },
    });
}

export function getResource(token, name) {
    return workerRequest("/resources/info", {
        body: { token, name },
    });
}

export function newResource(name, repo, type, token) {
    return workerRequest("/resources/new", {
        body: {
            token,
            name,
            git_url: repo,
            type,
        },
    });
}

export function deleteResource(name, token) {
    return workerRequest("/resources/delete", {
        body: { token, name },
    });
}

export function getPorts(token) {
    return workerRequest("/ports", {
        body: { token },
    });
}
