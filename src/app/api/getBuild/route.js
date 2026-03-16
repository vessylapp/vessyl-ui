import { getBuild } from "@/funcs/server/builds";

export const dynamic = "force-dynamic";

export async function POST(request) {
    const body = await request.json();
    const data = await getBuild(body.token, body.buildId);

    return new Response(JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
    });
}
