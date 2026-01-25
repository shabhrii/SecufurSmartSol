import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const { pathname } = req.nextUrl

    // Protected Routes
    const isSellerRoute = pathname.startsWith("/seller")
    const isAdminRoute = pathname.startsWith("/admin")

    // Public Auth Routes
    const isAuthRoute = pathname.startsWith("/auth") || pathname.startsWith("/admin/login")

    if (isAuthRoute) {
        if (isLoggedIn) {
            // If already logged in, redirect them appropriately
            // We might need to check role to redirect to correct dashboard
            // For now, let's just allow them or redirect home
            return NextResponse.redirect(new URL("/", req.nextUrl))
        }
        return NextResponse.next()
    }

    if (isSellerRoute || isAdminRoute) {
        if (!isLoggedIn) {
            let callbackUrl = pathname
            if (req.nextUrl.search) callbackUrl += req.nextUrl.search

            const encodedCallbackUrl = encodeURIComponent(callbackUrl)
            return NextResponse.redirect(
                new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, req.nextUrl)
            )
        }
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
