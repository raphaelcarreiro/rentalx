import { Router } from "express";

import { SpecificationRepository } from "../modules/cars/repositories/specification/SpecificationRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router();

const specificationRepository = new SpecificationRepository();

specificationsRoutes.post("/specifications", (request, response) => {
  const { name, description } = request.body;

  const specificationCreateService = new CreateSpecificationService(specificationRepository);

  specificationCreateService.execute({ name, description });

  return response.status(201).send();
});

export { specificationsRoutes };
