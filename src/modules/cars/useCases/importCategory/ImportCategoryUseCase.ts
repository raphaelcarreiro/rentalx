import csvParse from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { Category } from "../../entities/Category";
import { CategoriesRepository } from "../../repositories/category/CategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: CategoriesRepository,
  ) {
    //
  }

  async loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);

      const categories: IImportCategory[] = [];

      const parsedFile = csvParse();

      stream.pipe(parsedFile);

      parsedFile
        .on("data", async line => {
          const [name, description] = line;
          await this.categoryRepository.create({ description, name });
          categories.push({ name, description });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", err => {
          reject(err);
        });

      return categories;
    });
  }

  async execute(file: Express.Multer.File): Promise<Category[]> {
    const categories = await this.loadCategories(file);
    const createdCategories: Category[] = [];

    categories.forEach(async category => {
      const categoryName = await this.categoryRepository.findByName(category.name);
      if (!categoryName) {
        await this.categoryRepository.create(category);
      }
    });

    return createdCategories;
  }
}

export { ImportCategoryUseCase };
