import { db } from "../../utilities/Data/RenderConnect";


export async function GET(req: Request) {
  const client = await db.connect();

  const query = {
    text: `
    SELECT 
    f.id, 
    f.title,
    f.description,
    f.createdat,
    COALESCE(u.username, 'Anonymous') AS username
FROM 
    feedbacks AS f
LEFT JOIN 
    users AS u ON f.createdby = u.id
ORDER BY 
    f.createdat DESC;
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
