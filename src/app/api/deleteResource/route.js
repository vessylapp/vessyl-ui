import {deleteResource} from "@/funcs/server/resources";

export const dynamic = 'force-dynamic'
export async function POST(request) {
    request.headers.set('Cache-Control', 'no-cache');
    const body = await request.json();
    const data = await deleteResource(body.name, body.token);
    return new Response(JSON.stringify(data), {
        headers: {
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
        },
    });
}