import { createClient } from "@supabase/supabase-js";
import { compare } from "bcrypt";
import { signJwtAccessToken } from "lib/jwt";
import { NextResponse } from "next/server";



const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);


export async function POST(req:Request) {

  const body  =  await req.json();


  const {data , error} = await supabase
  .from('User')
  .select('id, user_name, email, password')
  .eq('email', body.email);
   

  
  

  
  
  
  const passwordCorrect = await compare( body?.password || '' , data[0].password);

  let res:NextResponse;

  if(passwordCorrect){
    const role = await supabase.from('UserRoleMapping').select('*, Role!inner(*)').eq('user_id', data[0].id);
    const user = {
      id: data[0].id,
      name: data[0].user_name,
      email: data[0].email,
      role: role.data[0].Role.name,
    };
    const accessToken = signJwtAccessToken(user);
    let result  = {
      user,
      accessToken
    }

    res = NextResponse.json(JSON.stringify({result}));
    res.cookies.set("Authorize" , accessToken)
    }

  


  if(passwordCorrect){
    return  res
  } else{ 

    return new Response(JSON.stringify({
      message: 'Unauthenticated'
    }),{
      status:401,
    }
    )
  }

}

