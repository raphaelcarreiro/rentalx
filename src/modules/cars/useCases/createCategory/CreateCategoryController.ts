import { Request, Response } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { name, description } = request.body;

      const category = this.createCategoryUseCase.execute({ name, description });

      return response.status(201).json(category).send();
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }
}

export { CreateCategoryController };
