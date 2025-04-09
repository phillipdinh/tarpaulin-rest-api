import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex("assignments").del();

	// Insert seed entries
	await knex("assignments").insert([
		{
			courseID: 1,
			title: "Differentiation",
			points: 100,
			due: "2023-03-15T23:59:59",
		},
		{
			courseID: 2,
			title: "Basic Programming",
			points: 100,
			due: "2023-03-22T23:59:59",
		},
		{
			courseID: 3,
			title: "Mechanics",
			points: 100,
			due: "2023-03-29T23:59:59",
		},
		{
			courseID: 1,
			title: "Integration",
			points: 100,
			due: "2023-04-05T23:59:59",
		},
		{
			courseID: 2,
			title: "Object-Oriented Programming",
			points: 100,
			due: "2023-04-12T23:59:59",
		},
		{
			courseID: 3,
			title: "Thermodynamics",
			points: 100,
			due: "2023-04-19T23:59:59",
		},
		{
			courseID: 1,
			title: "Limits",
			points: 100,
			due: "2023-04-26T23:59:59",
		},
		{
			courseID: 2,
			title: "Data Structures",
			points: 100,
			due: "2023-05-03T23:59:59",
		},
		{
			courseID: 3,
			title: "Optics",
			points: 100,
			due: "2023-05-10T23:59:59",
		},
		{
			courseID: 1,
			title: "Derivatives",
			points: 100,
			due: "2023-05-17T23:59:59",
		},
	]);
}
