export const dynamic = 'force-dynamic'

export async function POST(request) {
    const body = await request.json();
    const response = await fetch(process.env.API_URL + "/resources/deploy", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: body.token,
            name: body.name,
        }),
    });
    return new Response(response.body, {
        headers: {
            "Cache-Control": "no-cache",
        },
    });
}
