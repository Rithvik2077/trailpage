
import { db } from "../../utilities/Data/RenderConnect";


export async function GET(req: Request) {

  const client = await db.connect();
  
  const query = {
    text:`
    SELECT 
    TO_CHAR(createdat, 'Month YYYY') AS month,
    COUNT(*) AS total_feedbacks
FROM 
    feedbacks
GROUP BY 
    TO_CHAR(createdat, 'Month YYYY')
ORDER BY 
    MIN(createdat);
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