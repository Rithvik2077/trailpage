
export async function getSurveys () {
  try {
    const { data, error } = await supabase.from('survey').select('*')

    if (error) {
      console.error('Error fetching surveys:', error.message)
      return
    }

    if (data) {
      return data
    }

    // console.log('Surveys:', data)
  } catch (error: any) {
    console.error('Error fetching surveys:', error.message)
  }
}
