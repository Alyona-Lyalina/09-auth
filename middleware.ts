import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// минимальная заглушка
export function middleware(req: NextRequest) {
  return NextResponse.next(); // просто пропускаем все запросы
}

// чтобы middleware применялся ко всем страницам
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
