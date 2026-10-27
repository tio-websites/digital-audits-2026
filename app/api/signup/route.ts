import { NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/lib/db";
import { createMondayContact } from "@/lib/monday";

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName, practice, plan } = await req.json();

    if (!email || !password || !firstName || !lastName || !plan) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    const user = await createUser({ email, password, firstName, lastName, practice, plan });

    // Create Monday.com CRM contact (placeholder — logs until API token connected)
    const monday = await createMondayContact({
      name: `${firstName} ${lastName}`,
      email,
      plan,
      practice,
      status: "active",
      joinedAt: new Date().toISOString(),
    });

    // TODO: Store monday.id on the user record once real DB is connected
    // await updateUserMondayId(user.id, monday.id)
    console.log("Monday contact created:", monday.id, "(placeholder)");

    return NextResponse.json({ success: true, userId: user.id }, { status: 201 });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
