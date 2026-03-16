export const dynamic = 'force-dynamic'
export async function POST(request) {
    const body = await request.json();
    const bodyToGive = {};
    if (body.env) {
        bodyToGive.env = body.env;
    }
    if (body.network) {
        bodyToGive.network = body.network;
    }
    if (body.ports) {
        bodyToGive.ports = body.ports;
    }
    if (body.volumes) {
        bodyToGive.volumes = body.volumes;
    }
    if (body.domain) {
        bodyToGive.domain = body.domain;
    }
    if (body.baseDir) {
        bodyToGive.baseDir = body.baseDir;
    }
    const response = await fetch(process.env.API_URL + "/resources/settings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: body.token,
            name: body.name,
            ...bodyToGive,
        }),
    });

    return new Response(JSON.stringify(await response.json()), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
    });
}
