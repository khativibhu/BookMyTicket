import crypto from "crypto";
import jwt from "jsonwebtoken";

generateResetToken = async ()=>{
   const rawToken = crypto.randomBytes(32).toString("hex");
   
   const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

   return {rawToken,hashedToken};
} 

generateAccessToken = async (payload)=>{
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET,{
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15ms",
    });
};

generateRefreshToken = async (payload)=>{
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET,{
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7days",
    });
};

export {generateResetToken,generateAccessToken,generateRefreshToken};
