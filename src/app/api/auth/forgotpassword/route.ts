import { template } from "lib/emailtemplates/template";
import { signJwtAccessToken } from "lib/jwt";
import { sendEmail } from "lib/sendEmail";
import { db } from "../../utilities/Data/RenderConnect";

export async function POST(req:Request) {

  try {
    const {email} = await req.json();
    const client = db.connect();

    
    const query = {
      text: "SELECT email from users where email = ($1)",
      values: [email]
    }
    const response = client.query(query);
    const data = response.rows[0];

    if(data){
      const token = signJwtAccessToken(data.email, {expiresIn:'2h'});
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