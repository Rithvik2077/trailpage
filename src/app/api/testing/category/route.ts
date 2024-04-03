import { NextResponse } from "next/server";
import {GetAllCategories, GetAllCategoriesByGroup} from "../../utilities/Repository/CategoryRepository"
// Insert: {
//     group_id: number
//     id?: number
//     name: string
//   }

// const categories = [
//     {
//         group_id: 2,
//         name: "Attendance Query",
//     },
//     {
//         group_id: 2,
//         name: "Appointment Letter Request",
//     },
//     {
//         group_id: 2,
//         name: "Bio-Metric Access",
//     },
//     {
//         group_id: 2,
//         name: "Leave Query",
//     },
//     {
//         group_id: 2,
//         name: "Salary Related Query",
//     },
//     {
//         group_id: 5,
//         name: "Antivirus",
//     },
//     {
//         group_id: 5,
//         name: "Connectivity",
//     },
//     {
//         group_id: 5,
//         name: "Printer",
//     },
//     {
//         group_id: 5,
//         name: "Software",
//     },
//     {
//         group_id: 5,
//         name: "Computer Hardware",
//     },
//     {
//         group_id: 6,
//         name: "Admin Grievance",
//     },
//     {
//         group_id: 6,
//         name: "Cafeteria",
//     },
//     {
//         group_id: 6,
//         name: "Meeting Room",
//     },
//     {
//         group_id: 6,
//         name: "Transportation Request",
//     },
//     {
//         group_id: 6,
//         name: "Client Visit",
//     }
// ]

export async function GET(req: Request){
    // try{
    //     const result = await GetAllCategories();
    //     return NextResponse.json({data: result.data});
    // }catch(error){
    //     return NextResponse.json({error: error});
    // }

    try{
        const result = await GetAllCategoriesByGroup(5);
        return NextResponse.json({data: result.data});
    }catch(error){
        return NextResponse.json({error: error});
    }
}