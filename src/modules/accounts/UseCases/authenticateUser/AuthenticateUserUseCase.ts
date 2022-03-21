import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
	email: string;
	password: string;
}
interface IResponse {
	user: {
		name: string;
		email: string;
	};
	token: string;
}

@injectable()
class AuthenticateUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}
	async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new Error("Invalid email or password");
		}

		if (!(await compare(password, user.password))) {
			throw new Error("Invalid email or password");
		}

		const token = sign({}, "87f3debfe972c8837e8d95b34ebd50c7", {
			subject: user.id,
			expiresIn: "1d",
		});

		return {
			user: {
				name: user.name,
				email: user.email,
			},
			token,
		};
	}
}
export { AuthenticateUserUseCase };
