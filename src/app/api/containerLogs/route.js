import {containerLogs} from "@/funcs/server/containers";

export const dynamic = 'force-dynamic'
export async function POST(request) {
    request.headers.set('Cache-Control', 'no-cache');
    const body = await request.json();
    const data = await containerLogs(body.token, body.name);
    return new Response(data, {
        headers: {
            "Cache-Control": "no-cache",
        },
    });
}