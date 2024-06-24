import {status} from "@/funcs/server/status";

export const dynamic = 'force-dynamic'
export async function POST(request) {
    // stop NextJS from caching this response
    request.headers.set('Cache-Control', 'no-cache');
    const data = await status();
    return new Response(JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
    });
}