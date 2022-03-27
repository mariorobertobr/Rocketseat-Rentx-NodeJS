import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategory: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("create category", () => {
	beforeEach(() => {
		categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
		createCategory = new CreateCategoryUseCase(
			categoriesRepositoryInMemory
		);
	});

	it("should be able to create a category", async () => {
		await createCategory.execute({ name: "test", description: "test" });

		const categoryCreate = await categoriesRepositoryInMemory.findByName(
			"test"
		);
		// console.log(categoriesRepositoryInMemory);

		expect(categoryCreate).toHaveProperty("name", "test");
		expect(categoriesRepositoryInMemory.categories.length).toBe(1);
	});

	it("should not be able to create a category with the same name", async () => {
		expect(async () => {
			await createCategory.execute({ name: "test", description: "test" });
			await createCategory.execute({ name: "test", description: "test" });
		}).rejects.toBeInstanceOf(AppError);
	});
});
