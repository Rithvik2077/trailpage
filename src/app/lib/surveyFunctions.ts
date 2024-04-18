import React from 'react'

const base_url = 'http://localhost:3000/api'
const create_survey_url = `${base_url}/survey/admin/createsurvey`
const get_active_surveys = `${base_url}/survey/getactivesurveys`
// const add_response

const getAllSurveys = () => {} //admin can see all surveys

export const getActiveSurveys = async (token: string) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', token)
  return await fetch(get_active_surveys, {
    method: 'GET',
    headers: headers
  })
    .then(res => {
      if (res.ok) return res.json()
      else throw new Error('Request failed with status code ' + res.status)
    })
    .then(data => {
      return data.Response
    })
    .catch(err => {
      console.log('err', err)
    })
}

export const createSurvey = async (token: string, data: JSON) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', token)

  return await fetch(create_survey_url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })
    .then(res => {
      if (res.ok) return res.json()
      else throw new Error('Request failed with status code ' + res.status)
    })
    .then(data => {
      return data.Response
    })
    .catch(err => {
      console.log('err', err)
    })
}

// {
//     "title": "first 8",
//     "survey_fields": [{"h": "p"}, {"j": "k"}, {"a": "m"}],
//     "created_by": 20,
//     "closes_at": "2024-03-10T21:00:00"
// }
