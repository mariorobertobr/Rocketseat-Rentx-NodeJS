import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

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
		throw new AppError("token is missing", 401);
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
			throw new AppError("Invalid token", 401);
		}

		request.user = {
			id: user_id,
		};

		return next();
	} catch (err) {
		throw new AppError("Invalid token", 401);
	}
}
