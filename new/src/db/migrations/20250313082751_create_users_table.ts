import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable("users", (table) => {
		table.increments("id").primary(); // Auto-incrementing primary key
		table.string("name").notNullable(); // User name
		table.string("email").unique().notNullable(); // Unique email
		table.string("password").notNullable(); // Password (hashed)
		table.string("role").notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists("users"); // Drop the table on rollback
}
