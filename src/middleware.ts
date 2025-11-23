import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname

    //public path bna diya
    const isPublicPath = path === "/login" || path==="/signup" || path ==="/verifyemail"
    
    //token le liya cookie se agr available hai to 
    const token = request.cookies.get("token")?.value || ""

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.url))
    }else if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.url))
    }

  
}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
// See "Matching Paths" below to learn more
export const config = {//kon kon se pages pr ye middleware kaam krega ye hai
  matcher: [
    "/",
    "/login",
    "/signup",
    "/profile",
    "/verifyemail"
  ]
}