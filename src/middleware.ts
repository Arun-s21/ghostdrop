import {NextResponse, NextRequest} from 'next/server';
import jwt from 'jsonwebtoken';
export function middleware(request:NextRequest){


    const path = request.nextUrl.pathname;  //request.url will give the full path inlcuding ://http and entire path
    //however nexturl gives only the intended path in this case /dashboard

    const isProtectedRoute = path === '/dashboard';

    const token = request.cookies.get('token')?.value || '';
    
    if(isProtectedRoute && !token){
        return NextResponse.redirect(new URL('/sign-in',request.url));


    }

    if(isProtectedRoute && token){
        try{

        jwt.verify(token,process.env.JWT_SECRET!);

        return NextResponse.next();

        }
        catch(error){
            console.error('Error while verifying token:',error);
            return NextResponse.redirect(new URL('sign-in',request.url));
        }
            

    }
    //if protectedroute is there and the token is correct i.e the one we gave to the user then
    return NextResponse.next();


    
};
export const config = {
  matcher: ['/dashboard'],

}