export function sanitizeResourceName(value = "") {
    return value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
}

function parseLegacyEnvPair(value = "") {
    const trimmed = value.trim();
    if (!trimmed) {
        return null;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
        return {
            key: trimmed,
            value: "",
        };
    }

    return {
        key: trimmed.slice(0, separatorIndex).trim(),
        value: trimmed.slice(separatorIndex + 1).trim(),
    };
}

export function normalizeEnvPairs(value) {
    if (!value) {
        return [];
    }

    if (typeof value === "string") {
        return value
            .split(",")
            .map(parseLegacyEnvPair)
            .filter((entry) => entry?.key);
    }

    if (!Array.isArray(value)) {
        return [];
    }

    return value.flatMap((entry) => {
        if (!entry) {
            return [];
        }

        if (typeof entry === "string") {
            const parsed = parseLegacyEnvPair(entry);
            return parsed?.key ? [parsed] : [];
        }

        const key = String(entry.key ?? "").trim();
        const pairValue = String(entry.value ?? "").trim();

        if (!key) {
            return [];
        }

        return [{ key, value: pairValue }];
    });
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

export function formatEnvPairs(value) {
    const pairs = normalizeEnvPairs(value);
    if (!pairs.length) {
        return "None";
    }

    return pairs.map((entry) => `${entry.key}=${entry.value}`).join(", ");
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
