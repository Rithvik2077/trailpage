import { verify } from "crypto";
import { verifyJwt } from "lib/jwt";

export function validateAndAuthorizeToken(token: string, role: string){
    const res = verifyJwt(token);
    if(res){
        if(role === 'any' || res.role === role) return true;
        return false;
    }else {
        return false;
    }
}

export function GetPayloadDetails(token: string, entry: string) {
    const res = verifyJwt(token);
    if(res) {
        if(entry === 'id') return res.id;
        if(entry === 'name') return res.name;
        if(entry === 'email') return res.email;
        if(entry === 'role') return res.role;
        else return null;
    }
    return null;
}