import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
	name: string;
	description: string;
	daily_rate: number;
	license_plate: string;
	fine_amount: number;
	brand: string;
	category_id: string;
}

@injectable()
class CreateCarUseCase {
	constructor(
		@inject("CarsRepository") private carsRepository: ICarsRepository
	) {}

	async execute({
		name,
		description,
		brand,
		category_id,
		daily_rate,
		fine_amount,
		license_plate,
	}: IRequest): Promise<void> {}
}
export { CreateCarUseCase };
