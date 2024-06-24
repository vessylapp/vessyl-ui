import {stopContainer} from "@/funcs/server/containers";

export const dynamic = 'force-dynamic'
export async function POST(request) {
    request.headers.set('Cache-Control', 'no-cache');
    const body = await request.json();
    const data = await stopContainer(body.token, body.name);
    return new Response(data, {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
    });
}