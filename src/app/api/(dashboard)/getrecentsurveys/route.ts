import { db } from "../../utilities/Data/RenderConnect";

export async function GET(req: Request) {
  const client = await db.connect();

  const query = {
    text: `
    SELECT s.id, s.title, s.createdat,u.username
    FROM public.surveys AS s
    JOIN users AS u on s.createdby =u.id
    ORDER BY s.id DESC
    LIMIT 10;
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
