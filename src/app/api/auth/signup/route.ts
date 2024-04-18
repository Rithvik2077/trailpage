import { NextResponse } from "next/server";
import { hash } from "bcrypt";

import { Database } from '../../../../types/database.types'
import { error } from "console";

import { db } from "../../utilities/Data/RenderConnect";


export async function POST(req: Request) {
  try {
    const client = await db.connect();
    const { name, email, password} = await req.json();
    if(!email || !password|| !name){
      throw error('Input all the required fields')
    } else if( password.length <8 ){
      throw error('password must be of 8 characters')
    } else{
      const hashedPassword = await hash(password,10);
      // const response = await supabase
      // .from('User').insert({user_name: name, email:email, password: hashedPassword})
      try {
        await client.query("BEGIN");
        const query_user = {
          text: 'INSERT INTO users (username, email, password) values ($1, $2, $3) RETURNING id',
          values: [name, email, hashedPassword]
        }
        const user_response = await client.query(query_user);
        console.log(user_response);
        const user_id = user_response.rows[0].id;

        // ******************************************************************************************
        const role_data = await client.query({text: 'select id from roles where rolename = ($1)', values: ["user"]});
        const role_id = role_data.rows[0].id;
        // ******************************************************************************************

        const query_mapping = {
          text: 'insert into userrole_mapping (user_id, role_id) values ($1, $2)',
          values: [user_id, role_id],
        };
        await client.query(query_mapping)
        await client.query("COMMIT");
        client.end();
      }catch(err) {
        await client.query("ROLLBACK");
        client.release();
        console.log(err);
        return NextResponse.json({message: "Error with client", error_message: err.message}, {status: 500});
      }
    }
    return NextResponse.json({ message: 'success' }, { status: 200 })
   } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'some error' }, { status: 400 })
  }

}
