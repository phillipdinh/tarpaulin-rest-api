import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable("assignments", (table) => {
		table.increments("id").primary(); // Auto-incrementing primary key for assignments
		table.string("title").notNullable();
		table.integer("points").notNullable();
		table.dateTime("due").notNullable();

		// Foreign key constraint for courseID, referencing courseID in the courses table
		table
			.integer("courseID")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("courses")
			.onDelete("CASCADE"); // Ensures if a course is deleted, related assignments are also deleted
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists("assignments");
}
