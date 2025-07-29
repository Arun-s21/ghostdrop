import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, content } = await request.json();

    // Find the user by username
    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    //Check if the user is accepting messages
    if (!user.isAcceptingMessages) {
      return Response.json(
        {
          success: false,
          message: 'User is not currently accepting messages',
        },
        { status: 403 } 
      );
    }

    // Create the new message object
    const newMessage = {
      content,
      createdAt: new Date(),
    };

    // Add the new message to the user's messages array
    user.messages.push(newMessage);
    await user.save();

    return Response.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending message:', error);
    return Response.json(
      { success: false, message: 'Error sending message' },
      { status: 500 }
    );
  }
}