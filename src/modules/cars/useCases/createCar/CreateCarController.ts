import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "./CreateCarUseCase";

export class CreateCarController {
  async execute(request: Request, response: Response): Promise<Response> {
    const createCarUseCase = container.resolve(CreateCarUseCase);
    const payload = request.body;

    const car = await createCarUseCase.execute(payload);

    return response.status(201).json(car);
  }
}
