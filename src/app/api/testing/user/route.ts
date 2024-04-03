import { NextResponse } from "next/server";
import {AddUserAsync} from "../../utilities/Repository/UserRepository";

export function GET(req: Request){
    console.log("#################################################################");
    const dummyUsers = [
        {
            email: 'john.doe@example.com',
            is_active: true,
            password: 'p@ssw0rd1!',
            updated_at: '2024-03-28T12:00:00Z',
            user_name: 'johndoe'
        },
        {
            email: 'alice.smith@example.com',
            is_active: true,
            password: 'SecurePass123',
            updated_at: '2024-03-28T12:00:00Z',
            user_name: 'alicesmith'
        },
        {
            email: 'mark.jackson@example.com',
            is_active: true,
            password: 'M4rkJ@cks0n',
            updated_at: '2024-03-28T12:00:00Z',
            user_name: 'markjackson'
        },
        {
            email: 'sara.wilson@example.com',
            is_active: true,
            password: 'StrongP@ss!23',
            updated_at: '2024-03-28T12:00:00Z',
            user_name: 'sarawilson'
        },
        {
            email: 'chris.brown@example.com',
            is_active: true,
            password: 'BrownyC@123',
            updated_at: '2024-03-28T12:00:00Z',
            user_name: 'chrisbrown'
        }
    ];    

   dummyUsers.forEach(user => AddUserAsync(user).then(result => {
    console.log(result);
   }));
   return NextResponse.json({message: "ok! check console"});
}


// import {AddTicketAsync} from "../utilities/Repository/UserRepository";
// export function GET(req: Request) {
//     const ticket = {
//         assigned_to: 1, // Example assigned_to value
//         closed_at: null,
//         closed_by: null,
//         created_at: "2024-03-28T12:00:00Z", // Example created_at value
//         created_by: 2, // Example created_by value
//         description: "Sample ticket description",
//         id: 1, // Example ticket ID
//         priority: "High",
//         status: "Open",
//         sub_category_id: 3, // Example sub_category_id value
//         title: "Sample Ticket"
//     };
//     const ans = AddTicketAsync(ticket);
//     console.log(ans);
//     return NextResponse.json({Message: ans});
// }