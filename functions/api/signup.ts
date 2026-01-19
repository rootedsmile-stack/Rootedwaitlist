interface Env {
  DB: D1Database; // This matches the 'binding' in wrangler.toml
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  
  try {
    const { email, name } = await request.json() as { email: string; name: string };

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    // Explicitly targeting the rootedwaitlist table
    await env.DB.prepare(
      "INSERT INTO rootedwaitlist (email, name) VALUES (?, ?)"
    )
    .bind(email, name || "Customer")
    .run();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    let message = "Server error";
    if (error.message.includes("UNIQUE")) message = "Already registered!";
    
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
};
