import { EnumTokens } from "./service/auth-token.service";
import { DASHBOARD_PAGES } from "./config/pages-url.config";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
  const { url, cookies } = req;

  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

  const isAuthPage = url.includes("/auth");

  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url));
  }

  if (isAuthPage) {
    return NextResponse.next();
  }

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/auth", url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*", "/auth/:path"],
};
