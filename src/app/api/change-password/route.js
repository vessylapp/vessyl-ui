import { changePassword } from "@/funcs/server/auth";

export const dynamic = "force-dynamic";

export async function POST(request) {
    const body = await request.json();
    const data = await changePassword(body.token, body.currentPassword, body.newPassword);

    return new Response(JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
    });
}
