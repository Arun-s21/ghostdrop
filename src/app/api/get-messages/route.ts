import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose'; 
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const token = request.cookies.get('token')?.value || '';
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    
    // Verify the token using 'jose'
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.id as string;

    const user = await UserModel.findById(userId);

    if (!user) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, messages: user.messages },
      { status: 200 }
    );
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return Response.json(
      { success: false, message: 'Invalid token or unexpected error' },
      { status: 401 }
    );
  }
}