import { verifyJwt } from "@/app/lib/jwt";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { constrainedMemory } from "process";



export function GET(req: NextRequest){

const token = cookies().get('Authorize')

const decoded = verifyJwt(token.value)

return NextResponse.json(decoded)
}

