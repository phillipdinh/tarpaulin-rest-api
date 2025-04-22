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

		{
			id: 13,
			assignmentID: 1,
			studentID: 7,
			timestamp: "2023-04-01T09:00:00",
			grade: 88,
		},
		{
			id: 14,
			assignmentID: 1,
			studentID: 8,
			timestamp: "2023-04-01T09:30:00",
			grade: 72,
		},
		{
			id: 15,
			assignmentID: 1,
			studentID: 9,
			timestamp: "2023-04-01T10:00:00",
			grade: 65,
		},
		{
			id: 16,
			assignmentID: 1,
			studentID: 10,
			timestamp: "2023-04-01T10:30:00",
			grade: 91,
		},
		{
			id: 17,
			assignmentID: 1,
			studentID: 3,
			timestamp: "2023-04-01T11:00:00",
			grade: 85,
		},
		{
			id: 18,
			assignmentID: 1,
			studentID: 4,
			timestamp: "2023-04-01T11:30:00",
			grade: 78,
		},
		{
			id: 19,
			assignmentID: 1,
			studentID: 5,
			timestamp: "2023-04-01T12:00:00",
			grade: 92,
		},
		{
			id: 20,
			assignmentID: 1,
			studentID: 6,
			timestamp: "2023-04-01T12:30:00",
			grade: 69,
		},
		{
			id: 21,
			assignmentID: 1,
			studentID: 7,
			timestamp: "2023-04-01T13:00:00",
			grade: 83,
		},
		{
			id: 22,
			assignmentID: 1,
			studentID: 8,
			timestamp: "2023-04-01T13:30:00",
			grade: 76,
		},
		{
			id: 23,
			assignmentID: 1,
			studentID: 9,
			timestamp: "2023-04-01T14:00:00",
			grade: 90,
		},
		{
			id: 24,
			assignmentID: 4, // Assignment: Linear Algebra
			studentID: 3, // Student ID 3 (valid student)
			timestamp: "2023-04-02T09:00:00",
			grade: 88,
		},
		{
			id: 25,
			assignmentID: 4, // Assignment: Linear Algebra
			studentID: 4, // Student ID 4 (valid student)
			timestamp: "2023-04-02T09:30:00",
			grade: 80,
		},
		{
			id: 26,
			assignmentID: 4, // Assignment: Linear Algebra
			studentID: 5, // Student ID 5 (valid student)
			timestamp: "2023-04-02T10:00:00",
			grade: 92,
		},
		{
			id: 27,
			assignmentID: 4, // Assignment: Linear Algebra
			studentID: 6, // Student ID 6 (valid student)
			timestamp: "2023-04-02T10:30:00",
			grade: 70,
		},
		{
			id: 28,
			assignmentID: 5, // Assignment: Thermodynamics
			studentID: 7, // Student ID 7 (valid student)
			timestamp: "2023-04-02T11:00:00",
			grade: 75,
		},
		{
			id: 29,
			assignmentID: 5, // Assignment: Thermodynamics
			studentID: 8, // Student ID 8 (valid student)
			timestamp: "2023-04-02T11:30:00",
			grade: 80,
		},
		{
			id: 30,
			assignmentID: 5, // Assignment: Thermodynamics
			studentID: 9, // Student ID 9 (valid student)
			timestamp: "2023-04-02T12:00:00",
			grade: 77,
		},
	]);
}
