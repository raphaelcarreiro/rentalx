import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const upload = multer({
  dest: "../tmp",
});

const categoriesRoutes = Router();

categoriesRoutes.post("/categories", (request, response) => createCategoryController.handle(request, response));
categoriesRoutes.get("/categories", listCategoriesController.handle);

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  const { file } = request;
  console.log(file);
  return response.send();
});

export { categoriesRoutes };
