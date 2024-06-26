import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateAndAuthorizeToken } from "@/app/api/utilities/helpers/tokenHelper";
import { AddUserRole } from "@/app/api/utilities/Services/UserService";

// responses of a survey given id
export async function POST(req: NextRequest) {
    const auth = cookies().get('Authorize');
    const token = auth.value;
    
    const res = validateAndAuthorizeToken(token, "admin");
    if(res) {
        try{
            const newMapping = await req.json();
            console.log(newMapping);
            const response = await AddUserRole(newMapping);
            return NextResponse.json({Response: response}, {status: response.status});
        }catch(error){
            return NextResponse.json({status: 400, statusText: error}, {status:400});
        }
    }
    return NextResponse.json({status: 401, statusText: "Unathorized", data: null}, {status: 401});
}