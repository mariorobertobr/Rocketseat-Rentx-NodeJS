import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;
describe("create Car", () => {
	beforeEach(() => {
		carsRepository = new CarsRepositoryInMemory();
		createCarUseCase = new CreateCarUseCase(carsRepository);
	});
	it("should be able to create a car ", async () => {
		await createCarUseCase.execute({
			name: "Fusca",
			description: "Carro de luxo",
			brand: "VW",
			category_id: "5f3c8f8f-f8f4-4f0f-b8f8-f8f8f8f8f8f8",
			daily_rate: 100,
			fine_amount: 10,
			license_plate: "ABC-1234",
		});
	});
});
