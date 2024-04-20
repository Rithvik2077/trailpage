import jwt,{ JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";



interface signOption{
  expiresIn?: string|number;
}

const DEFAULT_SIGN_OPTION: signOption={
  expiresIn:'7d'
}


export function signJwtAccessToken(payload:JwtPayload, options:signOption= DEFAULT_SIGN_OPTION){


  const secrestkey = process.env.JWT_SECRET_KEY;

  const token =jwt.sign(payload, secrestkey, options);
  return token;
}


export function verifyJwt(token:string){
  try{
  const secrestkey = process.env.JWT_SECRET_KEY;

  // console.log(token, secrestkey)
 const decoded = jwt.verify(token, secrestkey);
return decoded as JwtPayload;

  }catch (error){
    console.log(error);
    return null
  }
}


