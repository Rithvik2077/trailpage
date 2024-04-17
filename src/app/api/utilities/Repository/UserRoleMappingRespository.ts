import { Database } from "@/types/database.types";

import { db } from "../Data/RenderConnect";

type UserRoleInsert = Database["public"]["Tables"]["UserRoleMapping"]["Insert"];
const table = "userrole_mapping";

// type UserRoleInsert = {
//     can_create_survey?: boolean;
//     group_id?: number;
//     id?: number;
//     role_id?: number;
//     sub_category_id?: number;
//     user_id?: number;
// }

export async function AddUserRoleMapping(UserRole: UserRoleInsert){
    try{
        const client = await db.connect();
        const query = {
            text: "insert into userrole_mapiing (user_id, role_id, group_id, category_id, can_create_survey) values ($1, $2, $3, $4, $5)",
            values: [UserRole.user_id, UserRole.role_id, UserRole.group_id, UserRole.sub_category_id, UserRole.can_create_survey]
        }
        const result = client.query(query);
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            data: {rowCount: result.rowCount}
        };
    }catch(error) {
        return {
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

export async function GetRowByCategory(sub_category_id: number) {
    try {
        const client = await db.connect();
        const query = {
            text: 'select * from ($1) where category_id = ($2)',
            values: [table, sub_category_id]
        }
        const result = await client.query(query);
        // const result = await supabase.from(table).select().eq("sub_category_id", sub_category_id);
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            data: {rowCount: result.rowCount}
        };
    }catch(error) {
        return {
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

export async function GetRowByuserId(id: number) {
    try {
        const client = await db.connect();
        const query = {
            text: 'select * from ($1) where user_id = ($2)',
            values: [table, id]
        }
        const result = await client.query(query);
        // const result = await supabase.from(table).select().eq("sub_category_id", sub_category_id);
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            data: {rowCount: result.rowCount}
        };
    }catch(error) {
        return {
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}