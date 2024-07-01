import { lucia } from "#/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await lucia.invalidateSession(
      request.cookies.get(lucia.sessionCookieName)!.value
    );
    return NextResponse.json("Logged out");
  } catch {
    return NextResponse.json("Not logged in", { status: 400 });
  }
}
