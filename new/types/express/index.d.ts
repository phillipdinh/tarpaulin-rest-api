import { User } from "../../models/user_models";

declare global {
	namespace Express {
		interface Request {
			user?: User | { id: number }; // Either full User object or object with id
		}
	}
}
