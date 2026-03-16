const DEFAULT_HEADERS = {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
};

function buildUrl(path) {
    return `${process.env.API_URL}${path}`;
}

export async function workerRequest(path, { method = "POST", body, responseType = "json" } = {}) {
    const response = await fetch(buildUrl(path), {
        method,
        headers: DEFAULT_HEADERS,
        cache: "no-store",
        body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (responseType === "text") {
        return response.text();
    }

    if (responseType === "stream") {
        return response;
    }

    return response.json();
}
