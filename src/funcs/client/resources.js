import { postJson, withToken } from "@/lib/client-api";

export function getResources() {
    return postJson("/api/getResources", withToken());
}

export function getResource(name) {
    return postJson("/api/getResource", withToken({ name }));
}

export function newResource(name, repo, buildTool) {
    return postJson("/api/newResource", withToken({
        name,
        git_url: repo,
        type: buildTool,
    }));
}

export async function deleteResource(name) {
    try {
        return await postJson("/api/deleteResource", withToken({ name }));
    } catch (error) {
        window.location.href = "/dashboard/resources";
        return null;
    }
}

export function getPorts() {
    return postJson("/api/getPorts", withToken());
}
