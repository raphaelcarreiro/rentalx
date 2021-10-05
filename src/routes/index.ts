import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";

const router = Router();

router.get("/", (request, response) => {
  response.status(200).json({ status: "rentalx is working" });
});

router.use(categoriesRoutes);
router.use(specificationsRoutes);

// console.log("teste");

export { router };
