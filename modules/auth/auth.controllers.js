import ApiResponse from "../../utils/api-response";
import authServices from "./auth.services";

const register = async(req,res)=>{
  const user = authServices.register(req.body);
  ApiResponse.created(res, "successfully registered", user);
};

const login = async (req,res)=>{
  const {user,accessToken,refreshToken} = authServices.login(req.body);

  
  ApiResponse.ok(res, "successfully logged in",{user, accessToken});
};

export {register,login};

