import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const config: { [key: string]: Knex.Config } = {
	development: {
		client: "mysql2",
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
		},
		migrations: {
			directory: "./src/db/migrations",
		},
		seeds: {
			directory: "./src/db/seeds",
		},
	},
};

export default config;

// Migrations: NODE_OPTIONS="--loader ts-node/esm" npx knex migrate:make create_users_table -x ts
