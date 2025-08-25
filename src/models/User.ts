
import mongoose, {Schema} from 'mongoose';

const UserSchema = new Schema({
    username : {
        type:String,
        required:[true,'Username is required'],             //if the validation fails(user doesnt enter username) then send username is required message
        trim:true,
        unique:true
    },
    password : {
        type: String,
        required: true,

    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAcceptingMessages:{
        type:Boolean,
        default:true,
    },
    messages:[
        {
            content:String,
            createdAt:Date,
        }
    ],

    verifyCode:{
        type:String,
        required:[true,'Verification code is required'],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,'Verify code expiry is required'],
    }


});

const UserModel = mongoose.models.User || mongoose.model('User',UserSchema);

export default UserModel;   

