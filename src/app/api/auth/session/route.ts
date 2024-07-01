import { lucia, getUserSessionData } from "#/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getUserSessionData(request.cookies.get(lucia.sessionCookieName)?.value);
  return NextResponse.json(session);
}
