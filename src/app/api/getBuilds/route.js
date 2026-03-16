import { getBuilds } from "@/funcs/server/builds";

export const dynamic = "force-dynamic";

export async function POST(request) {
    const body = await request.json();
    const data = await getBuilds(body.token);

    return new Response(JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
    });
}
