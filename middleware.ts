

import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // console.log("TEMP MIDDLEWARE: allowing all requests through");
  return NextResponse.next(); // Let everything pass
}

export const config = {
  matcher: ["/api/:path*"], // Apply to all API routes
};
