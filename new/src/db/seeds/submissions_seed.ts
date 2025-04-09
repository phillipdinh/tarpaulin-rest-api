import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
	await knex("submissions").del();

	await knex("submissions").insert([
		{
			id: 1,
			assignmentID: 1,
			studentID: 3,
			timestamp: "2023-03-14T16:20:00",
			grade: 94,
		},
		{
			id: 2,
			assignmentID: 2,
			studentID: 3,
			timestamp: "2023-03-21T14:15:00",
			grade: 74,
		},
		{
			id: 3,
			assignmentID: 3,
			studentID: 3,
			timestamp: "2023-03-28T18:10:00",
			grade: 61,
		},
		{
			id: 4,
			assignmentID: 1,
			studentID: 4,
			timestamp: "2023-03-15T10:00:00",
			grade: 77,
		},
		{
			id: 5,
			assignmentID: 2,
			studentID: 4,
			timestamp: "2023-03-22T11:30:00",
			grade: 53,
		},
		{
			id: 6,
			assignmentID: 3,
			studentID: 4,
			timestamp: "2023-03-29T13:45:00",
			grade: 80,
		},
		{
			id: 7,
			assignmentID: 1,
			studentID: 5,
			timestamp: "2023-03-16T09:10:00",
			grade: 54,
		},
		{
			id: 8,
			assignmentID: 2,
			studentID: 5,
			timestamp: "2023-03-23T10:20:00",
			grade: 74,
		},
		{
			id: 9,
			assignmentID: 3,
			studentID: 5,
			timestamp: "2023-03-30T12:00:00",
			grade: 75,
		},
		{
			id: 10,
			assignmentID: 1,
			studentID: 6,
			timestamp: "2023-03-17T14:30:00",
			grade: 51,
		},
		{
			id: 11,
			assignmentID: 2,
			studentID: 6,
			timestamp: "2023-03-24T16:50:00",
			grade: 67,
		},
		{
			id: 12,
			assignmentID: 3,
			studentID: 6,
			timestamp: "2023-03-31T18:15:00",
			grade: 83,
		},
	]);
}
