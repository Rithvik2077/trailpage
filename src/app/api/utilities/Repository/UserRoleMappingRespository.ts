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
    const client = await db.connect();
    try{
        const query = {
            text: "insert into userrole_mapiing (user_id, role_id, group_id, category_id, can_create_survey) values ($1, $2, $3, $4, $5)",
            values: [UserRole.user_id, UserRole.role_id, UserRole.group_id, UserRole.sub_category_id, UserRole.can_create_survey]
        }
        const result = client.query(query);
        client.end();
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: {rowCount: result.rowCount}
        };
    }catch(error) {
        client.end();
        return {
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
            error: error,
        }
    }
}

export async function GetRowByCategory(sub_category_id: number) {
    const client = await db.connect();
    try {
        const query = {
            text: 'select * from userrole_mapping where category_id = ($1)',
            values: [sub_category_id]
        }
        const result = await client.query(query);
        client.end();
        // const result = await supabase.from(table).select().eq("sub_category_id", sub_category_id);
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result.rows,
        };
    }catch(error) {
        client.end();
        return {
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
            error: error,
        }
    }
}

export async function GetRowByuserId(id: number) {
    const client = await db.connect();
    try {
        const query = {
            text: 'select * from userrole_mapping where user_id = ($1)',
            values: [id]
        }
        const result = await client.query(query);
        client.end();
        // const result = await supabase.from(table).select().eq("sub_category_id", sub_category_id);
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result.rows
        };
    }catch(error) {
        client.end();
        return {
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
            error: error,
        }
    }
}

export async function GetRoleNameByUserId(user_id: number) {
    const client = await db.connect();
    try {
        const query = {
            text: "select r.rolename from userrole_mapping ur join roles r on r.id = ur.role_id where ur.user_id = $1",
            values: [user_id]
        }
        // console.log(query);
        const result = await client.query(query);
        // console.log(result);
        client.end();
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result.rows
        };
    }catch(error) {
        client.end();
        return {
            error: error,
            message: error.message,
            status: 500,
            statusText: "Internal server error",
            data: null,
        }
    }
}