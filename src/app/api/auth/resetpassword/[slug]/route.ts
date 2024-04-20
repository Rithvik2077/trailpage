
export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug // 'a', 'b', or 'c'

  console.log(slug);

  const data  = await request.json();
  console.log(data);


  return new Response(JSON.stringify({message:slug})
  ,{
    status:200
  }
  )

}