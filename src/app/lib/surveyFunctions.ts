import React from 'react'

const base_url = 'http://localhost:3000/api'
const url_create_survey_url = `${base_url}/survey/admin/createsurvey`
const url_get_active_surveys = `${base_url}/survey/getactivesurveys`
const url_add_response = `${base_url}/survey/addresponse`
const url_get_survey_responses = `${base_url}/survey/getresponses?id=`
// const add_response

const getAllSurveys = async (token: string) => {} //admin can see all surveys

export const getActiveSurveys = async () => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  return await fetch(url_get_active_surveys, {
    method: 'GET',
    headers: headers
  })
    .then(res => {
      if (res.ok) return res.json()
      else throw new Error('Request failed with status code ' + res.status)
    })
    .then(data => {
      return data.result
    })
    .catch(err => {
      console.log('err', err)
    })
}

export const createSurvey = async (data: JSON) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  return await fetch(url_create_survey_url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })
    .then(res => {
      if (res.ok) return res.json()
      else throw new Error('Request failed with status code ' + res.status)
    })
    .then(data => {
      return data
    })
    .catch(err => {
      console.log('err', err)
    })
}

export const addResponse = async (data: JSON) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  return await fetch(url_add_response, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })
    .then(res => {
      if (res.ok) return res.json()
      else throw new Error('Request failed with status code ' + res.status)
    })
    .then(data => {
      return data
    })
    .catch(err => {
      console.log('err', err)
    })
}

export const getSurveyResponses = async (id: number) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json')
  const url = url_get_survey_responses+"id";
  return await fetch(url, {
    method: 'GET',
    headers: headers
  })
  .then(res => {
    if (res.ok) return res.json()
    else throw new Error('Request failed with status code ' + res.status)
  })
  .then(data => {
    return data.result
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
