import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const upload = multer({
  dest: "./tmp",
});

const categoriesRoutes = Router();

categoriesRoutes.post("/categories", (request, response) => createCategoryController.handle(request, response));
categoriesRoutes.get("/categories", (request, response) => listCategoriesController.handle(request, response));
categoriesRoutes.post("/import", upload.single("file"), (request, response) =>
  importCategoryController.handle(request, response),
);

export { categoriesRoutes };
