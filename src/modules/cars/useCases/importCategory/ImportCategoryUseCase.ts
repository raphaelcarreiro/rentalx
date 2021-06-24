import csvParse from "csv-parse";
import fs from "fs";

import { Category } from "../../model/Category";
import { CategoriesRepository } from "../../repositories/category/CategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoryRepository: CategoriesRepository) {
    //
  }

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);

      const categories: IImportCategory[] = [];

      const parsedFile = csvParse();

      stream.pipe(parsedFile);

      parsedFile
        .on("data", async line => {
          const [name, description] = line;
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

    categories.forEach(category => {
      if (!this.categoryRepository.findByName(category.name)) {
        const created = this.categoryRepository.create(category);
        createdCategories.push(created);
      }
    });

    console.log(createdCategories);

    return createdCategories;
  }
}

export { ImportCategoryUseCase };
