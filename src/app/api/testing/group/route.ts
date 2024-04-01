import { NextResponse } from "next/server";
import { AddGroupAsync } from "../../utilities/Repository/GroupRepository"



export function GET(req: Request){
    const cat = {
        name: "IT"
    }

    // const res = AddGroupAsync(cat);
    return NextResponse.json({data: "res"});
}