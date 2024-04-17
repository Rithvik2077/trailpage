import { NextResponse } from "next/server";
import { hash } from "bcrypt";

import { Database } from '../../../../types/database.types'
import { error } from "console";



import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)


export async function POST(req: Request) {
  try {
    const { name, email, password} = await req.json();
    if(!email || !password|| !name){
      throw error('Input all the required fields')
    } else if( password.length <=8 ){
      throw error('password must be of 8 characters')
    } else{
      const hashedPassword = await hash(password,10);
      const response = await supabase
      .from('User').insert({user_name: name, email:email, password: hashedPassword})
    }
    return NextResponse.json({ message: 'success' }, { status: 200 })

   } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'some error' }, { status: 400 })
  }

}
