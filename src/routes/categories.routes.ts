import { Router } from "express";

import { CategoriesRepository } from "../modules/cars/repositories/category/CategoriesRepository";
import { createCategoryController } from "../modules/cars/useCases/createCategory";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/categories", createCategoryController.handle);

categoriesRoutes.get("/categories", (request, response) => {
  const all = categoriesRepository.list();
  return response.json(all);
});

export { categoriesRoutes };
