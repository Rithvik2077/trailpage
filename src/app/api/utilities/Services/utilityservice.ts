import { GetAllUsers } from "../Repository/UserRepository";

export async function getUsers() {
    try {
        const response = await GetAllUsers();
        return response;
    }catch (error) {
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}