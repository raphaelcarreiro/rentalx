import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserUseCase = container.resolve(CreateUserUseCase);

    try {
      await createUserUseCase.execute(request.body);
    } catch (err) {
      return response.status(500).json({
        error: err.message,
      });
    }

    return response.status(201).send();
  }
}

export { CreateUserController };
