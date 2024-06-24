import {newResource} from "@/funcs/server/resources";

export const dynamic = 'force-dynamic'
export async function POST(request) {
    request.headers.set('Cache-Control', 'no-cache');
    const body = await request.json();
    const data = await newResource(body.name, body.git_url, body.type, body.token);
    return new Response(JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
    });
}