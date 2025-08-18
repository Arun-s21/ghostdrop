import { NextResponse } from "next/server";
import { AxiosError } from "axios";
import { accessSync } from "node:fs";
export async function GET(){
    try{
        const response = NextResponse.json({
            success:true,
            message:'Log out successful'
        });

        response.cookies.set('token','',{
            httpOnly:true,                          //we have to give every parameter so that the browser knows which exact cookie to clean
            path:'/',
            expires: new Date(0)                    //setting a date in the past(0 means 0 milliseconds after 1970)
        });

        return response;

    }
    catch(err){
        const error = err as AxiosError;
        return NextResponse.json({
            error:error.message,
            success:false
        },{
            status:500
        });
    }


}