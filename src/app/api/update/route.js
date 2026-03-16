export const dynamic = 'force-dynamic'
export async function POST(request) {
    const body = await request.json();
    const packageJson = require('../../../../package.json');
    const version = packageJson.version;
    const response = await fetch(process.env.API_URL + "/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: body.token,
            uiVersion: version,
        }),
    });

    let data;
    try {
        data = await response.json();
    } catch (e) {
        return new Response(JSON.stringify({ success: true }), {
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
        });
    }

    if (!data?.error) {
        return new Response(JSON.stringify({ success: true, ...data }), {
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
        });
    }

    return new Response(JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
    });
}
