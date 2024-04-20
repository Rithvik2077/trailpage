import { Database } from "@/types/database.types";
import {supabase} from "../Data/DbConnect";
import { db } from "../Data/RenderConnect";

type Insert = Database["public"]["Tables"]["Category"]["Insert"]

export async function AddCategory(category: Insert) {
    const client = await db.connect();
    try{
        const query = {
            text: "Insert into category (categoryname, group_id) values ($1, $2)",
            values: [category.name, category.group_id]
        }
        const result = await client.query(query);
        client.end();
        return {
            status: 200,
            statusText: `${result.command} completed successfully`,
            result: result
        };
    }catch(error) {
        client.end();
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

export async function GetAllCategories() {
    const client = await db.connect();
    try{
        const query = {
            text: "select * from category",
        }
        const result = await client.query(query);
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
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}

export async function GetAllCategoriesByGroup(id: number){
    const client = await db.connect();
    try{
        const query = {
            text: "select * from category where group_id = $1",
            values: [id]
        }
        const result = await client.query(query);
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
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}