import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';

export async function GET(request: NextRequest){

    await dbConnect();

    try{
        const token = request.cookies.get('token')?.value || '';
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET!) as {
            id:string
        };
        const user = await UserModel.findById(decodedToken.id);

        if(!user){
            return Response.json({
                success:false,message:'user not found'
            },
        {status:404});
        }

        return Response.json({
            success:true, message:user.messages
        },
    {status:200});
    }
    catch(error){
        console.error('Error occured:',error);
        return Response.json({
            success:false, message:'Error occurred'
        },
    {status:401});
    }

}