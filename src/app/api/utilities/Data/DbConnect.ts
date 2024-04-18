import { Database } from "@/types/database.types";
import {createClient} from "@supabase/supabase-js"
// import { pool } from "./RenderConnect";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient<Database>(url!, anon_key!);


// pool.connect((err, client, release) => {
//     if (err) {
//         console.log("errorrrrrrr");
//       return console.error("Error acquiring client", err.stack);
//     }
//     client.query("SELECT NOW()", (err, result) => {
//       release();
//       if (err) {
//         return console.error("Error executing query", err.stack);
//       }
//       console.log("Connected to Database !");
//     });
//   });