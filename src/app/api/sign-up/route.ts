import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import {sendVerificationEmail} from "@/helpers/sendVerificationEmail";

export async function POST(request: Request){

    await dbConnect();//connect to the mongodb database

    try{

        const {username,email,password} = await request.json(); //store user entered information
        const existingVerifiedUserByUsername = await UserModel.findOne({ //checking whether a same verified user with the same username exists in our db or not
            username, 
            isVerified:true,
        });
        if(existingVerifiedUserByUsername){ //if a verified user with same username is found
            return Response.json({ 
                success:false,
                message:'Username is already taken',
            },
            {status:400}
        );
        }


        const existingUserByEmail = await UserModel.findOne({
            email
        });
        let verifyCode = Math.floor(10000 + Math.random()*900000).toString();

        if(existingUserByEmail){ //if db contains a user with same email
            if(existingUserByEmail.isVerified){ //if that user is verified
            return Response.json(
                {
                    success:false,
                    message:'User already exists with this email',
                },
                { status:400}
            );
        }
    

        else{
            //user exists but is not verified so update their password and save
            //their verification code in db to crosscheck once we email it to them
            //and they enter the code 
            const hashedPass  = await bcrypt.hash(password,10);
            existingUserByEmail.password = hashedPass;
            existingUserByEmail.verifyCode = verifyCode;
            existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
            await existingUserByEmail.save();

        }
        }

        else{
            //user doesnt exist so we need to create a new user
            const hashedPass = await bcrypt.hash(password,10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours()+1); //if user doesnt enter info
                                                          //after 1 hour it expires
            const newUser = new UserModel({
                username,
                email,
                password: hashedPass,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified:false,
                isAcceptingMessages:true,
                messages:[],

                
            });
            await newUser.save();
        }

        //now we need to send verification email

        const emailResponse = await sendVerificationEmail( //function that sends verification email to the corresponding email
            email,
            username,
            verifyCode
        );
        if(!emailResponse.success){
            return Response.json(
                {
                    success:false,
                    message:emailResponse.message,
                },
                {status:500}
            );
        }

        return Response.json(
            {
                success:true,
                message:'User registered successfully. Please verify your email',
            },
            {
                status:201
            }
        );

    }
    catch(error){
        console.error('Error registering the user:',error);
        return Response.json(
            {
                success:false,
                message:'Error registering the user',
            },
            {status:500}
        );
    }


}