import { Category } from "../../model/Category";
import { ICategoriesRepository } from "../../repositories/category/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): Category {
    const exists = this.categoriesRepository.findByName(name);

    if (exists) {
      throw new Error("Category already exists");
    }

    const categories = this.categoriesRepository.create({ name, description });

    return categories;
  }
}

export { CreateCategoryUseCase };
