import { Response, NextFunction } from "express";
import { IRequestWithUser } from "./AuthMiddleware";

export default (roles: string[]) =>
	(req: IRequestWithUser, res: Response, next: NextFunction) => {
		const userRoles = req.user?.roles;
		console.log(req.user);
		if (
			!userRoles ||
			!userRoles.some((userRole) => roles.includes(userRole))
		) {
			return res.status(403).json({
				message: "Forbidden",
			});
		}

		next();
	};
