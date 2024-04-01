import { Database } from "@/types/database.types";
import {createClient} from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient<Database>(url, anon_key);