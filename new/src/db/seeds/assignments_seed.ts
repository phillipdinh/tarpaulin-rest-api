import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex("assignments").del();

	// Insert seed entries
	await knex("assignments").insert([
		{
			id: 1,
			courseID: 1,
			title: "Differentiation",
			points: 100,
			due: "2023-03-15T23:59:59",
		},
		{
			id: 2,
			courseID: 2,
			title: "Basic Programming",
			points: 100,
			due: "2023-03-22T23:59:59",
		},
		{
			id: 3,
			courseID: 3,
			title: "Mechanics",
			points: 100,
			due: "2023-03-29T23:59:59",
		},
		{
			id: 4,
			courseID: 1,
			title: "Integration",
			points: 100,
			due: "2023-04-05T23:59:59",
		},
		{
			id: 5,
			courseID: 2,
			title: "Object-Oriented Programming",
			points: 100,
			due: "2023-04-12T23:59:59",
		},
		{
			id: 6,
			courseID: 3,
			title: "Thermodynamics",
			points: 100,
			due: "2023-04-19T23:59:59",
		},
		{
			id: 7,
			courseID: 1,
			title: "Limits",
			points: 100,
			due: "2023-04-26T23:59:59",
		},
		{
			id: 8,
			courseID: 2,
			title: "Data Structures",
			points: 100,
			due: "2023-05-03T23:59:59",
		},
		{
			id: 9,
			courseID: 3,
			title: "Optics",
			points: 100,
			due: "2023-05-10T23:59:59",
		},
		{
			id: 10,
			courseID: 1,
			title: "Derivatives",
			points: 100,
			due: "2023-05-17T23:59:59",
		},
		// New assignments for instructor 11 (Dr. William Clark)
		{
			id: 11,
			courseID: 11,
			title: "Cell Division",
			points: 100,
			due: "2023-03-16T23:59:59",
		},
		{
			id: 12,
			courseID: 11,
			title: "Biological Reactions",
			points: 100,
			due: "2023-03-30T23:59:59",
		},
		{
			id: 13,
			courseID: 11,
			title: "Genetic Mutations",
			points: 100,
			due: "2023-04-13T23:59:59",
		},
		{
			id: 14,
			courseID: 11,
			title: "Enzyme Functions",
			points: 100,
			due: "2023-04-27T23:59:59",
		},
		// New assignments for instructor 12 (Professor Linda King)
		{
			id: 15,
			courseID: 15,
			title: "Ethical Theories",
			points: 100,
			due: "2023-03-18T23:59:59",
		},
		{
			id: 16,
			courseID: 15,
			title: "Philosophical Arguments",
			points: 100,
			due: "2023-04-02T23:59:59",
		},
		{
			id: 17,
			courseID: 16,
			title: "Utilitarianism",
			points: 100,
			due: "2023-04-16T23:59:59",
		},
		{
			id: 18,
			courseID: 16,
			title: "Deontological Ethics",
			points: 100,
			due: "2023-04-30T23:59:59",
		},
		{
			id: 19,
			courseID: 17,
			title: "Psychological Disorders",
			points: 100,
			due: "2023-03-25T23:59:59",
		},
		{
			id: 20,
			courseID: 17,
			title: "Cognitive Development",
			points: 100,
			due: "2023-04-09T23:59:59",
		},
		{
			id: 21,
			courseID: 17,
			title: "Behavioral Theories",
			points: 100,
			due: "2023-04-23T23:59:59",
		},
		{
			id: 22,
			courseID: 18,
			title: "Philosophy of Mind",
			points: 100,
			due: "2023-05-05T23:59:59",
		},
		{
			id: 23,
			courseID: 18,
			title: "Consciousness Studies",
			points: 100,
			due: "2023-05-12T23:59:59",
		},
	]);
}
