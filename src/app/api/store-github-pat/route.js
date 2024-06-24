import {storeGitHubPAT} from "@/funcs/server/auth";

export const dynamic = 'force-dynamic'
export async function POST(request) {
    // stop NextJS from caching this response
    request.headers.set('Cache-Control', 'no-cache');
    const body = await request.json();
    const data = await storeGitHubPAT(body.token, body.pat);
    return new Response(JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
    });
}