import { ICreateCarDTO } from "../dtos/ICreateCarDTO";

interface ICarsRepository {
	// findByName(name: string): Promise<Car>;
	// list(): Promise<Car[]>;
	create(data: ICreateCarDTO): Promise<void>;
}

export { ICarsRepository };
