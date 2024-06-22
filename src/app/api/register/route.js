import {register} from "@/funcs/server/auth";

export const dynamic = 'force-dynamic'
export async function POST(request) {
    const json = await request.json();
    const data = await register(json);
    return new Response(JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
    });
}