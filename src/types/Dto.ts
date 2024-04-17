import { Json } from "./database.types";
export type Tables = {
    Ticket: {
        sub_category_id: number,
        priority: number,
        title: string,
        description: string,
        created_by: number,
    },
    Feedback: {
        title: string,
        feedback: string,
        created_by: number | null,
    },
    Survey: {
        title: string,
        survey_fields: Json;
        created_by: number,
        closes_at: string
    },
    SurveyResponse: {
        user_id: number,
        survey_id: number,
        response_data: Json
    }
}

export type Requests = {
    UserTicket: {
        user_id: number,
        options: Options["TicketOptions"];
    }
}

export type Options = {
    TicketOptions: {
        status: number,
        sub_category: number,
        group: number,
        priorty: number,
        closed_by: number,
    }
}
