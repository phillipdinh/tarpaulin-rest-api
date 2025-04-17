import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable("user_courses", (table) => {
		table.increments("id").primary();
		table
			.integer("studentID")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("users")
			.onDelete("CASCADE");
		table
			.integer("courseID")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("courses")
			.onDelete("CASCADE");

		table.unique(["studentID", "courseID"]); // Prevent duplicates
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists("user_courses");
}
