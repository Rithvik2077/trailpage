'use server'

import { revalidatePath } from "next/cache"

export const revalidateSurveyList = async ()=>{
    revalidatePath('/api/getrecentsurveys');
}