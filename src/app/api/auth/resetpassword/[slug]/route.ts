import { db } from "@/app/api/utilities/Data/RenderConnect";
import { verifyJwt } from "@/app/lib/jwt";
import { hash } from "bcrypt";

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } }
) {

  try {
    const slug = params.slug // 'a', 'b', or 'c'
    // console.log(slug);
  
    const urldata = verifyJwt(slug);
  
    // console.log(urldata)
    if(urldata){
      const data  = await request.json();
      
      const hashedPassword = await hash(data.password,10);
      
      // console.log(hashedPassword);
  const client = await db.connect();
  const query = {
    text: `UPDATE public.users
    SET password=($2)
    WHERE email= ($1) RETURNING *;
    `,
    values: [urldata.email, hashedPassword]
  }
  const response = await client.query(query);
  client.end();

  // console.log(response);
  if(response.rowCount>0){
    return new Response(JSON.stringify({message:"success"}) ,{status:200})
  }else{
    return new Response(JSON.stringify({message:"something went wrong"}) ,{status:400})
    
  }
    }

  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message:"failed"}),{
      status:500
    })    
  }
}