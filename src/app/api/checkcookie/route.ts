import { signJwtAccessToken, verifyJwt } from "@/app/lib/jwt";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { constrainedMemory } from "process";



export function GET(req: NextRequest){

const token = cookies().get('Authorize')

const decoded = verifyJwt(token.value)

const out = {ni :'jijokil'}

// const newtoken = signJwtAccessToken(out, {expiresIn: "2hr"})

// console.log(newtoken);

return NextResponse.json(decoded)
}

