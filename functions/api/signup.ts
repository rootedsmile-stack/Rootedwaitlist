interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  
  try {
    const { email, name } = await request.json() as { email: string; name: string };

    if (!email) {
      return new Response("Email is required", { status: 400 });
    }

    // 1. Insert into D1 Database
    await env.DB.prepare(
      "INSERT INTO waitlist (email, name) VALUES (?, ?)"
    ).bind(email, name || "Valued Customer").run();

    // 2. Note: To send the actual email, you'll need to fetch to an 
    // email API like Resend or MailChannels here.
    
    return new Response(JSON.stringify({ message: "Joined successfully!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
