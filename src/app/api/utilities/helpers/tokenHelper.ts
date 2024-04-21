import { verify } from "crypto";
import { verifyJwt } from "@/app/lib/jwt";

export function validateAndAuthorizeToken(token: string, role: string) {
  const res = verifyJwt(token);
  if (res) {
    if (
      role.toLocaleLowerCase() === "any" ||
      res.role.toLocaleLowerCase() === role.toLocaleLowerCase()
    ) {
      return true;
    }
    console.log("role mismatch");
    return false;
  } else {
    console.log("not valid");
    return false;
  }
}

export function GetPayloadDetails(
  token: string,
  entry: "id" | "name" | "email" | "role",
) {
  const res = verifyJwt(token);
  console.log("res", res);
  if (res) {
    if (entry.toLocaleLowerCase() === "id") return res.id;
    if (entry.toLocaleLowerCase() === "name") return res.name;
    if (entry.toLocaleLowerCase() === "email") return res.email;
    if (entry.toLocaleLowerCase() === "role") return res.role;
    else return null;
  }
  return null;
}
