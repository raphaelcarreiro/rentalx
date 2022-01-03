import { CreateCarController } from "@src/modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";

const carsRouter = Router();

const createCarController = new CreateCarController();

carsRouter.post("/cars", createCarController.execute);

export { carsRouter };
