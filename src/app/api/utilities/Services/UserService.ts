import { GetAllUsers } from "../Repository/UserRepository";
import { GetAllRoles } from "../Repository/RoleRepository";
import { GetAllCategories } from "../Repository/CategoryRepository";
import { GetGroups } from "../Repository/GroupRepository";
import { UpdateUserRoleMapping } from "../Repository/UserRoleMappingRespository";

export async function getUsers(withRole?: boolean) {
    try {
        const response = await GetAllUsers(withRole);
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

export async function AddUserRole(UserRole) {
    try {
        const response = await UpdateUserRoleMapping(UserRole);
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

export async function getFormData() {
    try {
        const roles = await GetAllRoles();
        const groups = await GetGroups();
        const categories = await GetAllCategories();
        // console.log(roles);
        return {
            status: 200,
            statusText: "ok",
            result: {
                roles: roles.result,
                groups: groups.result,
                categories: categories.result,
            }
        }
    } catch (error) {
        return {
            error: error,
            status: 500,
            statusText: "Internal server error",
            message: error.message,
            data: null,
        }
    }
}