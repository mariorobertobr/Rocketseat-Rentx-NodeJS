import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}

	async execute({ name, email, password, driver_license }: ICreateUserDTO) {
		const EmailAlreadyExists = await this.usersRepository.findByEmail(
			email
		);

		if (EmailAlreadyExists) {
			throw new AppError("Email already in Use");
		}

		const passwordHash = await hash(password, 8);

		await this.usersRepository.create({
			name,
			email,
			password: passwordHash,
			driver_license,
		});
	}
}
export { CreateUserUseCase };
