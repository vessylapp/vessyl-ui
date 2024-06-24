export const dynamic = 'force-dynamic'
export async function POST(request) {
    request.headers.set('Cache-Control', 'no-cache');
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
    const data = await response.json();
    return new Response(JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
    });
}