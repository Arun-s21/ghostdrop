import { resend } from "@/lib/resend";
import VerificationEmail from "@/emails/VerificationEmail";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
){
    console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY);
    try{
       const data = await resend.emails.send({
            from:'onboarding@resend.dev',
            to:email,
            subject:'GhostDrop | Verification Code',
            react: VerificationEmail({username,otp:verifyCode}),
        });
        console.log("Resend response:", data);
        return {success:true,message:'Verification email sent successfully.'};
    }
    catch (emailError) {
  console.error('Full error sending verification email:', emailError); // Log the full error
  return { success: false, message: 'Failed to send verification email.' };
}
}