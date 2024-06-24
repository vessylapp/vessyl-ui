import fetch from "node-fetch";

export const dynamic = 'force-dynamic'

function iteratorToStream(iterator) {
    return new ReadableStream({
        async pull(controller) {
            const { value, done } = await iterator.next()

            if (done) {
                controller.close()
            } else {
                controller.enqueue(value)
            }
        },
    })
}

export async function POST(request) {
    request.headers.set('Cache-Control', 'no-cache');
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
    return new Response(response.body);
}