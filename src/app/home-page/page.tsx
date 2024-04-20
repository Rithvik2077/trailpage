import Logout from "./logout";
import { cookies } from "next/headers";
import { verifyJwt } from "@/app/lib/jwt";

export default async function Home() {
  const token = cookies().get("Authorize");
  const decoded = verifyJwt(token.value);
  let session: boolean;
  // localStorage.setItem("token", token.value);
  if (decoded) {
    session = true;
  }
  return (
    <div>
      <div>
        <div>HOME</div>
      </div>
      {session && <Logout />}
      {!session && (
        <div>
          <div>not signed in</div>
        </div>
      )}
    </div>
  );
}
