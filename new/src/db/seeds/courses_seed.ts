import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex("courses").del();

	// Inserts seed entries
	await knex("courses").insert([
		{
			subject: "Mathematics",
			number: "101",
			title: "Calculus I",
			term: "Spring 2023",
			instructorId: 2,
		},
		{
			subject: "Computer Science",
			number: "101",
			title: "Intro to Programming",
			term: "Spring 2023",
			instructorId: 2,
		},
		{
			subject: "Physics",
			number: "201",
			title: "General Physics II",
			term: "Spring 2023",
			instructorId: 2,
		},
		{
			subject: "Mathematics",
			number: "102",
			title: "Calculus II",
			term: "Spring 2023",
			instructorId: 2,
		},
		{
			subject: "Computer Science",
			number: "201",
			title: "Data Structures",
			term: "Spring 2023",
			instructorId: 2,
		},
		{
			subject: "Physics",
			number: "301",
			title: "Quantum Mechanics",
			term: "Spring 2023",
			instructorId: 2,
		},
		{
			subject: "Mathematics",
			number: "201",
			title: "Linear Algebra",
			term: "Spring 2023",
			instructorId: 2,
		},
		{
			subject: "Computer Science",
			number: "301",
			title: "Algorithm Design",
			term: "Spring 2023",
			instructorId: 2,
		},
		{
			subject: "Physics",
			number: "401",
			title: "Astrophysics",
			term: "Spring 2023",
			instructorId: 2,
		},
		{
			subject: "Mathematics",
			number: "301",
			title: "Number Theory",
			term: "Spring 2023",
			instructorId: 2,
		},
	]);
}
