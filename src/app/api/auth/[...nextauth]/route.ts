

import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { compare } from "bcrypt";

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);


const providers = [

Google({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!
}),
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      email: { label: "Email", type: "email"},
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      // Add logic here to look up the user from the credentials supplied

  
    let { data, error } = await supabase
    .from('User')
    .select('id, user_name, email, password')
    .eq('email', credentials.email);
    
    const user = data[0];

    const passwordCorrect = await compare(credentials?.password || '' , user.password);

    // console.log('is pwd crt: ', passwordCorrect);

    if(passwordCorrect){
      return user
    } else{

      return null;
    }

    }
  })
]



const handler = NextAuth({
  // secret: process.env.NEXTAUTH_SECRET,
  session:{
    strategy: 'jwt'
  },
  providers
});

export { handler as GET,  handler as POST};



