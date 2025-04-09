import { Knex } from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex("users").del();

	// Hash passwords before inserting them
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash("password123", saltRounds);

	// Inserts seed entries
	await knex("users").insert([
		{
			id: 1,
			name: "John Doe",
			email: "john.doe@example.com",
			password: hashedPassword,
			role: "admin",
		},
		{
			id: 2,
			name: "Jane Doe",
			email: "jane.doe@example.com",
			password: hashedPassword,
			role: "instructor",
		},
		{
			id: 3,
			name: "Adam Smith",
			email: "adam.smith@example.com",
			password: hashedPassword,
			role: "student",
		},
		{
			id: 4,
			name: "Sarah Johnson",
			email: "sarah.johnson@example.com",
			password: hashedPassword,
			role: "student",
		},
		{
			id: 5,
			name: "Michael Brown",
			email: "michael.brown@example.com",
			password: hashedPassword,
			role: "student",
		},
		{
			id: 6,
			name: "Emily Davis",
			email: "emily.davis@example.com",
			password: hashedPassword,
			role: "student",
		},
		{
			id: 7,
			name: "Daniel Wilson",
			email: "daniel.wilson@example.com",
			password: hashedPassword,
			role: "student",
		},
		{
			id: 8,
			name: "Olivia Taylor",
			email: "olivia.taylor@example.com",
			password: hashedPassword,
			role: "student",
		},
		{
			id: 9,
			name: "Matthew Anderson",
			email: "matthew.anderson@example.com",
			password: hashedPassword,
			role: "student",
		},
		{
			id: 10,
			name: "Ava Martinez",
			email: "ava.martinez@example.com",
			password: hashedPassword,
			role: "student",
		},
	]);
}
