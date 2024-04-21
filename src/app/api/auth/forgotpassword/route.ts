import { template } from "@/app/lib/emailtemplates/template";
import { signJwtAccessToken } from "@/app/lib/jwt";
import { sendEmail } from "@/app/lib/sendEmail";
import { db } from "../../utilities/Data/RenderConnect";

export async function POST(req:Request) {

  try {
    const {email} = await req.json();

    // console.log(email)
    const client = await db.connect();

    
    const query = {
      text: "SELECT email from users where email = ($1)",
      values: [email]
    }

    // console.log(query);

    const data = await client.query(query);
    client.end();
    
    // console.log(data.rows)

    if(data){
      const token = signJwtAccessToken({email:email}, {expiresIn:'2hr'});

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