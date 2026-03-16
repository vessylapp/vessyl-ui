import { postJson, postText, withToken } from "@/lib/client-api";

export function getContainers() {
    return postJson("/api/getContainers", withToken());
}

export function getContainer(name) {
    return postJson("/api/getContainer", withToken({ name }));
}

export function containerLogs(name) {
    return postText("/api/containerLogs", withToken({ name }));
}

export function startContainer(name) {
    return postText("/api/startContainer", withToken({ name }));
}

export function stopContainer(name) {
    return postText("/api/stopContainer", withToken({ name }));
}
