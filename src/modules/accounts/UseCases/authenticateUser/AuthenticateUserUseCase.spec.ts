import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
		authenticateUserUseCase = new AuthenticateUserUseCase(
			usersRepositoryInMemory
		);
	});
	it("should be able to atuehtnticate a user", async () => {
		const user: ICreateUserDTO = {
			name: "test",
			email: "mario1",
			password: "123456",
			driver_license: "123456",
		};
		await createUserUseCase.execute(user);

		const response = await authenticateUserUseCase.execute({
			email: user.email,
			password: user.password,
		});

		expect(response).toHaveProperty("token");
	});

	it("should not be able to authenticate a user", async () => {
		const user: ICreateUserDTO = {
			name: "test",
			email: "mario1",
			password: "123456",
			driver_license: "123456",
		};
		await createUserUseCase.execute(user);

		await authenticateUserUseCase.execute({
			email: user.email,
			password: user.password,
		});

		await expect(
			authenticateUserUseCase.execute({
				email: "mario22",
				password: "123456",
			})
		).rejects.toBeInstanceOf(AppError);
	});
	it("should not be able to authenticate with incorrect password", async () => {
		const user: ICreateUserDTO = {
			name: "test",
			email: "mario1",
			password: "123456",
			driver_license: "123456",
		};
		await createUserUseCase.execute(user);

		await authenticateUserUseCase.execute({
			email: user.email,
			password: user.password,
		});

		await expect(
			authenticateUserUseCase.execute({
				email: user.email,
				password: "1234567",
			})
		).rejects.toBeInstanceOf(AppError);
	});
});
