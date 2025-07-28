import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, password } = await request.json();

    // 1. Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // 2. Check if the user is verified
    if (!user.isVerified) {
      return Response.json(
        {
          success: false,
          message: 'Please verify your account before logging in',
        },
        { status: 403 } // 403 Forbidden
      );
    }

    // 3. Compare the provided password with the hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      // 4. If password is correct, create a JWT
      const tokenPayload = {
        id: user._id,
        username: user.username,
        email: user.email,
      };

      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET || 'default-secret', {
        expiresIn: '1d', // Token expires in 1 day
      });

      // 5. Create a success response and set the cookie
      const response = Response.json(
        {
          success: true,
          message: 'Login successful',
        },
        { status: 200 }
      );

      response.headers.set('Set-Cookie', `token=${token}; HttpOnly; Path=/`);

      return response;

    } else {
      // If password is not correct
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