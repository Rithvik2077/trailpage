import { verifyJwt } from "lib/jwt";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { constrainedMemory } from "process";



export function GET(req: NextRequest){

const token =cookies().get('jwtToken')

const decoded = verifyJwt(token.value)

return NextResponse.json(JSON.stringify({message:"success"}))
}

