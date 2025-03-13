import knex from "knex";
import config from "../../knexfile.js";

const connectionConfig = config.development;

export const db = knex(connectionConfig);
