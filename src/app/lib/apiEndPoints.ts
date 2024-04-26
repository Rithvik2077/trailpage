export const base_url = 'http://localhost:3000/api'

export const url_create_survey = `/api/survey/admin/createsurvey`
export const url_get_active_surveys = `/api/survey/getactivesurveys`
export const url_add_response = `/api/survey/addresponse`
export const url_get_survey_responses = `/api/survey/getresponses?id=`
export const url_get_survey_by_id = `/api/survey/getsurvey?id=`
export const url_get_response_by_id = `/api/survey/admin/getresponsebyid?id=`
export const url_add_feedback = `/api/feedbacks/addfeedback`
export const url_get_feedbacks = `/api/feedbacks/admin/getfeedbacks`
export const url_mark_feedback_viewed = `/api/feedbacks/admin/markviewed?id=`
export const url_user_feedbacks = `/api/feedbacks/getfeedbacks`
export const url_get_users = `/api/users/admin/getallusers?withRole=`
export const url_get_users_form_data = `api/users/admin/getformdata`
export const url_update_userrolemapping = `api/users/admin/updateuserrole`