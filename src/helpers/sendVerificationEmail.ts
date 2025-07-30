import * as SibApiV3Sdk from '@getbrevo/brevo';

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
) {
  // instance of the Brevo API
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  // set API key
  apiInstance.setApiKey(
    SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API!
  );

  // Defining the sender and recipient
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.sender = {
    name: 'GhostDrop',
    email: 'arunsng18@gmail.com', 
  };
  sendSmtpEmail.to = [{ email: email, name: username }];
  sendSmtpEmail.subject = 'GhostDrop | Verification Code';
  // Creating the HTML content for the email
  sendSmtpEmail.htmlContent = `
    <html>
      <body>
        <h2>Hello ${username},</h2>
        <p>Thank you for signing up for GhostDrop. Please use the following code to verify your account:</p>
        <h3>${verifyCode}</h3>
        <p>If you did not request this, please ignore this email.</p>
      </body>
    </html>
  `;

  try {
    // Sending the email
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    // Returning a success response
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (error) {
    console.error('Error sending verification email via Brevo:', error);
    return { success: false, message: 'Failed to send verification email.' };
  }
}