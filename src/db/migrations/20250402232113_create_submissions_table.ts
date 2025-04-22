import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable("submissions", (table) => {
		table.increments("id").primary();

		table
			.integer("assignmentID")
			.notNullable()
			.unsigned()
			.references("id")
			.inTable("assignments");

		table
			.integer("studentID")
			.notNullable()
			.unsigned()
			.references("id")
			.inTable("users");

		table.dateTime("timestamp").notNullable();
		table.integer("grade");
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists("submissions"); // Drop the table on rollback
}
