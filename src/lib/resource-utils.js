export function sanitizeResourceName(value = "") {
    return value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
}

export function parseListField(value = "") {
    return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
}

export function formatListField(value) {
    if (!Array.isArray(value) || value.length === 0) {
        return "";
    }

    return value.join(", ");
}

export function formatDate(value) {
    if (!value) {
        return "Unavailable";
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return "Unavailable";
    }

    return parsed.toLocaleString();
}
