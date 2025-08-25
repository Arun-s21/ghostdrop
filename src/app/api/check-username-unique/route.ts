import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';

export async function POST(request:Request){
    await dbConnect();
    try{
                const {username} = await request.json();

                const existingVerifiedUser = await UserModel.findOne({
                    username,
                    isVerified: true,
                });

                if(existingVerifiedUser){
                    return Response.json(
                        { success: false, message: 'Username is already taken' },
                        { status: 400 }
                );

                }

                // If no user is found, the username is available
            return Response.json(
                { success: true, message: 'Username is available' },
                { status: 200 }
            );

    

        }


catch (error) {
    console.error('Error checking username:', error);
    return Response.json(
      { success: false, message: 'Error checking username' },
      { status: 500 }
    );
  }
}