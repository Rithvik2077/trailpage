


import { db } from "../../utilities/Data/RenderConnect";



export async function GET(req: Request) {

  const client = await db.connect();
  
  const query = {
    text:`
    SELECT
    category.categoryname AS subcategory_name,
    COUNT(CASE WHEN tickets.status = 1 THEN tickets.id END) AS open_tickets,
    COUNT(CASE WHEN tickets.status = 4 THEN tickets.id END) AS closed_tickets
FROM
    tickets
JOIN
    category ON tickets.subcategory_id = category.id
GROUP BY
    category.categoryname;
    `
  }

  
  const data = await client.query(query);
  client.end();
  // console.log(data)

  if(data.rowCount>0){
return new Response(JSON.stringify({data: data.rows}), {status:200})
  }else{
    return new Response(JSON.stringify({
      message: 'Something went wrong'
    }),{
      status:400,
    }
    )
  }

}