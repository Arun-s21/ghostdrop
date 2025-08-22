import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
//we'll pass the messageId 
//message object sent by the get-messages api looks like this
//{
//   "_id": "a_unique_message_id_123",
//   "content": "This is an anonymous message.",
//   "createdAt": "..."
// }


// so we'll make a request to /api/delete-message/"unique-id", we'll get this id
// from the message object and then on the backend we will find the userId from 
// the tokenPayload, find that specific user in the database and pullout its message 
// which has the specific messageId

export async function DELETE(
    request:NextRequest,
    {params}:{params:{messageId:string}}
){
    await dbConnect();
    await params;
    const {messageId} = params;

    try{

        const token = request.cookies.get('token')?.value;
        if(!token){
            return Response.json({
                success:false,
                message:'Unauthorized'
            },{
                status:401
            });

         }
         const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
            const {payload} = await jwtVerify(token,secret);
            const userId = payload.id as string;
            //getting the userId from the token to find the user in the database
            const updateResult = await UserModel.updateOne({
                _id:userId                              //find that specific user in the database
            },{
                $pull:{messages:{_id:messageId}}        //pullout that specific message from the messages array
            });

            if(updateResult.modifiedCount===0){         //if nothing is updated then it means we havent found the message in the array
                return Response.json({
                    success:false,
                    message:'Message not found or already deleted'
                },{
                    status:404
                });
            }

                return Response.json({
                    success:true,
                    message:'Message deleted successfully'
                },{
                    status:200
                });

            

    
}
catch (error) {
    console.error('Error deleting message:', error);
    return Response.json(
      { success: false, message: 'Error deleting message' },
      { status: 500 }
    );
  }
}