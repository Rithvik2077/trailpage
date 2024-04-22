import { db } from "../../utilities/Data/RenderConnect";

export async function GET(req: Request) {
  const client = await db.connect();

  const query = {
    text: `
    SELECT tk.id,tk.title, tk.description, c.categoryname, tp.name AS priority, ts.name AS status, tk.createdat
FROM tickets AS tk
JOIN category AS c ON tk.subcategory_id = c.id
JOIN ticketpriority AS tp ON tk.priority = tp.id
JOIN ticketstatus AS ts ON tk.status = ts.id
ORDER BY tk.createdat DESC;
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
