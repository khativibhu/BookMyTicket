import User from "./auth.model";
import {generateResetToken,  generateAccessToken ,generateRefreshToken} from "../../utils/token.js";

export class authServices{
    static register = async({name,email,password})=>{
      
       const user1 = await User.updateOne({email: email});
       if(user1){
        return new Error("email already registered");
       }

       const {rawToken,hashedToken} = generateResetToken();

       const user = await User.create(
        {
         name,
         email,
         password,
         verificationToken: hashedToken,
        }
        );
        
       const userObject = user.toObject();  

       delete userObject.password;
       delete userObject.verificationToken;

       return userObject;
    }

    static login= async(token,{email,password})=>{
       const user = await User.findOne(email).select(+password);

       if(!user){
        return new Error("email and password not found. Either one is incorrect.");
       }

       const isMatch = await user.comparePassword(password);
       
       if(!isMatch){
        return new Error("password not matched");
       }

       const accessToken = generateAccessToken({id: user._id});
       const refreshToken = generateRefreshToken({id: user._id});
       
       user.refreshToken = crypto.createHash('sha256').update(refreshToken).digest('hex');

       await user.save({validateBeforeSave: false});

       const userObject = user.toObject();
       delete userObject.password;
       delete userObject.refreshToken;

      return {user: userObject,accessToken,refreshToken};
    };
}
