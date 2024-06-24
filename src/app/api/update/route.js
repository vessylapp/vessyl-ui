export const dynamic = 'force-dynamic'
export async function POST(request) {
    request.headers.set('Cache-Control', 'no-cache');
    const body = await request.json();
    const response = await fetch(process.env.API_URL + "/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: body.token,
        }),
    });
    let data = null;
    try {
        data = await response.json();
    } catch (e) {
        process.exit(1)
    }
    if(data.error === undefined || data.error === null) {
        process.exit(1)
    }
    return new Response(JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
    });
}