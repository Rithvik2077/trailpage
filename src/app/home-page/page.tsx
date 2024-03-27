import { getServerSession } from "next-auth";
import Logout from "./logout";
import { useSession } from "next-auth/react";

export default async function Home() {
  const session = await getServerSession();
  console.log(session);
  return (
    <div>
      <div>
        <div>HOME</div>
      </div>
      {!!session && <Logout />}
      {!session && (
        <div>
          <div>not signed in</div>
        </div>
      )}
    </div>
  );
}
