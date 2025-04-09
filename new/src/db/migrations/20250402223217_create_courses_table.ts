import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable("courses", (table) => {
		table.increments("id").primary();
		table.string("subject").notNullable();
		table.integer("number").notNullable();
		table.string("title").notNullable();
		table.string("term").notNullable();

		table
			.integer("instructorID")
			.unsigned()
			.references("id")
			.inTable("users"); // Foreign key reference
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists("courses"); // Drop the table on rollback
}
