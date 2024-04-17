import { NextResponse } from "next/server";
import {GetAllTickets, GetUserActiveTickets, GetUserTickets, AddTicket} from "../../utilities/Repository/TicketsRepository";

export async function GET(req: Request) {
    return NextResponse.json({message: "check db"});
}

// const tickets = [
//   {
//     "sub_category_id": 3,
//     "priority": 1,
//     "title": "Network Connectivity",
//     "description": "Unable to connect to the server",
//     "status_id": 1,
//     "created_by": 23,
//     "created_at": "2024-03-15T08:45:00Z",
//     "closed_by": 24,
//     "closed_at": "2024-03-17T10:30:00Z",
//     "assigned_to": 20
//   },
//   {
//     "sub_category_id": 8,
//     "priority": 2,
//     "title": "Software Bug",
//     "description": "Application crashing frequently",
//     "status_id": 2,
//     "created_by": 22,
//     "created_at": "2024-03-16T14:20:00Z",
//     "closed_by": null,
//     "closed_at": null,
//     "assigned_to": null
//   },
//   {
//     "sub_category_id": 12,
//     "priority": 3,
//     "title": "Hardware Failure",
//     "description": "Printer not responding",
//     "status_id": 3,
//     "created_by": 21,
//     "created_at": "2024-03-17T11:55:00Z",
//     "closed_by": null,
//     "closed_at": null,
//     "assigned_to": 25
//   },
//   {
//     "sub_category_id": 5,
//     "priority": 1,
//     "title": "Database Error",
//     "description": "Data inconsistency observed",
//     "status_id": 1,
//     "created_by": 19,
//     "created_at": "2024-03-18T09:10:00Z",
//     "closed_by": null,
//     "closed_at": null,
//     "assigned_to": null
//   },
//   {
//     "sub_category_id": 10,
//     "priority": 2,
//     "title": "Application Upgrade",
//     "description": "Request for software update",
//     "status_id": 3,
//     "created_by": 24,
//     "created_at": "2024-03-19T16:45:00Z",
//     "closed_by": null,
//     "closed_at": null,
//     "assigned_to": 21
//   },
//   {
//     "sub_category_id": 7,
//     "priority": 1,
//     "title": "Email Delivery Issue",
//     "description": "Customers not receiving emails",
//     "status_id": 1,
//     "created_by": 25,
//     "created_at": "2024-03-20T11:30:00Z",
//     "closed_by": null,
//     "closed_at": null,
//     "assigned_to": 22
//   },
//   {
//     "sub_category_id": 15,
//     "priority": 3,
//     "title": "Website Performance",
//     "description": "Website loading slowly",
//     "status_id": 2,
//     "created_by": 23,
//     "created_at": "2024-03-21T13:20:00Z",
//     "closed_by": 24,
//     "closed_at": "2024-03-23T09:45:00Z",
//     "assigned_to": null
//   },
//   {
//     "sub_category_id": 2,
//     "priority": 2,
//     "title": "Account Access Issue",
//     "description": "Unable to log in to the account",
//     "status_id": 1,
//     "created_by": 20,
//     "created_at": "2024-03-22T16:55:00Z",
//     "closed_by": null,
//     "closed_at": null,
//     "assigned_to": null
//   },
//   {
//     "sub_category_id": 11,
//     "priority": 1,
//     "title": "Data Loss",
//     "description": "Critical data loss detected",
//     "status_id": 3,
//     "created_by": 24,
//     "created_at": "2024-03-23T09:10:00Z",
//     "closed_by": null,
//     "closed_at": null,
//     "assigned_to": 21
//   },
//   {
//     "sub_category_id": 4,
//     "priority": 3,
//     "title": "Payment Gateway Issue",
//     "description": "Payments not processing successfully",
//     "status_id": 1,
//     "created_by": 19,
//     "created_at": "2024-03-24T14:30:00Z",
//     "closed_by": null,
//     "closed_at": null,
//     "assigned_to": null
//   },
//   {
//     "sub_category_id": 9,
//     "priority": 2,
//     "title": "Mobile App Crash",
//     "description": "Mobile app crashing on startup",
//     "status_id": 2,
//     "created_by": 22,
//     "created_at": "2024-03-25T08:20:00Z",
//     "closed_by": 23,
//     "closed_at": "2024-03-27T11:15:00Z",
//     "assigned_to": null
//   },
//   {
//     "sub_category_id": 6,
//     "priority": 1,
//     "title": "Security Breach",
//     "description": "Unauthorized access detected",
//     "status_id": 3,
//     "created_by": 21,
//     "created_at": "2024-03-26T10:45:00Z",
//     "closed_by": null,
//     "closed_at": null,
//     "assigned_to": 25
//   },
//   {
//     "sub_category_id": 14,
//     "priority": 2,
//     "title": "Product Feature Request",
//     "description": "Requesting new feature implementation",
//     "status_id": 1,
//     "created_by": 23,
//     "created_at": "2024-03-27T15:30:00Z",
//     "closed_by": null,
//     "closed_at": null,
//     "assigned_to": null
//   },
//   {
//     "sub_category_id": 1,
//     "priority": 3,
//     "title": "Hardware Upgrade",
//     "description": "Request for hardware replacement",
//     "status_id": 2,
//     "created_by": 20,
//     "created_at": "2024-03-28T09:50:00Z",
//     "closed_by": 22,
//     "closed_at": "2024-03-30T14:20:00Z",
//     "assigned_to": null
//   },
//   {
//     "sub_category_id": 13,
//     "priority": 1,
//     "title": "Network Security Issue",
//     "description": "Potential security threat identified",
//     "status_id": 3,
//     "created_by": 25,
//     "created_at": "2024-03-29T12:15:00Z",
//     "closed_by": null,
//     "closed_at": null,
//     "assigned_to": 21
//   },
//   {
//     "sub_category_id": 3,
//     "priority": 2,
//     "title": "Email Configuration Issue",
//     "description": "Unable to configure email settings",
//     "status_id": 1,
//     "created_by": 22,
//     "created_at": "2024-03-30T16:40:00Z",
//     "closed_by": null,
//     "closed_at": null,
//     "assigned_to": null
//   },
//   {
//     "sub_category_id": 8,
//     "priority": 3,
//     "title": "Software Installation Problem",
//     "description": "Facing issues with software installation",
//     "status_id": 2,
//     "created_by": 19,
//     "created_at": "2024-03-31T09:25:00Z",
//     "closed_by": 21,
//     "closed_at": "2024-04-01T13:55:00Z",
//     "assigned_to": null
//   },
//   {
//     "sub_category_id": 12,
//     "priority": 1,
//     "title": "Printer Jam",
//     "description": "Paper jammed in the printer",
//     "status_id": 3,
//     "created_by": 21,
//     "created_at": "2024-04-01T10:20:00Z",
//     "closed_by": null,
//     "closed_at": null,
//     "assigned_to": 25
//   },
//   {
//     "sub_category_id": 5,
//     "priority": 2,
//     "title": "Database Performance Issue",
//     "description": "Database queries running slow",
//     "status_id": 1,
//     "created_by": 24,
//     "created_at": "2024-04-02T14:50:00Z",
//     "closed_by": null,
//     "closed_at": null,
//     "assigned_to": null
//   },
//   {
//     "sub_category_id": 10,
//     "priority": 3,
//     "title": "Application Error",
//     "description": "Encountering unexpected errors in the application",
//     "status_id": 2,
//     "created_by": 23,
//     "created_at": "2024-04-03T11:35:00Z",
//     "closed_by": 22,
//     "closed_at": "2024-04-05T10:10:00Z",
//     "assigned_to": null
//   }
// ];