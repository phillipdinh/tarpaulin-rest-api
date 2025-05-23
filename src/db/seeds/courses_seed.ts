import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex("courses").del();

	// Inserts seed entries
	await knex("courses").insert([
		{
			id: 1,
			subject: "Mathematics",
			number: "101",
			title: "Calculus I",
			term: "Spring 2023",
			instructorID: 2,
		},
		{
			id: 2,
			subject: "Computer Science",
			number: "101",
			title: "Intro to Programming",
			term: "Spring 2023",
			instructorID: 2,
		},
		{
			id: 3,
			subject: "Physics",
			number: "201",
			title: "General Physics II",
			term: "Spring 2023",
			instructorID: 2,
		},
		{
			id: 4,
			subject: "Mathematics",
			number: "102",
			title: "Calculus II",
			term: "Spring 2023",
			instructorID: 2,
		},
		{
			id: 5,
			subject: "Computer Science",
			number: "201",
			title: "Data Structures",
			term: "Spring 2023",
			instructorID: 2,
		},
		{
			id: 6,
			subject: "Physics",
			number: "301",
			title: "Quantum Mechanics",
			term: "Spring 2023",
			instructorID: 2,
		},
		{
			id: 7,
			subject: "Mathematics",
			number: "201",
			title: "Linear Algebra",
			term: "Spring 2023",
			instructorID: 2,
		},
		{
			id: 8,
			subject: "Computer Science",
			number: "301",
			title: "Algorithm Design",
			term: "Spring 2023",
			instructorID: 2,
		},
		{
			id: 9,
			subject: "Physics",
			number: "401",
			title: "Astrophysics",
			term: "Spring 2023",
			instructorID: 2,
		},
		{
			id: 10,
			subject: "Mathematics",
			number: "301",
			title: "Number Theory",
			term: "Spring 2023",
			instructorID: 2,
		},
		// Additional courses for instructor ID 11 (Dr. William Clark)
		{
			id: 11,
			subject: "Biology",
			number: "101",
			title: "Introduction to Biology",
			term: "Spring 2023",
			instructorID: 11,
		},
		{
			id: 12,
			subject: "Biology",
			number: "102",
			title: "Cell Biology",
			term: "Spring 2023",
			instructorID: 11,
		},
		{
			id: 13,
			subject: "Chemistry",
			number: "101",
			title: "General Chemistry",
			term: "Spring 2023",
			instructorID: 11,
		},
		{
			id: 14,
			subject: "Biology",
			number: "201",
			title: "Genetics",
			term: "Spring 2023",
			instructorID: 11,
		},
		// Additional courses for instructor ID 12 (Professor Linda King)
		{
			id: 15,
			subject: "Philosophy",
			number: "101",
			title: "Introduction to Philosophy",
			term: "Spring 2023",
			instructorID: 12,
		},
		{
			id: 16,
			subject: "Philosophy",
			number: "201",
			title: "Ethics",
			term: "Spring 2023",
			instructorID: 12,
		},
		{
			id: 17,
			subject: "Psychology",
			number: "101",
			title: "Intro to Psychology",
			term: "Spring 2023",
			instructorID: 12,
		},
		{
			id: 18,
			subject: "Philosophy",
			number: "301",
			title: "Philosophical Logic",
			term: "Spring 2023",
			instructorID: 12,
		},
	]);
}
