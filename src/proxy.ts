import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname


    const publicPaths = ["/", "/login", "/signup", "/verifyemail"]
    const isPublic = publicPaths.includes(path)
    
    const token = request.cookies.get("token")?.value

    // 1️⃣ Protected route and no token → send to login
    if (!isPublic && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if(publicPaths.includes(path)){
      return NextResponse.next();
    }
    // 2️⃣ Auth user trying to access login/signup → send home
    if (token && (path === "/login" || path === "/signup")) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // 3️⃣ Public routes allowed always
    return NextResponse.next()
}
 
export const config = {
  matcher: [
    
    "/", "/login", "/signup", "/verifyemail"
  ]
}
