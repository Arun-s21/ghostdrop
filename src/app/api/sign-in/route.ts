import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose'; // Import from 'jose'

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, password } = await request.json();
    const user = await UserModel.findOne({ email });

    if (!user || !user.isVerified) {
      return Response.json(
        { success: false, message: 'User not found or not verified' },
        { status: 404 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      // Create the token using 'jose'
      const tokenPayload = {
        id: user._id.toString(), // Ensure ID is a string
        username: user.username,
        email: user.email,
      };

      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const token = await new SignJWT(tokenPayload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1d')
        .sign(secret);

      const response = Response.json(
        { success: true, message: 'Login successful' },
        { status: 200 }
      );

      response.headers.set('Set-Cookie', `token=${token}; HttpOnly; Path=/`);
      return response;

    } else {
      return Response.json(
        { success: false, message: 'Incorrect password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error during sign-in:', error);
    return Response.json(
      { success: false, message: 'Error during sign-in' },
      { status: 500 }
    );
  }
}