import { postJson } from "@/lib/client-api";

export function status() {
    return postJson("/api/status", {});
}

export function checkForUpdates() {
    return postJson("/api/check-for-updates", {});
}
