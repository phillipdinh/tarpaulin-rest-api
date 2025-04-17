import { db } from "../db/db.js";

export interface User {
	id?: number;
	username?: string;
	password?: string;
	name?: string;
	email?: string;
	// add any additional fields your users table has
}

export function findUserByUsername(username: string) {
	return db("users").where({ username }).first();
}

export function findUserByEmail(email: string) {
	return db("users").where({ email }).first();
}

export function findUserByID(id: number) {
	return db("users").where({ id }).first();
}

export function insertUser(user: User) {
	return db("users").insert(user);
}
