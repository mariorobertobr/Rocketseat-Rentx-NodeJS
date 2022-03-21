import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayLoad {
	sub: string;
}

export async function EnsureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new Error("token is missing");
	}

	const [, token] = authHeader.split(" ");

	try {
		const { sub: user_id } = verify(
			token,
			"87f3debfe972c8837e8d95b34ebd50c7"
		) as IPayLoad;

		const usersRepository = new UsersRepository();
		const users = usersRepository.findById(user_id);

		if (!users) {
			throw new Error("Invalid token");
		}

		return next();
	} catch (err) {
		throw new Error("Invalid token");
	}
}
