import { Category } from "../../model/Category";
import { CategoriesRepository } from "../../repositories/category/CategoriesRepository";

class ListCategoryUseCase {
  constructor(private categoryRepository: CategoriesRepository) {}

  execute(): Category[] {
    const categories = this.categoryRepository.list();
    return categories;
  }
}

export { ListCategoryUseCase };
