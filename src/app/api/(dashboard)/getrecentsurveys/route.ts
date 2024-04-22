import { db } from "../../utilities/Data/RenderConnect";

export async function GET(req: Request) {
  const client = await db.connect();

  const query = {
    text: `
    SELECT s.id AS survey_id, 
    s.title AS survey_title,
    s.createdat AS created_at,
    u.username AS creator_name,
    COUNT(sr.id) AS total_responses
    FROM surveys s
    LEFT JOIN surveyresponses sr ON s.id = sr.survey_id
    LEFT JOIN users u ON s.createdby = u.id
    GROUP BY s.id, s.title, s.createdat, u.username
    ORDER BY s.id DESC;
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
