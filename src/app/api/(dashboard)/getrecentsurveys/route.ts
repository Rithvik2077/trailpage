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


  
}