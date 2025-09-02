import prisma from "@/lib/prisma";
import { comparePassword, generateToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid email or password" }), { status: 401 });
    }

    // Compare password
    const isValid = comparePassword(password, user.passwordHash);
    if (!isValid) {
      return new Response(JSON.stringify({ error: "Invalid email or password" }), { status: 401 });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Return token + user info (without password)
    return new Response(
      JSON.stringify({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
