import { db } from "../../utilities/Data/RenderConnect";


export async function GET(req: Request) {
  const client = await db.connect();

  const query = {
    text: `
    select count (*) as totalcount, (select count(*) from surveyresponses) as total_responses  
    from surveys
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
