import { workerRequest } from "@/lib/server-api";

export function getContainers(token) {
    return workerRequest("/containers", {
        body: { token },
    });
}

export async function getContainer(token, name) {
    try {
        return await workerRequest(`/containers/${name}/info`, {
            body: { token },
        });
    } catch (error) {
        return { error: true };
    }
}

export function containerLogs(token, name) {
    return workerRequest(`/containers/${name}/logs`, {
        body: { token },
        responseType: "text",
    });
}

export function stopContainer(token, name) {
    return workerRequest(`/containers/${name}/stop`, {
        body: { token },
        responseType: "text",
    });
}

export function startContainer(token, name) {
    return workerRequest(`/containers/${name}/start`, {
        body: { token },
        responseType: "text",
    });
}
