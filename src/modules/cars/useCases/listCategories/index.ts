import { CategoriesRepository } from "../../repositories/category/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const listCategoriesRepository = CategoriesRepository.getInstance();

const listCategoriesUseCase = new ListCategoriesUseCase(listCategoriesRepository);

const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);

export { listCategoriesUseCase, listCategoriesController };
