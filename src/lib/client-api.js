const DEFAULT_HEADERS = {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
};

export function getToken() {
    if (typeof window === "undefined") {
        return null;
    }

    return localStorage.getItem("token");
}

async function request(path, { method = "POST", body, responseType = "json" } = {}) {
    const response = await fetch(path, {
        method,
        headers: DEFAULT_HEADERS,
        cache: "no-store",
        body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (responseType === "text") {
        return response.text();
    }

    return response.json();
}

export function postJson(path, body) {
    return request(path, { body });
}

export function postText(path, body) {
    return request(path, { body, responseType: "text" });
}

export function withToken(body = {}) {
    return {
        token: getToken(),
        ...body,
    };
}
