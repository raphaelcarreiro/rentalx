import { Router } from "express";

import { ensureIsAuthenticated } from "../middlewares/ensureIsAuthenticated";
import { authenticateRoutes } from "./authenticate.routes";
import { carsRouter } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRouter } from "./users.routes";

const router = Router();

router.get("/", (request, response) => {
  response.status(200).json({ status: "rentalx is working" });
});

router.use(authenticateRoutes);
router.use(ensureIsAuthenticated);
router.use(categoriesRoutes);
router.use(specificationsRoutes);
router.use(usersRouter);
router.use(carsRouter);

export { router };
