import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
	users: User[] = [];
	async create({
		name,
		email,
		password,
		driver_license,
	}: ICreateUserDTO): Promise<void> {
		const user = new User();

		Object.assign(user, { name, email, password, driver_license });

		this.users.push(user);
	}
	async findByEmail(email: string): Promise<User> {
		const user = this.users.find((u) => u.email === email);
		return user;
	}
	async findById(id: string): Promise<User> {
		const user = this.users.find((u) => u.id === id);
		return user;
	}
}

export { UsersRepositoryInMemory };