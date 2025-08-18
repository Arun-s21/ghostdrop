import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
//this api is used for sending the logged in user's username,email etc to the frontend 
//this special api is used even tho we had stored the user's information in the jwt cookie
//because our cookie has the httpOnly flag which means our frontend cant access the cookie
//so we needed to create a new api to check the logged in status of the user and send the required information to the backend 
//for the dashboard to build the unique shareable link for the user to share 
export async function GET(request:NextRequest){

    await dbConnect();

    try{

        const token = request.cookies.get('token')?.value || '';
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

        const {payload} = await jwtVerify(token,secret);
        const userId = payload.id as string;

        const user = await UserModel.findById(userId);
        
        if(!user){
            return Response.json({
                success:false,message:'User not found'
            },
            {status:404}
        );
        }

       return Response.json(
      {
        success: true,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (_error) {
    return Response.json(
      { success: false, message: 'Invalid token or unexpected error' },
      { status: 401 }
    );
  }
}