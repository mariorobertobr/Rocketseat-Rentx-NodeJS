import { parse } from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
	name: string;
	description: string;
}

class ImportCategoryUseCase {
	constructor(private categoriesRepository: ICategoriesRepository) {}

	async loadCategories(
		file: Express.Multer.File
	): Promise<IImportCategory[]> {
		return new Promise((resolve, reject) => {
			const stream = fs.createReadStream(file.path);
			const categories: IImportCategory[] = [];

			const parseFile = parse();
			stream.pipe(parseFile);

			parseFile
				.on("data", async (line) => {
					const [name, description] = line;
					categories.push({ name, description });
				})
				.on("end", () => {
					fs.promises.unlink(file.path);
					resolve(categories);
				})
				.on("error", (err) => {
					reject(err);
				});
		});
	}
	// le o arquivo separa em csv e cria um array de objetos e insere no repositorio de forma assincrona
	async execute(file: Express.Multer.File): Promise<void> {
		const categories = await this.loadCategories(file);

		categories.map(async (category) => {
			const { name, description } = category;

			const existCategory = await this.categoriesRepository.findByName(
				name
			);

			if (!existCategory) {
				await this.categoriesRepository.create({ name, description });
			}
		});
	}
}
export { ImportCategoryUseCase };