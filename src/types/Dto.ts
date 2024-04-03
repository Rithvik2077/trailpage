export type Tables = {
    Ticket: {
        sub_category_id: number,
        priority: number,
        description: string,
    },
}

export type Options = {
    TicketOptions: {
        status: string,
        sub_category: number,
        group: number,
        priorty: number,
    }
}