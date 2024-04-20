import { compare } from "bcrypt";
import { signJwtAccessToken } from "@/app/lib/jwt";
import { NextResponse } from "next/server";
import { db } from "../../utilities/Data/RenderConnect";


export async function POST(req:Request) {

  const body  =  await req.json();
  const client = await db.connect();
  // const {data , error} = await supabase
  // .from('User')
  // .select('id, user_name, email, password')
  // .eq('email', body.email);
   
  const query = {
    text: `select
    u.id,
    u.username,
    u.email,
    u.password,
    r.rolename
  from
    users u
    join userrole_mapping ur on ur.user_id = u.id
    join roles r on r.id = ur.role_id
    where u.email = ($1);`,
    values: [body.email]
  }

  const data = await client.query(query);
  client.end();
  console.log("from signin", data.rowCount);
  
  if(data.rowCount===1){

    const {id, username,email, password, rolename} = data.rows[0];
    // console.log("id, username, email, password", id, username,email, password, rolename);
      
      
      
      const passwordCorrect = await compare( body?.password || '' , password);
    
      let res:NextResponse;
    
      if(passwordCorrect){
        const user = {
          id: id,
          name: username,
          email: email,
          role: rolename,
        };
        const accessToken = signJwtAccessToken(user);
        let result  = {
          user,
          accessToken
        }
    
        res = NextResponse.json(result);
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
    
    }else{
    return new Response(JSON.stringify({
      message: 'Unauthenticated'
    }),{
      status:401,
    }
    )
  }
  
}