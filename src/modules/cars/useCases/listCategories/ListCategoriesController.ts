import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
	constructor(private listCategoryUseCase: ListCategoriesUseCase) {}
	async handle(request: Request, response: Response): Promise<Response> {
		const allListCategories = await this.listCategoryUseCase.execute();
		return response.json(allListCategories);
	}
}

export { ListCategoriesController };
