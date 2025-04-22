import { db } from "../db/db.js";

export interface Assignment {
	courseID: number;
	title: string;
	points: number;
	due: Date;
}
export function insertAssignment(assignment: Assignment) {
	return db("assignments").insert(assignment);
}

export function findAssignmentByID(id: number) {
	return db("assignments").where({ id }).first();
}

export function updateAssignmentByID(id: number, assignment: Assignment) {
	return db("assignments").where({ id }).update(assignment);
}

export function deleteAssignmentByID(id: number) {
	return db("assignments").where({ id }).del();
}
