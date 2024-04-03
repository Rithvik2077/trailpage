import { createClient } from "@supabase/supabase-js";
import { template } from "lib/emailtemplates/template";
import { signJwtAccessToken } from "lib/jwt";
import { sendEmail } from "lib/sendEmail";


const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);


export async function POST(req:Request) {

  try {
    const {email} = await req.json();

    const {data , error} = await supabase
    .from('User')
    .select('email')
    .eq('email', email);
    if(data){
      const token = signJwtAccessToken(data[0], {expiresIn:'2h'});
      let url = 'http://localhost:3000/resetpassword/'
      url = url+token
      const text = template(url)
      const mailOptions = {
        to: email,
        subject: "Reset Password",
        message: text
    };
      sendEmail(mailOptions);

      
   return new Response(JSON.stringify({ message:"success"}),{
     status:200
    })
    }else{
      return new Response(JSON.stringify({ message:"email not found"}),{
        status:400
       })
    }

  }catch(error){
    console.log(error);
    return new Response(JSON.stringify({ message:"failed"}),{
      status:500
    })
  }  
}