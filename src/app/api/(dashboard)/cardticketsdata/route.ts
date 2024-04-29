import { db } from "../../utilities/Data/RenderConnect";


export async function GET(req: Request) {
  const client = await db.connect();

  const query = {
    text: `
    SELECT count(*) as total_responses, (select count(*) from tickets) as totalcount
    FROM public.tickets
    where status =4
    `,
  };

  const data = await client.query(query);
  client.end();
  // console.log(data)

  if (data.rowCount > 0) {
    return new Response(JSON.stringify({ data: data.rows }), { status: 200 });
  } else {
    return new Response(
      JSON.stringify({
        message: "Something went wrong",
      }),
      {
        status: 400,
      },
    );
  }
}
