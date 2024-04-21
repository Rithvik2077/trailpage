import { NextRequest, NextResponse } from "next/server";
import { GetTickets_user } from "../../utilities/Services/TicketService";
import { Requests } from "@/types/Dto";
import {
  validateAndAuthorizeToken,
  GetPayloadDetails,
} from "../../utilities/helpers/tokenHelper";
import { Cookie } from "next/font/google";
import { cookies } from "next/headers";

type Dto = Requests["UserTicket"];
export async function GET(req: NextRequest) {
  const auth = cookies().get("Authorize");
  console.log("AUTH", auth);
  const token = auth.value;
  const isValid = validateAndAuthorizeToken(token, "any");
  if (isValid) {
    const url = new URL(req.url);
    const options = {
      status: url.searchParams.get("status")
        ? parseInt(url.searchParams.get("status"))
        : 0,
      sub_category: url.searchParams.get("sub_category")
        ? parseInt(url.searchParams.get("sub_category"))
        : 0,
      group: url.searchParams.get("group")
        ? parseInt(url.searchParams.get("group"))
        : 0,
      priority: url.searchParams.get("priority")
        ? parseInt(url.searchParams.get("priorty"))
        : 0,
      closed_by: url.searchParams.get("closed_by")
        ? parseInt(url.searchParams.get("closed_by"))
        : 0,
    };
    const dto: Dto = {
      user_id: 0,
      options: options,
    };
    if (!dto) {
      return NextResponse.json(
        { Response: { stats: 400, statusText: "Body is empty", data: null } },
        { status: 400 },
      );
    }
    if (validateDto(dto)) {
      const id = GetPayloadDetails(token, "id");
      const role = GetPayloadDetails(token, "role");
      let user_id;
      if (role.toLocaleLowerCase() != "admin") {
        user_id = id;
      } else {
        user_id = dto.user_id ? dto.user_id : id;
      }
      const result = await GetTickets_user(user_id, dto.options);
      return NextResponse.json({ Response: result }, { status: result.status });
    } else {
      return NextResponse.json(
        {
          Response: {
            status: 400,
            statusText: "One or many body parameters are invalid",
            data: null,
          },
        },
        { status: 400 },
      );
    }
  } else {
    return NextResponse.json(
      { Response: { status: 401, statusText: "Unathorized", data: null } },
      { status: 401 },
    );
  }
}

function validateDto(obj: any): obj is Dto {
  // console.log(obj);
  if (!obj.options || typeof obj.options !== "object") return false;

  const { status, sub_category, group, priority, closed_by } = obj.options;
  console.log(status, sub_category, group, priority, closed_by);
  if (
    typeof status !== "number" ||
    typeof sub_category !== "number" ||
    typeof group !== "number" ||
    typeof priority !== "number" ||
    typeof closed_by !== "number"
  ) {
    return false;
  }

  return true;
}
