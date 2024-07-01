import { lucia, userSessionData } from "#/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await userSessionData(request.cookies.get(lucia.sessionCookieName)?.value);
  return NextResponse.json(session);
}
